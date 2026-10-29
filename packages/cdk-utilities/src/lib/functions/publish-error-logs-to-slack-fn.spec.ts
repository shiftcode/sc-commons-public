import { gzipSync } from 'node:zlib'

import type { CloudWatchLogsEvent, Context } from 'aws-lambda'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const ssmMock = vi.hoisted(() => vi.fn())
vi.mock('@shiftcode/lambda-utilities/ssm', () => ({ fetchSsmStringParamValue: ssmMock }))

const fetchMock = vi.hoisted(() => vi.fn())
vi.stubGlobal('fetch', fetchMock)

const { handler } = await import('./publish-error-logs-to-slack-fn.js')

interface SlackBlock {
  type: string
  text?: { type: string; text: string }
  elements?: Array<{ type: string; text?: string | { type: string; text: string }; url?: string }>
}

interface SlackAttachment {
  fallback: string
  // eslint-disable-next-line @typescript-eslint/naming-convention -- Slack's attachment API uses snake_case
  author_name: string
  footer: string
}

type FetchCall = [string, { method: string; headers: Record<string, string>; body: string }]

function cloudWatchLogsEvent(
  logGroup: string,
  logStream: string,
  logEvents: Array<{ message: string }>,
): CloudWatchLogsEvent {
  const decoded = {
    logGroup,
    logStream,
    logEvents: logEvents.map((e, i) => ({ id: `${i}`, timestamp: 1_700_000_000_000 + i, message: e.message })),
  }
  const data = gzipSync(Buffer.from(JSON.stringify(decoded))).toString('base64')
  return { awslogs: { data } }
}

function blocksFromFetchCall(index: number): SlackBlock[] {
  const [, options] = fetchMock.mock.calls[index] as FetchCall
  const body = JSON.parse(options.body) as { blocks: SlackBlock[] }
  return body.blocks
}

function attachmentsFromFetchCall(index: number): SlackAttachment[] {
  const [, options] = fetchMock.mock.calls[index] as FetchCall
  const body = JSON.parse(options.body) as { attachments: SlackAttachment[] }
  return body.attachments
}

describe('publish-error-logs-to-slack-fn handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ssmMock.mockResolvedValue('https://hooks.slack.com/services/test')
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: () => Promise.resolve('ok') })
    process.env.SLACK_WEBHOOK_ENDPOINT_SSM_PARAM_ARN = 'arn:aws:ssm:eu-central-1:123456789012:parameter/slack'
    process.env.AWS_REGION = 'eu-central-1'
  })

  test('posts one slack message per log event', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', '2024/01/01/[$LATEST]abc', [
        { message: JSON.stringify({ level: 'ERROR', logger: 'MyService', message: 'first error' }) },
        { message: JSON.stringify({ level: 'ERROR', logger: 'MyService', message: 'second error' }) },
      ]),
      {} as Context,
      () => undefined,
    )

    expect(fetchMock).toHaveBeenCalledTimes(2)
    const [firstUrl] = fetchMock.mock.calls[0] as FetchCall
    expect(firstUrl).toBe('https://hooks.slack.com/services/test')

    const blocks = blocksFromFetchCall(0)
    const messageSection = blocks.find((b) => b.type === 'section')
    expect(messageSection?.text?.text).toContain('first error')
    const actionsBlock = blocks.find((b) => b.type === 'actions')
    expect(actionsBlock?.elements?.[1].url).toContain('group=/aws/lambda/my-fn;stream=2024/01/01/[$LATEST]abc')
  })

  test('renders structured object messages as JSON text', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [
        { message: JSON.stringify({ level: 'ERROR', message: { orderId: 42, reason: 'timeout' } }) },
      ]),
      {} as Context,
      () => undefined,
    )

    const messageSection = blocksFromFetchCall(0).find((b) => b.type === 'section')
    expect(messageSection?.text?.text).toContain('"orderId": 42')
  })

  test('escapes slack markup characters in the message', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [
        { message: JSON.stringify({ level: 'ERROR', message: '<tag> & "quote"' }) },
      ]),
      {} as Context,
      () => undefined,
    )

    const blocks = blocksFromFetchCall(0)
    const messageSection = blocks.find((b) => b.type === 'section')
    expect(messageSection?.text?.text).toContain('&lt;tag&gt; &amp; "quote"')
  })

  test('extracts logger name from a structured @shiftcode/logger JSON log line', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [
        { message: JSON.stringify({ level: 'ERROR', logger: 'MyService', message: 'something failed' }) },
      ]),
      {} as Context,
      () => undefined,
    )

    const blocks = blocksFromFetchCall(0)
    const contextBlocks = blocks.filter((b) => b.type === 'context')
    const loggerElement = contextBlocks.flatMap((b) => b.elements ?? []).find((e) => e.text === 'MyService')
    expect(loggerElement).toBeDefined()
    expect(attachmentsFromFetchCall(0)).toEqual([])
  })

  test('renders the error stack as a separate attachment with tabs replaced', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [
        {
          message: JSON.stringify({
            level: 'ERROR',
            logger: 'MyService',
            message: 'something failed',
            error: { name: 'Error', message: 'boom', stack: 'Error: boom\n\tat foo\n\tat bar' },
          }),
        },
      ]),
      {} as Context,
      () => undefined,
    )

    const [attachment] = attachmentsFromFetchCall(0)
    expect(attachment).toMatchObject({ author_name: 'Exception' })
    expect(attachment.footer).toBe('Error: boom\n    at foo\n    at bar')
  })

  test('falls back to the error message when no stack is present', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [
        {
          message: JSON.stringify({
            level: 'ERROR',
            logger: 'MyService',
            error: { name: 'Error', message: 'boom' },
          }),
        },
      ]),
      {} as Context,
      () => undefined,
    )

    const [attachment] = attachmentsFromFetchCall(0)
    expect(attachment.footer).toBe('boom')
  })

  test('unwraps the default Lambda log format (timestamp\\trequestId\\tlevel\\t{json}) before parsing', async () => {
    const structuredMessage = JSON.stringify({ level: 'ERROR', logger: 'MyService', message: 'something failed' })
    const plaintextLambdaLogLine = `2024-01-01T00:00:00.000Z\treq-id-123\tERROR\t${structuredMessage}`

    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [{ message: plaintextLambdaLogLine }]),
      {} as Context,
      () => undefined,
    )

    const blocks = blocksFromFetchCall(0)
    const messageSection = blocks.find((b) => b.type === 'section')
    expect(messageSection?.text?.text).toContain('something failed')
    const contextBlocks = blocks.filter((b) => b.type === 'context')
    const loggerElement = contextBlocks.flatMap((b) => b.elements ?? []).find((e) => e.text === 'MyService')
    expect(loggerElement).toBeDefined()
  })
  describe('log insights link', () => {
    const insightsUrl = async (message: string) => {
      await handler(cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [{ message }]), {} as Context, () => undefined)
      return blocksFromFetchCall(0).find((b) => b.type === 'actions')?.elements?.[0].url as string
    }
    const structured = JSON.stringify({ level: 'ERROR', message: 'something failed', logger: 'MyLogger' })

    test('filters by request id for plaintext lambda logs', async () => {
      const url = await insightsUrl(`2024-01-01T00:00:00.000Z\treq-id-123\tERROR\t${structured}`)
      expect(url).toContain('req-id-123')
    })

    test('omits the request id filter if no request id is available', async () => {
      const url = await insightsUrl(structured)
      expect(url).not.toContain('requestId')
      expect(url).not.toContain('undefined')
    })
  })
  test('truncates very long messages below the slack section limit', async () => {
    await handler(
      cloudWatchLogsEvent('/aws/lambda/my-fn', 'stream', [
        { message: JSON.stringify({ level: 'ERROR', message: '<&>'.repeat(2000) }) },
      ]),
      {} as Context,
      () => undefined,
    )

    const text = blocksFromFetchCall(0).find((b) => b.type === 'section')?.text?.text as string
    expect(text.length).toBeLessThan(3000)
    expect(text).toContain('(truncated)')
  })
})
