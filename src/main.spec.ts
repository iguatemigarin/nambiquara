import { fromArray, makeSimpleSpreadsheet, makeStyledSpreadsheet } from './main'

describe('main package', () => {
  it('should export fromArray function', () => {
    expect(typeof fromArray).toBe('function')
  })
  it('should export makeSimpleSpreadsheet function', () => {
    expect(typeof makeSimpleSpreadsheet).toBe('function')
  })
  it('should export makeStyledSpreadsheet function', () => {
    expect(typeof makeStyledSpreadsheet).toBe('function')
  })
})
