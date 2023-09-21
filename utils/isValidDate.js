function isValidDate(date) {
  if (date === '' || date === null || date === undefined) {
    date = new Date()
    return { dateIsValid: true, dateObj: date }
  } else {
    if (Date.parse(date)) return { dateIsValid: true, dateObj: new Date(date) }
    return { dateIsValid: false, dateObj: null }
  }
}

module.exports = isValidDate