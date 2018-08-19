export type Props = {
  [key: string]: any,
}
export type Tag = {
  name: string,
  children?: string | string[],
  props?: Props,
}
export const makeTag = (tag: Tag): string => {
  const { name, children, props = {} } = tag
  const params = makeParams(props)
  const head = `<${name}${params.length > 0 ? ' ' + params : ''}`
  const childrenToRender: string[] = []
  if (children == null) {
    return `${head} />`
  }
  if (Array.isArray(children)) {
    children.map(child => childrenToRender.push(child))
  } else {
    childrenToRender.push(children)
  }
  return `${head}>${childrenToRender.join('')}</${name}>`
}
const makeParams = (props: Props): string => {
  const params: string[] = []
  for (const prop in props) {
    if (props[prop] === undefined) {
      continue
    }

    if (typeof props[prop] === 'string') {
      params.push(`${prop}="${props[prop]}"`)
      continue
    }
    params.push(`${prop}="${JSON.stringify(props[prop])}"`)
  }
  return params.join(' ')
}
