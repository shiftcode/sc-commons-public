import { Records } from 'airtable'
import { vi } from 'vitest'

export class AirtableMock {
  selectMock = {
    all: vi.fn().mockReturnValue(Promise.resolve(<Records<any>>[])),
    firstPage: vi.fn().mockReturnValue(Promise.resolve(<Records<any>>[])),
    eachPage: vi.fn().mockReturnValue(Promise.resolve()),
  }

  mockedTable = {
    select: vi.fn().mockReturnValue(this.selectMock),
    find: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    replace: vi.fn(),
    destroy: vi.fn(),
  }
  mockedBase = vi.fn().mockReturnValue(this.mockedTable)

  base = vi.fn().mockReturnValue(this.mockedBase)
}
