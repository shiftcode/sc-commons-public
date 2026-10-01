/**
 * Slack "attachment" payload (legacy attachments API, as opposed to Block Kit), used by
 * `publish-alarm-to-slack-fn.ts` to post CloudWatch Alarm state changes.
 * see https://api.slack.com/reference/messaging/attachments
 */
export interface SlackNotification {
  fallback: string
  color: string
  pretext?: string
  // eslint-disable-next-line @typescript-eslint/naming-convention -- Slack's attachment API uses snake_case
  author_name?: string
  title?: string
  // eslint-disable-next-line @typescript-eslint/naming-convention -- Slack's attachment API uses snake_case
  mrkdwn_in?: string[]
  text?: string
  actions?: Array<{ type: string; text: string; url: string }>
  ts?: number
  fields?: Array<{
    title?: string
    value?: string
    short?: boolean
  }>
}
