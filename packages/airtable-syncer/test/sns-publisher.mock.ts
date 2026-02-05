import { injectable } from 'inversify'
import { vi } from 'vitest'

@injectable()
export class SnsPublisherMock {
  get calls() {
    return this.publishMessageToTopic.mock.calls
  }
  publishMessageToTopic = vi.fn().mockReturnValue(Promise.resolve('foo-bar-id'))
}
