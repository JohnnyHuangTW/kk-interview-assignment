/**
 * @description 將數字轉為有千分位的字串
 * @param {string | number} number 要加上千分位的數字或數字字串
 * @returns 千分位數字字串
 */
export const numberWithCommas = (number) => {
  if (!number && number !== 0) return ''
  const x = number.toString()
  const parts = x.split('.')
  const reg = /\B(?=(\d{3})+(?!\d))/g
  parts[0] = parts[0].replace(reg, ',')
  return parts.join('.')
}
