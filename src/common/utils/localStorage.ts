export const loadState = <T>(): T | undefined => {
  try {
    // const serializedState = localStorage.getItem('state')
    const serializedState = sessionStorage.getItem('state')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState) as T
  } catch (err) {
    return undefined
  }
}

export const saveState = <T>(state: T) => {
  try {
    const serializedState = JSON.stringify(state)

    // localStorage.setItem('state', serializedState)
    sessionStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}
