import { randomUUID } from 'node:crypto'
import { gunzip } from 'node:zlib'

import { fetchSsmStringParamValue } from '@shiftcode/lambda-utilities/ssm'
import { simpleLambdaLogger as simpleLogger } from '@shiftcode/logger/node'
import {
  ActionsBlock,
  Button,
  ContextBlock,
  HeaderBlock,
  KnownBlock,
  MessageAttachment,
  MrkdwnElement,
  PlainTextElement,
  SectionBlock,
} from '@slack/types'
import { CloudWatchLogsDecodedData, CloudWatchLogsEvent, CloudWatchLogsHandler, Context } from 'aws-lambda'

import {
  createLogInsightsUrl,
  createLogStreamUrl,
  LogInsightsQueryDetails,
  parsePlaintextLambdaLogMessage,
} from '../utils/cloudwatch.utils.js'
import { escapeForSlack, replaceTabs } from '../utils/slack-messages.utils.js'

const logger = simpleLogger('PublishErrorLogToSlackFn')

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

async function postSlackMessage(blocks: KnownBlock[], attachments: MessageAttachment[], slackWebhookEndpoint: string) {
  const messageBody = {
    blocks,
    attachments,
  }

  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(messageBody),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await fetch(slackWebhookEndpoint, options)
    const responseText = await response.text()
    logger.info(`successfully posted to slack with response code ${response.status} and responseText`, {
      responseText,
    })
  } catch (err) {
    logger.error('there was an error with the call to slack webhook', err)
    throw err
  }
}

const gunzipPromiseWrapper = (data: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    gunzip(data, (err, responseObject) => {
      if (err) {
        return reject(err)
      }
      return resolve(responseObject)
    })
  })

/**
 * Expected shape of a structured `@shiftcode/logger` JSON log line (see `JsonLogObjectData`).
 * Any other format still works, just without `logger`/exception enrichment (falls back to raw
 * `message` from `JSON.parse` failing being handled by the caller).
 */
interface ParsedLogMessage {
  message?: string
  logger?: string
  error?: { message?: string; stack?: string }
}

export const handler: CloudWatchLogsHandler = async (event: CloudWatchLogsEvent, _: Context) => {
  logger.info('event', event)

  const slackWebhookEndpoint = await getSlackWebhookEndpoint()
  if (slackWebhookEndpoint) {
    logger.info('successfully resolved slack credentials')
  }

  const region = process.env.AWS_REGION ?? ''

  const decodedData = Buffer.from(event.awslogs.data, 'base64')
  const unzippedData = await gunzipPromiseWrapper(decodedData)
  const eventData: CloudWatchLogsDecodedData = JSON.parse(unzippedData.toString())
  logger.info('eventData', eventData)

  const messages: Array<{ blocks: KnownBlock[]; attachments: MessageAttachment[] }> = eventData.logEvents.map(
    (logEvent) => {
      logger.info('logEvent', logEvent)

      const detailUrl = createLogStreamUrl(
        eventData.logGroup,
        region,
        eventData.logStream,
        logEvent.timestamp,
        logEvent.id,
      )

      // convert from millisecond timestamp
      const timestampSeconds = Math.floor(logEvent.timestamp / 1000)
      const parsedLambdaLog = parsePlaintextLambdaLogMessage(logEvent.message)
      logger.info('parsedLambdaLog', parsedLambdaLog)
      const parsedMessage = (
        parsedLambdaLog ? JSON.parse(parsedLambdaLog.message) : JSON.parse(logEvent.message)
      ) as ParsedLogMessage

      const logEventDate = new Date(logEvent.timestamp)
      const startDate = new Date(logEvent.timestamp - 15 * 60 * 1000)

      // query to show all logs of the given lambda run (requestId filter)
      const editorString = [
        'fields @timestamp, level, message, data, logger',
        `| filter @requestId = '${parsedLambdaLog?.requestId}'`,
        'sort @timestamp desc',
        'limit 100',
      ].join('\n')

      const logInsightsQueryDetails: LogInsightsQueryDetails = {
        editorString,
        timeType: 'ABSOLUTE',
        start: startDate.toISOString(),
        end: logEventDate.toISOString(),
        source: [eventData.logGroup],
        tz: 'LOCAL',
        lang: 'CWLI',
        queryId: randomUUID(),
      }
      const logInsightsUrl = createLogInsightsUrl(logInsightsQueryDetails, region)

      const blocks: KnownBlock[] = [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: ':bangbang: ERROR log',
          },
        } satisfies HeaderBlock,
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: escapeForSlack(eventData.logGroup),
            } satisfies MrkdwnElement,
          ],
        } satisfies ContextBlock,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message*\n${escapeForSlack(parsedMessage.message ?? '')}`,
          },
        } satisfies SectionBlock,
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `<!date^${timestampSeconds.toString(10)}^{date_pretty} {time}|${timestampSeconds}>`,
            } satisfies MrkdwnElement,
            parsedMessage.logger
              ? ({
                  type: 'plain_text',
                  text: escapeForSlack(parsedMessage.logger ?? ''),
                } satisfies PlainTextElement)
              : null,
          ].filter((value) => value !== null),
        } satisfies ContextBlock,
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Log Insights',
                emoji: true,
              },
              url: logInsightsUrl,
            } satisfies Button,
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Raw Log Stream',
                emoji: true,
              },
              url: detailUrl,
            } satisfies Button,
          ],
        } satisfies ActionsBlock,
      ]

      // @shiftcode/logger's JSON error attribute is nested under `error.stack`/`error.message`
      // (see `ErrorAttributes` in @shiftcode/logger) rather than a flat `exception` string
      const exceptionText = parsedMessage.error ? parsedMessage.error.stack || parsedMessage.error.message : null

      return {
        blocks,
        attachments: exceptionText
          ? [
              {
                fallback: 'none',
                author_name: 'Exception',
                footer: replaceTabs(exceptionText),
              } satisfies MessageAttachment,
            ]
          : [],
      }
    },
  )

  await Promise.all(
    messages.map((message) => postSlackMessage(message.blocks, message.attachments, slackWebhookEndpoint)),
  )
}
