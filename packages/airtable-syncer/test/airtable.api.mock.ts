import { injectable } from 'inversify'
import { vi } from 'vitest'

@injectable()
export class AirtableApiMock {
  setBase = vi.fn()
  fetchAllByTable = vi.fn()
}
