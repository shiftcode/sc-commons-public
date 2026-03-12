import { PublishCommand, PublishCommandInput, SNSClient } from '@aws-sdk/client-sns'
import { LoggerService } from '@shiftcode/inversify-logger'
import { Logger } from '@shiftcode/logger'
import { inject, injectable } from 'inversify'

import { AirtableSyncConfig } from '../config/airtable-config.model.js'
import { AIRTABLE_SYNC_CONFIG } from '../module/airtable-sync-config.symbol.js'

@injectable()
export class SnsPublisher {
  private readonly snsClient: SNSClient
  private readonly logger: Logger

  constructor(
    @inject(AIRTABLE_SYNC_CONFIG) private readonly config: AirtableSyncConfig,
    loggerService: LoggerService,
  ) {
    this.snsClient = new SNSClient({})
    this.logger = loggerService.getInstance('SnsPublisher')
  }

  /**
   * publishes the given message on given message
   * @param topic topic to publish; gets prefixed to get the arn: `arn:aws:sns:${region}:${topic}`
   * @param message, json serializable object
   * @returns the published message id
   */
  async publishMessageToTopic(topic: string, message: any): Promise<string | undefined> {
    try {
      this.logger.debug(`publishing message to topic ${topic}`, message)
      const topicArn = `arn:aws:sns:${this.config.airtableSync.snsTopicRegion}:${topic}`
      const params: PublishCommandInput = {
        Message: JSON.stringify(message),
        TopicArn: topicArn,
      }
      const resp = await this.snsClient.send(new PublishCommand(params))
      this.logger.info(`published ${topicArn} to SNS`, resp)
      return resp.MessageId
    } catch (e) {
      this.logger.error(`Error publishing message to topic ${topic}`, e)
      throw e
    }
  }
}
