import { makeTag } from './tagger'
import { FontStyle, StyleParams } from './types'

export const makeStyles = (params: StyleParams[] = []) => {
  const styles = params.map(param => {
    const props = translateStyleParams(param)
    const children = [makeFontTag(param), makeInteriorTag(param)]
    return makeTag({ name: 'Style', props, children })
  })

  return makeTag({ name: 'Styles', children: styles })
}
const makeFontTag = (params: StyleParams) => {
  const props = translateFontParams(params.font || {})
  return makeTag({ name: 'Font', props })
}
const makeInteriorTag = (params: StyleParams) => makeTag({
  name: 'Interior', props: {
    'ss:Color': params.background || '',
    'ss:Pattern': 'Solid',
  },
})
const translateStyleParams = (params: StyleParams) => ({
  'ss:ID': params.id,
})
const translateFontParams = (font: FontStyle = {}) => ({
  'ss:Bold': font.bold ? 1 : 0,
  'ss:Color': font.color ? font.color : '',
  'ss:Size': font.size && font.size > 0 ? font.size : '',
})
