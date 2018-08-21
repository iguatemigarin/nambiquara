# nambiquara

[![Build Status](https://semaphoreci.com/api/v1/iguatemi/nambiquara/branches/master/shields_badge.svg)](https://semaphoreci.com/iguatemi/nambiquara)

A js-to-excel tool

**Nanbiquara**: fala inteligente, de gente esperta – tribo do Mato Grosso (pauetê-nanbiquara – baquara – biquara).
[https://www.dicionariotupiguarani.com.br/dicionario/nanbiquara/]


## Usage

```javascript
import { fromArray } from 'nambiquara'

const data = [
  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],
]

const spreadsheet = fromArray(data)
/*
spreadsheet = '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:c="urn:schemas-microsoft-com:office:component:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x2="http://schemas.microsoft.com/office/excel/2003/xml" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><ss:Worksheet ss:Name="Worksheet1"><Table><Row><Cell><Data ss:Type="String">A1</Data></Cell><Cell><Data ss:Type="String">B1</Data></Cell><Cell><Data ss:Type="String">C1</Data></Cell></Row><Row><Cell><Data ss:Type="String">A2</Data></Cell><Cell><Data ss:Type="String">B2</Data></Cell><Cell><Data ss:Type="String">C2</Data></Cell></Row><Row><Cell><Data ss:Type="String">A3</Data></Cell><Cell><Data ss:Type="String">B3</Data></Cell><Cell><Data ss:Type="String">C3</Data></Cell></Row></Table><x:WorksheetOptions/></ss:Worksheet></Workbook>'
*/
```

## API

### fromArray

Accepts a two dimension array with primitive values.
Returns a string.

```javascript
fromArray([
  [1,2,3.8, Math.PI],
  [null, undefined],
  ['a sentence', '3', 'three']
])
```

___

### Code and license

Report bugs or contribute at [GitHub](https://github.com/iguatemigarin/nambiquara)

License: MIT
