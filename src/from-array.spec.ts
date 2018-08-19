import { DOMParser } from 'xmldom'

import { fromArray } from './from-array'
import { removeDoubleSpaces, removeNewLines } from './utils/string'

const parser = new DOMParser()

describe('main package', () => {
  it('should generate simple spreadsheet from array', () => {
    const input = [['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3']]
    const output = fromArray(input)
    const sheet = parser.parseFromString(output)
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    expect(cellCount).toBe(9)
  })
  it('should generate simple spreadsheet from array of numbers', () => {
    const input = [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
    const output = fromArray(input)
    const sheet = parser.parseFromString(output)
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    expect(cellCount).toBe(9)
  })
  it('should generate simple spreadsheet from array of mixed values', () => {
    const input = [[1, 'B1', 1], [2, 2], [3, 3, 3], [], [], [null, null, null, 0, undefined]]
    const output = fromArray(input)
    const sheet = parser.parseFromString(output)
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    expect(cellCount).toBe(13)
  })
})
