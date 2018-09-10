import { makeTag } from './tagger'

export type CellValue = number | string | null | void | object

const HEAD: string = '<?xml version="1.0" encoding="UTF-16"?><?mso-application progid="Excel.Sheet"?>'
export const makeWorksheetOptions = (): string => makeTag({ name: 'x:WorksheetOptions' })
export const makeTypeForValue = (value: CellValue): string => {
  if (typeof value === 'number') {
    return 'Number'
  }
  return 'String'
}
export const makeValue = (value: CellValue): string => value == null ? '' : String(value)
const makeData = (value: CellValue): string => makeTag({
  name: 'Data',
  children: makeValue(value),
  props: {
    'ss:Type': makeTypeForValue(value),
  },
})
const makeCell = (value: CellValue): string => makeTag({ name: 'Cell', children: makeData(value) })
const makeRow = (values: CellValue[]): string => makeTag({ name: 'Row', children: values.map(makeCell).join('') })
const makeRows = (values: CellValue[][]): string => values.map(makeRow).join('')
const makeTable = (values: CellValue[][]): string => makeTag({ name: 'Table', children: makeRows(values) })
const makeWorksheet = (values: CellValue[][]): string => makeTag({
  name: 'ss:Worksheet',
  children: [makeTable(values), makeWorksheetOptions()],
  props: {
    'ss:Name': 'Worksheet1',
  },
})
const makeWorkBook = (values: CellValue[][]): string => makeTag({
  name: 'Workbook',
  children: makeWorksheet(values),
  props: {
    'xmlns': 'urn:schemas-microsoft-com:office:spreadsheet',
    'xmlns:c': 'urn:schemas-microsoft-com:office:component:spreadsheet',
    'xmlns:html': 'http://www.w3.org/TR/REC-html40',
    'xmlns:o': 'urn:schemas-microsoft-com:office:office',
    'xmlns:ss': 'urn:schemas-microsoft-com:office:spreadsheet',
    'xmlns:x2': 'http://schemas.microsoft.com/office/excel/2003/xml',
    'xmlns:x': 'urn:schemas-microsoft-com:office:excel',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
})
export const makeSpreadsheet = (values: CellValue[][] = [[]]): string => [
  HEAD,
  makeWorkBook(values),
].join('')
