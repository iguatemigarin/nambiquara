export const removeNewLines = (str: string) => str.replace(/\n/g, '')
export const removeDoubleSpaces = (str: string) => str.replace(/  /g, ' ')
export const removeMultipleSpaces = (str: string) => str.replace(/ {2,}/g, ' ')
