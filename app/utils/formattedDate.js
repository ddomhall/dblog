export default function formattedDate(date) {
  date = new Date(date)
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  return  `${day}/${month}/${date.getFullYear()} - ${hours}:${minutes}:${seconds}`
}

