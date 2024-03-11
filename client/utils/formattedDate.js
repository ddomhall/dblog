export default function formattedDate(date) {
  date = new Date(date)
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  return  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${day}/${month}/${date.getFullYear()}`
}

