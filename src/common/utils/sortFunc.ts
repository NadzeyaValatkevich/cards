export type sortFuncType = 'desc' | 'asc'

export const sortFunc = (value: sortFuncType): 'desc' | 'asc' => (value === 'asc' ? 'desc' : 'asc')
