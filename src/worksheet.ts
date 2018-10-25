import { makeTag } from './tagger'
import { Cell } from './types'
export const makeTypeForValue = (value: Cell): string => {
  if (typeof value === 'number') {
    return 'Number'
  }
  return 'String'
}
export const makeValue = (cell: Cell): string => {
  if (cell == null) {
    return ''
  }
  if (typeof cell === 'object') {
    return String(cell.value)
  }
  return String(cell)
}
const makeStyleForCell = (cell: Cell): { 'ss:StyleID'?: string } => {
  if (typeof cell !== 'object' || cell == null) {
    return {}
  }

  return {
    'ss:StyleID': cell.styleId,
  }
}
const makeData = (cell: Cell): string => makeTag({
  name: 'Data',
  children: makeValue(cell),
  props: {
    'ss:Type': makeTypeForValue(cell),
  },
})
const makeCell = (cell: Cell): string => makeTag({
  name: 'Cell',
  children: makeData(cell),
  props: makeStyleForCell(cell),
})
const makeRow = (values: Cell[]): string => makeTag({ name: 'Row', children: values.map(makeCell).join('') })
const makeRows = (values: Cell[][]): string => values.map(makeRow).join('')
const makeWidths = (widths: number[]): string =>
  widths
    .map(width => makeTag({ name: 'Column', props: { 'ss:Width': String(width) }}))
    .join('')
const makeTable = (values: Cell[][], widths: number[]): string =>
  makeTag({ name: 'Table', children: [makeWidths(widths), makeRows(values)] })
export const makeWorksheetOptions = (): string => makeTag({ name: 'x:WorksheetOptions' })

export const makeWorksheet = (values: Cell[][], widths: number[]): string => makeTag({
  name: 'ss:Worksheet',
  children: [makeTable(values, widths), makeWorksheetOptions()],
  props: {
    'ss:Name': 'Worksheet1',
  },
})
