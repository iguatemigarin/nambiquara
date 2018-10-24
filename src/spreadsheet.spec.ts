import { DOMParser } from 'xmldom'
import { makeSimpleSpreadsheet, makeStyledSpreadsheet } from './spreadsheet'

const parser = new DOMParser()

describe('main package', () => {
  it('should generate empty spreadsheet', () => {
    const sheet = parser.parseFromString(makeSimpleSpreadsheet())
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    expect(cellCount).toBe(0)
  })
  it('should generate styled spreadsheet', () => {
    const sheet = parser.parseFromString(makeStyledSpreadsheet())
    const cellCount = sheet.documentElement.getElementsByTagName('Cell').length
    const styleCount = sheet.documentElement.getElementsByTagName('Style').length
    const stylesCount = sheet.documentElement.getElementsByTagName('Styles').length
    expect(cellCount).toBe(0)
    expect(styleCount).toBe(0)
    expect(stylesCount).toBe(1)
  })
})
