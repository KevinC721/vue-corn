/**
 * @param arr type: Array 查询的主体数组数据
 * @param key type: String 查询时需匹配的对象内的键
 * @param value type: String 查询时需要匹配的键对应的值
 * @param isFirst type: Boolean 查询该值匹配的第一个对象 —— true，查询该值匹配的最后一个对象 —— false
 */
export function findObj (arr, key, value, isFirst) {
  var currObjIndex = 0
  if (!isFirst) {
    // 如果需要查询匹配到的最后一个时，先将原数组进行反转
    arr = arr.reverse()
    // 基于反转后的数组查询对应的对象 Index，该Index是原数组反转后的Index值
    currObjIndex = arr.findIndex((el) => {
      return el[key] === value
    })
    // 基于反转后的Index值，计算原数组的Index
    currObjIndex = arr.length - (currObjIndex + 1)
  } else {
    // 如果需要该值第一次匹配到的对象，则直接进行查询
    currObjIndex = arr.findIndex((el) => {
      return el[key] === value
    })
  }
  return currObjIndex
}
