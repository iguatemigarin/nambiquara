import { DOMParser } from 'xmldom'
import { makeSpreadsheet } from './spreadsheet'

const parser = new DOMParser()

describe('main package', () => {
  const sheet = parser.parseFromString(makeSpreadsheet())
  it('should generate empty spreadsheet', () => {
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    expect(cellCount).toBe(0)
  })
})
