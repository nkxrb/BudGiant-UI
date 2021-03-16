
/**
 * 判断两个非空对象是否相同
 * @param {Object} obj1
 * @param {Object} obj2
 */
export function equalForObj (obj1, obj2) {
  if (obj1 === null || obj2 === null) {
    return false
  }

  if (obj1 === obj2) {
    return true
  } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false
    }
    for (const key in obj1) {
      // eslint-disable-next-line eqeqeq
      if (obj2[key] != obj1[key]) {
        return false
      }
    }

    return true
  }

  return false
}
