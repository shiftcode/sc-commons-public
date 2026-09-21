import type { AlarmMetadata } from '../alarming.construct.js'

export type AlarmStateValue = 'ALARM' | 'OK' | 'INSUFFICIENT_DATA'

/**
 * Shape of the `Message` field of an SNS notification published by a CloudWatch Alarm created
 * via {@link AlarmingConstruct.addMetricAlarm}. `AlarmDescription` is JSON-parsed back into
 * `AlarmMetadata` (see `parseSNSAlarmDescriptionToCustomContent`).
 */
export interface CustomCloudWatchAlarmMessage {
  readonly AlarmName: string
  readonly AlarmDescription: AlarmMetadata
  readonly StateChangeTime: string
  readonly NewStateValue: AlarmStateValue
  readonly NewStateReason: string
  readonly Trigger: {
    readonly Period: number
    readonly EvaluationPeriods: number
  }
}
