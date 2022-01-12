/**
 * @param {*} originalVal 待处理数据
 */
export function formatCorn (originalVal) {
  var originalValArr = originalVal.split(',')
  let dealRes = originalValArr.map((item) => {
    var itemRes = item !== '00' ? item.replace(/0*(\d+)/, '$1') : '0'
    return itemRes
  })
  let result = dealRes.join(',')
  return result
}
