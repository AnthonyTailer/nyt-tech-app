
/* isEmpty
* Checks if a variable is a plain JavaScript Object
* @param obj - Plain JavaScript Object
* @return Boolean
*  */
export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object