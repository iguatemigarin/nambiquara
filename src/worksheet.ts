import { makeTag } from './tagger'
import { Cell } from './types'
export const makeTypeForValue = (value: Cell): string => {
  if (typeof value === 'number') {
    return 'Number'
  }
  return 'String'
}
export const makeValue = (value: Cell): string => value == null ? '' : String(value)
const makeData = (value: Cell): string => makeTag({
  name: 'Data',
  children: makeValue(value),
  props: {
    'ss:Type': makeTypeForValue(value),
  },
})
const makeCell = (value: Cell): string => makeTag({ name: 'Cell', children: makeData(value) })
const makeRow = (values: Cell[]): string => makeTag({ name: 'Row', children: values.map(makeCell).join('') })
const makeRows = (values: Cell[][]): string => values.map(makeRow).join('')
const makeTable = (values: Cell[][]): string => makeTag({ name: 'Table', children: makeRows(values) })
export const makeWorksheetOptions = (): string => makeTag({ name: 'x:WorksheetOptions' })

export const makeWorksheet = (values: Cell[][]): string => makeTag({
  name: 'ss:Worksheet',
  children: [makeTable(values), makeWorksheetOptions()],
  props: {
    'ss:Name': 'Worksheet1',
  },
})
