import { makeSimpleSpreadsheet } from './spreadsheet'
import { Cell } from './types'

export const fromArray = (values: Cell[][]): string => makeSimpleSpreadsheet(values)
