import { makeTag } from './tagger'
import { FontStyle, StyleParams } from './types'

export const makeStyles = (params: StyleParams[] = []) => {
  const styles = params.map(param => {
    const props = translateStyleParams(param)
    const children = [makeFontTag(param), makeInteriorTag(param), makeAlignmentTag(param)]
    return makeTag({ name: 'Style', props, children })
  })

  return makeTag({ name: 'Styles', children: styles })
}
const makeFontTag = (params: StyleParams) => {
  if (!params.font) {
    return ''
  }
  const props = translateFontParams(params.font)
  return makeTag({ name: 'Font', props })
}
const makeInteriorTag = (params: StyleParams) => {
  if (!params.background) {
    return ''
  }
  return makeTag({
    name: 'Interior',
    props: {
      'ss:Color': fix3Color(params.background),
      'ss:Pattern': 'Solid',
    },
  })
}
const makeAlignmentTag = (params: StyleParams) => {
  if (!params.align) {
    return ''
  }
  return makeTag({
    name: 'Alignment',
    props: {
      'ss:Horizontal': String(params.align),
    },
  })
}
const translateStyleParams = (params: StyleParams) => ({
  'ss:ID': params.id,
})
const translateFontParams = (font: FontStyle = {}) => {
  const newObj: { [index: string]: string } = {
    'ss:Bold': font.bold ? '1' : '0',
  }
  if (font.color) {
    newObj['ss:Color'] = fix3Color(font.color)
  }
  if (font.size) {
    newObj['ss:Size'] = String(font.size)
  }

  return newObj
}
const fix3Color = (color: string) => {
  if (color[0] === '#' && color.length !== 7)  {
    return `${color[0]}${color.slice(1).split('').map(c => `${c}${c}`).join('')}`
  }
  return color
}
