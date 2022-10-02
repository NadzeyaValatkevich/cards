//Function removes all empty fields of obj and returns new object
//from: https://stackoverflow.com/a/38340730

export const removeEmptyObj = (obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value))
}

export const compareObj = (obj1: Record<string, any>, obj2: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj1).filter(([key, value]) => obj2[key] !== value))
}
