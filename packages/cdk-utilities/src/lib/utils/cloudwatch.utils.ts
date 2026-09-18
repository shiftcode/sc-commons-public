import { stringify as stringifyJsurl } from 'jsurl'

const logEventErrorTypes = ['timeout', 'memory', 'missingModule', 'general'] as const
export type LogEventErrorType = (typeof logEventErrorTypes)[number]

export const logEventErrorConfiguration: Record<
  LogEventErrorType,
  {
    readonly isTypeRegex: RegExp
    readonly slackErrorTypeMessage: string
  }
> = {
  timeout: {
    isTypeRegex: /\b(Task timed out after)\b/i,
    slackErrorTypeMessage: ':alarm_clock: Timeout error',
  },
  memory: {
    isTypeRegex: /\b(Process exited before completing request)\b/i,
    slackErrorTypeMessage: ':thermometer: Out of memory error',
  },
  missingModule: {
    isTypeRegex: /\b(missing on module)\b/i,
    slackErrorTypeMessage: ':hammer_and_wrench: Configuration error',
  },
  general: {
    isTypeRegex: /\b(error:\s)\b|\b(\serror\s)\b|\b(errorMessage)/i,
    slackErrorTypeMessage: ':no_entry: Function error',
  },
}

const logEventReplaceTimestamp = '(\\b[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z\\b)' // Time Stamp
const logEventReplaceWhiteSpace = '(\\s)' // White Space
const logEventReplaceProcessId = '([a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})' // Process ID

export const createLogStreamUrl = (
  logGroupName: string,
  region: string,
  logStreamName: string,
  timeStamp: number,
  eventId: string,
): string =>
  `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logEventViewer:group=${logGroupName};stream=${logStreamName};reftime=${timeStamp};refid=${eventId}`

/**
 * Checks if a log event message contains a keyword suggesting it's an error message
 * we check for general errors & resource constraints: TIMEOUT, OUT OF MEMORY and configuration failures
 * returns true if error was found
 */
export const isLogEventMessageError = (message = ''): boolean => !!convertMessageToLogEventErrorType(message)

export const convertMessageToLogEventErrorType = (message: string = ''): LogEventErrorType | null =>
  logEventErrorTypes.find((key) => message.search(logEventErrorConfiguration[key].isTypeRegex) > -1) || null

export const logEventExcludePattern = new RegExp(
  logEventReplaceTimestamp + logEventReplaceWhiteSpace + logEventReplaceProcessId,
  'i',
)

// log insights
export function uriEncoding(text: string) {
  const encoded = encodeURIComponent(text)
  return encoded.replaceAll('%', '$')
}

export interface LogInsightsQueryDetails {
  editorString: string
  timeType: 'ABSOLUTE'
  start: string
  end: string
  source: string[]
  tz: 'LOCAL' | 'UTC'
  lang: 'CWLI'
  unit?: 'seconds'
  queryId?: string
}

// https://repost.aws/questions/QUkdGEQP7rQZmDBUaB2Ai2Qg/aws-cloudwatch-log-insights-generate-url
// https://stackoverflow.com/questions/60796991/is-there-a-way-to-generate-the-aws-console-urls-for-cloudwatch-log-group-filters
export function createLogInsightsUrl(queryDetails: LogInsightsQueryDetails, region: string) {
  const encodedQueryDetails = stringifyJsurl(queryDetails)
  const urlPartial = `logs-insights?queryDetail=${encodedQueryDetails}`
  const encodedUrlPartial = uriEncoding(urlPartial)

  return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:${encodedUrlPartial}`
}

export function parsePlaintextLambdaLogMessage(rawMessageString: string):
  | {
      timestamp: string
      requestId: string
      level: string
      message: string
    }
  | undefined {
  // example log message (tab-separated)
  // 2025-11-28T10:51:00.947Z 73b4eccf-d677-5efd-a50b-8d6c56b4d6e0 INFO {"logger":"EmailEventProcessingFn","message":"xyz"}
  // See https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs-logformat.html#monitoring-cloudwatchlogs-format-default
  const match = rawMessageString.match(/(.*)\t(.*)\t(.*)\t({.*})/)
  if (match) {
    return {
      timestamp: match[1],
      requestId: match[2],
      level: match[3],
      message: match[4],
    }
  }
  return undefined
}
