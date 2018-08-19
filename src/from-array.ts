import { CellValue, makeSpreadsheet } from './spreadsheet'
export const fromArray = (values: CellValue[][]): string => makeSpreadsheet(values)
