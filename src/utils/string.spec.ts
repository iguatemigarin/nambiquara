import { removeDoubleSpaces, removeMultipleSpaces, removeNewLines } from './string'

describe('string utils', () => {
  it('should remove new lines', () => {
    const sample = `
    X \n X
    `
    const expected = '    X  X    '
    expect(removeNewLines(sample)).toBe(expected)
  })
  it('should remove double spaces', () => {
    const sample = 'X  X  X   X'
    const expected = 'X X X  X'
    expect(removeDoubleSpaces(sample)).toBe(expected)
  })
  it('should remove multiple spaces', () => {
    const sample = ' X    X     X   X    '
    const expected = ' X X X X '
    expect(removeMultipleSpaces(sample)).toBe(expected)
  })
})
