import { makeStyles } from './styles'

// Example
// <Styles>
//   <Style ss:ID="ce1">
//     <Font ss:Bold="1" ss:Color="#000000" ss:Size="10"/>
//     <Interior ss:Color="#fb9e00" ss:Pattern="Solid"/>
//   </Style>
// </Styles>

describe('Style tool', () => {
  it('Should create empty Style tag', () => {
    const style = makeStyles([{ id: 'theId' }])
    const expected = '<Styles><Style ss:ID="theId"></Style></Styles>'
    expect(style).toBe(expected)
  })

  it('Should create styles tag', () => {
    const style = makeStyles([{
      id: 'theId',
      font: {
        bold: true,
        color: '#000000',
        size: 10,
      },
      background: '#FF0000',
    }, {
      id: 'theId2',
      font: {
        bold: true,
        color: '#FFFFFF',
        size: 10,
      },
      background: '#000000',
    }])

    const expected = '<Styles><Style ss:ID="theId"><Font ss:Bold="1" ss:Color="#000000" ss:Size="10"/>' +
    '<Interior ss:Color="#FF0000" ss:Pattern="Solid"/></Style><Style ss:ID="theId2"><Font ss:Bold="1" ' +
    'ss:Color="#FFFFFF" ss:Size="10"/><Interior ss:Color="#000000" ss:Pattern="Solid"/></Style></Styles>'
    expect(style).toBe(expected)
  })
})
