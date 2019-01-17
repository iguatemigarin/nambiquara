export type StyleId = string
export type CellValue = number | string | null | void
export type StyledCell = {
  value: CellValue,
  styleId: StyleId,
  mergeAcross?: number
}
export type Cell = StyledCell | CellValue
export type Props = {
  [key: string]: any,
}
export type Tag = {
  name: string,
  children?: string | string[],
  props?: Props,
}
export type StyleParams = {
  id: string,
  font?: FontStyle,
  background?: string,
  align?: string,
}
export type FontStyle = {
  bold?: boolean,
  color?: string,
  size?: number,
}
