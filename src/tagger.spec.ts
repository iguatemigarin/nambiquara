import { makeTag } from './tagger'

describe('Tag tool', () => {
  it('should create simple tag without children', () => {
    const settings = { name: 'MyTag' }
    const tag = makeTag(settings)
    expect(tag).toBe('<MyTag />')
  })
  it('should create simple tag without children', () => {
    const settings = { name: 'MyTag', children: 'this is a text' }
    const tag = makeTag(settings)
    expect(tag).toBe('<MyTag>this is a text</MyTag>')
  })
  it('should create simple tag without props', () => {
    const settings = {
      name: 'MyTag',
      props: {
        'is-boolean-false': false,
        'is-boolean-true': true,
        'is-null': null,
        'is-number': 123.3,
        'is-object': {},
        'is-string': 'some string',
        'is-undefined': undefined,
      }
    }
    const tag = makeTag(settings)
    expect(tag).toBe('<MyTag is-boolean-false="false" is-boolean-true="true" is-null="null" ' +
      'is-number="123.3" is-object="{}" is-string="some string" />')
  })
})
