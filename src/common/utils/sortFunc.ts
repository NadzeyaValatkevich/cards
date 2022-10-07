import { sortDir } from '../enums/enums'

export const sortFunc = (value: string | undefined): string => {
  if (!value) return sortDir.asc

  return value[0] === sortDir.asc ? sortDir.desc : sortDir.asc
}
