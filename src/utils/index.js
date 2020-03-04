
/* isEmpty
* Checks if a variable is a plain JavaScript Object
* @param obj - Plain JavaScript Object
* @return Boolean
*  */
export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

export const dateTimeFmt = (
  date,
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
) => {
  const rtf = new Intl.DateTimeFormat('en-US', options)
  return rtf.format(date)
}