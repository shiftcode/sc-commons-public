import { CloudWatchLogs, FilterLogEventsRequest, FilterLogEventsResponse } from '@aws-sdk/client-cloudwatch-logs'
import { fetchSsmStringParamValue } from '@shiftcode/lambda-utilities/ssm'
import { simpleLambdaLogger as simpleLogger } from '@shiftcode/logger/node'
import { Context, SNSEvent, SNSHandler, SNSMessage } from 'aws-lambda'

import type { AlarmMetadata } from '../alarming.construct.js'
import { CustomCloudWatchAlarmMessage } from '../models/custom-cloudwatch-alarm-message.model.js'
import { SlackNotification } from '../models/slack-notification.model.js'
import {
  convertMessageToLogEventErrorType,
  createLogStreamUrl,
  isLogEventMessageError,
  logEventErrorConfiguration,
  logEventExcludePattern,
} from '../utils/cloudwatch.utils.js'

const logger = simpleLogger('PublishAlarmToSlackFn')

let slackWebhookEndpointSecret: string | undefined = undefined

async function getSlackWebhookEndpoint(): Promise<string> {
  if (!slackWebhookEndpointSecret) {
    // fetch the slack webhook endpoint from the SSM parameter store if it's not already cached in memory
    slackWebhookEndpointSecret = await fetchSsmStringParamValue(
      process.env.SLACK_WEBHOOK_ENDPOINT_SSM_PARAM_ARN || 'arn-not-provided',
      true,
    )
  }
  return slackWebhookEndpointSecret
}

export const handler: SNSHandler = async (event: SNSEvent, _: Context) => {
  logger.info('payload', event)

  const snsMessage = event.Records[0].Sns
  const message = parseSNSAlarmDescriptionToCustomContent(snsMessage)
  if (!message) {
    logger.error('message does not satisfy the required format')
    return
  }

  if (message.NewStateValue !== 'ALARM') {
    logger.info('no action required for non-ALARM state')
    return
  }

  const slackWebhookEndpoint = await getSlackWebhookEndpoint()
  if (!slackWebhookEndpoint) {
    logger.error('slack webhook endpoint not found in SSM')
    return
  }

  const {
    NewStateValue: newStateValue,
    StateChangeTime: stateChangeTime,
    AlarmName: alarmName,
    NewStateReason: newStateReason,
  } = message
  const attachment: SlackNotification = {
    fallback: `[${stateChangeTime}] ${alarmName} - ${newStateReason}`,
    color: newStateValue === 'ALARM' ? 'danger' : 'good',
    pretext: `[${stateChangeTime}] *${alarmName}* - ${newStateReason}`,
  }

  const errorLogs = await fetchCloudWatchErrors(message)
  if (errorLogs) {
    attachment.author_name = errorLogs.errorType
    attachment.title = ':bookmark_tabs: CloudWatch Log events:'
    attachment.mrkdwn_in = ['text']
    attachment.text = errorLogs.text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    attachment.actions = [
      {
        type: 'button',
        text: ':mag_right: See full CloudWatch Log Stream',
        url: errorLogs.detailUrl,
      },
    ]
  }

  const messageBody = {
    attachments: [attachment],
  }

  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(messageBody),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    await fetch(slackWebhookEndpoint, options)
    logger.info('successfully posted to slack')
  } catch (err) {
    logger.error('there was an error with the call to slack webhook', err)
    throw err
  }
}

async function fetchCloudWatchErrors(message: CustomCloudWatchAlarmMessage) {
  if (!message.AlarmDescription.logGroupName) {
    return null
  }

  try {
    const timestamp = Date.parse(message.StateChangeTime)

    // period multiplied with evaluation periods in ms (minus 60 seconds buffer because the alarm is not triggered realtime)
    const offset = (message.Trigger.Period * message.Trigger.EvaluationPeriods + 60) * 1000
    const logGroupName = message.AlarmDescription.logGroupName
    const region = message.AlarmDescription.region
    const parameters: FilterLogEventsRequest = {
      logGroupName,
      startTime: timestamp - offset,
      endTime: timestamp,
    }
    logger.debug('the filter log event params:', parameters)

    const filteredLogEvents = await fetchLogEvents(parameters)
    if (!filteredLogEvents.events?.length) {
      logger.info('no log events found')
      return null
    }

    logger.debug(`fetched a total of ${filteredLogEvents.events.length} log events.`)

    const errorLogs = filteredLogEvents.events.filter((ev) => isLogEventMessageError(ev.message))
    if (!errorLogs.length) {
      logger.info('no error logs found')
      return null
    }

    const firstWithLogStreamDetails = errorLogs.find(
      (
        fle,
      ): fle is {
        logStreamName: string
        timestamp: number
        eventId: string
        message?: string
      } => !!fle.logStreamName && !!fle.timestamp && !!fle.eventId,
    )
    if (!firstWithLogStreamDetails) {
      logger.error('missing logStreamName, timestamp or eventId in log event', errorLogs)
      return null
    }

    const detailUrl = createLogStreamUrl(
      logGroupName,
      region,
      firstWithLogStreamDetails.logStreamName,
      firstWithLogStreamDetails.timestamp,
      firstWithLogStreamDetails.eventId,
    )
    const eventMessageErrorType = convertMessageToLogEventErrorType(firstWithLogStreamDetails.message)
    const errorType = eventMessageErrorType
      ? logEventErrorConfiguration[eventMessageErrorType].slackErrorTypeMessage
      : ''
    const text = errorLogs
      .map((fle) => {
        const eventTime = `${new Date().setTime(fle.timestamp || 0)}`
        const eventMessage = fle.message
          ? `${fle.message.replace(logEventExcludePattern, '').trim()}`
          : `${fle.message}`
        const eventMessageErrorTypeInternal = convertMessageToLogEventErrorType(eventMessage)

        if (!eventMessageErrorTypeInternal) {
          return `\n*${eventTime}*\n${eventMessage}\n`
        }
        return `\n*\`${eventTime}\`*\n\`\`\`${eventMessage}\`\`\`\n`
      })
      .join('')

    return { detailUrl, errorType, text } as const
  } catch (err) {
    logger.error('cloudWatchLogs fetch error:', err)
  }

  return null
}

async function fetchLogEvents(parameters: FilterLogEventsRequest): Promise<FilterLogEventsResponse> {
  const cloudWatchLogs = new CloudWatchLogs()
  logger.debug(`fetching log events`)
  const filteredLogEvents = await cloudWatchLogs.filterLogEvents(parameters)

  let nextToken = filteredLogEvents.nextToken
  while (nextToken) {
    parameters.nextToken = nextToken
    logger.debug('the nextToken filter log event params:', parameters)
    const nextFilteredLogEvents = await cloudWatchLogs.filterLogEvents(parameters)
    if (filteredLogEvents.events && nextFilteredLogEvents.events) {
      logger.debug(
        `nextToken available, fetch more log events. already fetched ${filteredLogEvents.events.length} + ${nextFilteredLogEvents.events.length}`,
      )
      filteredLogEvents.events = [...filteredLogEvents.events, ...nextFilteredLogEvents.events]
    }
    nextToken = nextFilteredLogEvents.nextToken
  }

  return filteredLogEvents
}

const parseSNSAlarmDescriptionToCustomContent = (snsMessage: SNSMessage): CustomCloudWatchAlarmMessage | null => {
  try {
    const alarmDescriptionKey = 'AlarmDescription' satisfies keyof CustomCloudWatchAlarmMessage
    const reviver = (key: string, value: unknown): unknown => {
      if (key !== alarmDescriptionKey) {
        return value
      }

      try {
        return JSON.parse(value as string) as AlarmMetadata
      } catch {
        throw new Error(`error parsing ${alarmDescriptionKey} to AlarmMetadata`)
      }
    }
    return JSON.parse(snsMessage.Message, reviver) as CustomCloudWatchAlarmMessage
  } catch (e) {
    logger.error('error parsing message JSON', e)
    return null
  }
}
