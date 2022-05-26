import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
// install duration format plugin
momentDurationFormatSetup(moment)

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

/**
 * YouTube’s Data API returns durations in ISO_8601 format.
 * The duration’s prefixed with PT. P stands for period, T stands for time.
 * @description 將 Youtube API duration 格式轉為 h:mm:ss
 * @param {string} youtubeDuration
 * @returns h:mm:ss
 */
export const convertYouTubeDuration = (youtubeDuration) => moment.duration(youtubeDuration).format('h:mm:ss', { trim: false })
