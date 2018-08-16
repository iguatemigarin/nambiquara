type CellValue = number | string | null | void
const makeHeader = () => `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>`
// tslint:disable
const makeWorkbookOpenTag = () => `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:c="urn:schemas-microsoft-com:office:component:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x2="http://schemas.microsoft.com/office/excel/2003/xml" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`
// tslint:enable
const makeWorkbookCloseTag = () => `</Workbook>`
const makeWorksheetOpenTag = () => `<ss:Worksheet ss:Name="Worksheet1">`
const makeWorksheetCloseTag = () => `</ss:Worksheet>`
const makeWorksheetOptionsTag = () => `<x:WorksheetOptions/>`
const makeTableOpenTag = () => `<Table>`
const makeTableCloseTag = () => `</Table>`
const makeRowOpenTag = () => `<Row>`
const makeRowCloseTag = () => `</Row>`
const makeCellOpenTag = () => `<Cell>`
const makeCellCloseTag = () => `</Cell>`
const makeTypeForValue = (value: CellValue) => {
  switch (typeof value) {
    case 'string': return 'String'
    case 'number': return 'Number'
    default: return 'String'
  }
}
const makeDataOpenTag = (value: CellValue) => `<Data ss:Type="${makeTypeForValue(value)}">`
const makeDataCloseTag = () => `</Data>`
const makeValue = (value: CellValue) => value == null ? '' : value
const makeDataTag = (value: CellValue) => `${makeDataOpenTag(value)}${makeValue(value)}${makeDataCloseTag()}`
const makeCellTag = (value: CellValue) => `${makeCellOpenTag()}${makeDataTag(value)}${makeCellCloseTag()}`
const makeRow = (values: CellValue[]) => `${makeRowOpenTag()}${values.map(makeCellTag).join('')}${makeRowCloseTag()}`
const makeRows = (values: CellValue[][]) => values.map(makeRow).join('')
const makeTableTag = (values: CellValue[][]) => `${makeTableOpenTag()}${makeRows(values)}${makeTableCloseTag()}`
const makeWorksheet = (values: CellValue[][]) => [
  makeWorksheetOpenTag(),
  makeTableTag(values),
  makeWorksheetOptionsTag(),
  makeWorksheetCloseTag(),
].join('')
const makeWorkBook = (values: CellValue[][]) => [
  makeWorkbookOpenTag(),
  makeWorksheet(values),
  makeWorkbookCloseTag(),
].join('')
const makeSheet = (values: CellValue[][]) => [
  makeHeader(),
  makeWorkBook(values),
].join('')
export const fromArray = (values: CellValue[][]) => makeSheet(values)
