import { makeStyles } from './styles'
import { makeTag } from './tagger'
import { Cell, StyleParams } from './types'
import { makeWorksheet } from './worksheet'

const HEAD: string = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>'

const makeWorkBook = (values: Cell[][], styles: StyleParams[], widths: number[]): string => makeTag({
  name: 'Workbook',
  children: [makeStyles(styles), makeWorksheet(values, widths)],
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
export const makeSimpleSpreadsheet = (values: Cell[][] = [[]]): string => [
  HEAD,
  makeWorkBook(values, [], []),
].join('')

export const makeStyledSpreadsheet = (
    values: Cell[][] = [[]],
    styles: StyleParams[] = [],
    widths: number[] = [],
  ): string => [
  HEAD,
  makeWorkBook(values, styles, widths),
].join('')
