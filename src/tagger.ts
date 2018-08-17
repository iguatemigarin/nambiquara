export type Props = {
  [key: string]: any,
  children?: string,
}
export type Tag = {
  name: string,
  children?: string,
  props?: Props,
}
export const makeTag = (tag: Tag): string => {
  const { name, children, props } = tag
  const params = makeParams(props)
  const head = `<${name}${params.length > 0 ? ' ' + params : ''}`
  if (children == null) {
    return `${head} />`
  }
  return `${head}>${children}</${name}>`
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
