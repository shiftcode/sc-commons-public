import { injectable } from 'inversify'
import { vi } from 'vitest'

@injectable()
export class S3HelperMock {
  /** {@link S3Helper#init} */
  init = vi.fn()

  /** {@link S3Helper#listAll} */
  listAll = vi.fn().mockReturnValue(Promise.resolve(new Map()))

  uploadJson = vi.fn().mockReturnValue(Promise.resolve())

  get uploadJsonCalls() {
    return this.uploadJson.mock.calls
  }
}
