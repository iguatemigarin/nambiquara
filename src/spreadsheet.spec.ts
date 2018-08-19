
import { DOMParser, XMLSerializer } from 'xmldom'
import { makeSpreadsheet } from './spreadsheet'
import { removeDoubleSpaces, removeNewLines } from './utils/string'

const parser = new DOMParser()

describe('main package', () => {
  const sheet = parser.parseFromString(makeSpreadsheet())
  it('should generate empty spreadsheet', () => {
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    expect(cellCount).toBe(0)
  })
})
