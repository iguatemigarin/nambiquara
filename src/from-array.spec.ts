
import { fromArray } from './from-array'
import { removeDoubleSpaces, removeNewLines } from './utils/string'

describe('main package', () => {
  it('should generate simple spreadsheet from array', () => {
    // tslint:disable
    const simpleSample = removeNewLines(removeDoubleSpaces(`<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:c="urn:schemas-microsoft-com:office:component:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x2="http://schemas.microsoft.com/office/excel/2003/xml" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><ss:Worksheet ss:Name="Worksheet1"><Table><Row><Cell><Data ss:Type="String">A1</Data></Cell><Cell><Data ss:Type="String">B1</Data></Cell><Cell><Data ss:Type="String">C1</Data></Cell></Row><Row><Cell><Data ss:Type="String">A2</Data></Cell><Cell><Data ss:Type="String">B2</Data></Cell><Cell><Data ss:Type="String">C2</Data></Cell></Row><Row><Cell><Data ss:Type="String">A3</Data></Cell><Cell><Data ss:Type="String">B3</Data></Cell><Cell><Data ss:Type="String">C3</Data></Cell></Row></Table><x:WorksheetOptions /></ss:Worksheet></Workbook>`))
    // tslint:enable
    const input = [['A1', 'B1', 'C1'], ['A2', 'B2', 'C2'], ['A3', 'B3', 'C3']]
    const output = fromArray(input)
    expect(output).toBe(simpleSample)
  })
})
