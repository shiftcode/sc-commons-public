import type { Context, SNSEvent } from 'aws-lambda'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const ssmMock = vi.hoisted(() => vi.fn())
vi.mock('@shiftcode/lambda-utilities/ssm', () => ({ fetchSsmStringParamValue: ssmMock }))

const cloudWatchLogsSendMock = vi.hoisted(() => vi.fn())
vi.mock('@aws-sdk/client-cloudwatch-logs', () => ({
  CloudWatchLogs: class {
    filterLogEvents = cloudWatchLogsSendMock
  },
}))

const fetchMock = vi.hoisted(() => vi.fn())
vi.stubGlobal('fetch', fetchMock)

const { handler } = await import('./publish-alarm-to-slack-fn.js')

interface SlackAttachment {
  fallback: string
  color: string
  pretext: string
  title?: string
  text?: string
  // eslint-disable-next-line @typescript-eslint/naming-convention -- Slack's attachment API uses snake_case
  author_name?: string
  actions?: Array<{ type: string; text: string; url: string }>
}

type FetchCall = [string, { method: string; headers: Record<string, string>; body: string }]

function snsEvent(message: Record<string, unknown>): SNSEvent {
  return { Records: [{ Sns: { Message: JSON.stringify(message) } } as never] }
}

function attachmentFromFetchCall(index: number): SlackAttachment {
  const [, options] = fetchMock.mock.calls[index] as FetchCall
  const body = JSON.parse(options.body) as { attachments: SlackAttachment[] }
  return body.attachments[0]
}

describe('publish-alarm-to-slack-fn handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ssmMock.mockResolvedValue('https://hooks.slack.com/services/test')
    cloudWatchLogsSendMock.mockResolvedValue({ events: [] })
    fetchMock.mockResolvedValue({ ok: true, status: 200 })
    process.env.SLACK_WEBHOOK_ENDPOINT_SSM_PARAM_ARN = 'arn:aws:ssm:eu-central-1:123456789012:parameter/slack'
  })

  test('ignores non-ALARM state changes', async () => {
    await handler(snsEvent({ NewStateValue: 'OK', AlarmName: 'MyAlarm' }), {} as Context, () => undefined)

    expect(fetchMock).not.toHaveBeenCalled()
  })

  test('posts a slack message for ALARM state changes', async () => {
    await handler(
      snsEvent({
        NewStateValue: 'ALARM',
        NewStateReason: 'Threshold breached',
        StateChangeTime: '2024-01-01T00:00:00.000Z',
        AlarmName: 'MyAlarm',
        AlarmDescription: JSON.stringify({ region: 'eu-central-1', description: 'Alarm for MyAlarm' }),
        Trigger: { Period: 60, EvaluationPeriods: 1 },
      }),
      {} as Context,
      () => undefined,
    )

    expect(fetchMock).toHaveBeenCalledWith(
      'https://hooks.slack.com/services/test',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(attachmentFromFetchCall(0)).toMatchObject({
      color: 'danger',
      pretext: '[2024-01-01T00:00:00.000Z] *MyAlarm* - Threshold breached',
    })
  })

  test('enriches the slack message with recent log events when a log group is correlated', async () => {
    cloudWatchLogsSendMock.mockResolvedValue({
      events: [
        { message: 'boom', logStreamName: 'stream', timestamp: 1_700_000_000_000, eventId: 'evt-1' },
        {
          message: 'Task timed out after 3.00 seconds',
          logStreamName: 'stream',
          timestamp: 1_700_000_000_001,
          eventId: 'evt-2',
        },
      ],
    })

    await handler(
      snsEvent({
        NewStateValue: 'ALARM',
        NewStateReason: 'Threshold breached',
        StateChangeTime: '2024-01-01T00:00:00.000Z',
        AlarmName: 'MyAlarm',
        AlarmDescription: JSON.stringify({
          region: 'eu-central-1',
          description: 'Alarm for MyAlarm',
          logGroupName: '/aws/lambda/my-fn',
        }),
        Trigger: { Period: 60, EvaluationPeriods: 1 },
      }),
      {} as Context,
      () => undefined,
    )

    expect(cloudWatchLogsSendMock).toHaveBeenCalled()
    const attachment = attachmentFromFetchCall(0)
    expect(attachment.text).toContain('Task timed out after 3.00 seconds')
    expect(attachment.author_name).toBe(':alarm_clock: Timeout error')
    expect(attachment.actions?.[0].url).toContain(
      'group=/aws/lambda/my-fn;stream=stream;reftime=1700000000001;refid=evt-2',
    )
  })

  test('throws when the slack webhook call fails', async () => {
    fetchMock.mockRejectedValue(new Error('network error'))

    await expect(
      handler(
        snsEvent({
          NewStateValue: 'ALARM',
          NewStateReason: 'Threshold breached',
          StateChangeTime: '2024-01-01T00:00:00.000Z',
          AlarmName: 'MyAlarm',
          AlarmDescription: JSON.stringify({ region: 'eu-central-1', description: 'Alarm for MyAlarm' }),
          Trigger: { Period: 60, EvaluationPeriods: 1 },
        }),
        {} as Context,
        () => undefined,
      ),
    ).rejects.toThrow('network error')
  })
})
