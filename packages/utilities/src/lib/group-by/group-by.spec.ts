import { groupBy } from './group-by'

describe('group by', () => {
  it('numbers floor', () => {
    expect(groupBy([3.5, 3.2, 5.1, 5.0, 6], Math.floor)).toEqual({
      3: [3.5, 3.2],
      5: [5.1, 5.0],
      6: [6],
    })
  })
  it('string length', () => {
    expect(groupBy(['a', 'cc', 'dd', 'b'], 'length')).toEqual({
      1: ['a', 'b'],
      2: ['cc', 'dd'],
    })
  })
  it('objects prop', () => {
    const o1 = { a: true, b: 'ok' }
    const o2 = { a: false, b: 'nok' }
    expect(groupBy([o1, o2], 'a')).toEqual({
      true: [o1],
      false: [o2],
    })
    expect(groupBy([o1, o2], (i) => i.b.length)).toEqual({
      2: [o1],
      3: [o2],
    })
  })
})
