import { DOMParser } from 'xmldom'
import { makeTypeForValue, makeValue, makeWorksheetOptions } from './worksheet'

describe('Worksheet module', () => {
  test('makeWorksheetOptions must render options tag', () => {
    expect(makeWorksheetOptions()).toBe('<x:WorksheetOptions/>')
  })
  test('makeTypeForValue must render number type', () => {
    const values = [1, 1.3, NaN, 0, -0, -Infinity]
    const types = values.map(makeTypeForValue).filter(n => n === 'Number')
    expect(types.length).toBe(values.length)
  })
  test('makeTypeForValue must render string type', () => {
    const values = ['a', String(1)]
    const types = values.map(makeTypeForValue).filter(n => n === 'String')
    expect(types.length).toBe(values.length)
  })
  test('makeTypeForValue must render not numbers as string type', () => {
    const values = ['a', String(1), null, {}, [], undefined]
    const types = values.map(makeTypeForValue).filter(n => n === 'String')
    expect(types.length).toBe(values.length)
  })
  test('makeValue must generate empty strings on nullble values', () => {
    const values = [null, undefined]
    const verfied = values.map(makeValue).filter(n => n === '')
    expect(verfied.length).toBe(values.length)
  })
  test('makeValue must cast any value to string', () => {
    const values = [1, undefined, [], {}, null, 'x']
    const types = values.map(makeValue).filter(n => typeof n === 'string')
    expect(types.length).toBe(values.length)
  })
})
