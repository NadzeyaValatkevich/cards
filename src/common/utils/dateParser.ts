export const dateParser = (date: string) => {
  const newDate = new Date(date)

  const year = newDate.getFullYear()
  let month: string | number = newDate.getMonth() + 1
  let dt: string | number = newDate.getDate()

  if (dt < 10) {
    dt = '0' + dt
  }
  if (month < 10) {
    month = '0' + month
  }

  return `${dt}.${month}.${year}`
}
