import { makeTag } from './tagger'

export type CellValue = number | string | null | void

const HEAD: string = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>'
const makeWorksheetOptions = (): string => makeTag({ name: 'x:WorksheetOptions' })
const makeTypeForValue = (value: CellValue): string => {
  switch (typeof value) {
    case 'string': return 'String'
    case 'number': return 'Number'
    default: return 'String'
  }
}
const makeValue = (value: CellValue): string => value == null ? '' : String(value)
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
export const makeSpreadsheet = (values: CellValue[][]): string => [
  HEAD,
  makeWorkBook(values),
].join('')
