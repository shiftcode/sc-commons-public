import { injectable } from 'inversify'
import { vi } from 'vitest'

@injectable()
export class AirtableFetcherMock {
  clearCache = vi.fn()
  init = vi.fn()
  fetchAll = vi.fn()
}
