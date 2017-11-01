const arrayDiff = require('../src/array-diff')

describe('arrayDiff', () => {
  it('detects subsisting elements', () => {
    const before = ['a', 'b', 'c']
    const after = ['a', 'b', 'c']
    expect(arrayDiff(before, after)).toEqual({
      subsisting: ['a', 'b', 'c'],
      deleted: [],
      created: []
    })
  })

  it('detects created elements', () => {
    const before = []
    const after = ['a', 'b', 'c']
    expect(arrayDiff(before, after)).toEqual({
      subsisting: [],
      deleted: [],
      created: ['a', 'b', 'c']
    })
  })

  it('detects deleted elements', () => {
    const before = ['a', 'b', 'c']
    const after = []
    expect(arrayDiff(before, after)).toEqual({
      subsisting: [],
      deleted: ['a', 'b', 'c'],
      created: []
    })
  })

  it('detects combinations', () => {
    const before = ['a', 'b', 'c']
    const after = ['e', 'a', 'c', 'd']
    expect(arrayDiff(before, after)).toEqual({
      subsisting: ['a', 'c'],
      deleted: ['b'],
      created: ['e', 'd']
    })
  })
})
