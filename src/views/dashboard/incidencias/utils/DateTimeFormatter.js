import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (params) => {
  // convertir la fecha y hora a UTC
  const date = dayjs(params).utc()
  // convertir la fecha UTC a la zona horaria 'America/Lima'
  const formattedDate = date.tz('America/Lima').format('DD-MM-YY HH:mm:ss')
  return formattedDate
}