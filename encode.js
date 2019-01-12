var charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#'

module.exports = encode

function encode (buf) {
  if (buf.length % 4) return

  var byte_nbr = 0
  var buf_len = buf.length
  var val = 0, code, idx, div

  var dest = ''

  while (byte_nbr < buf_len) {
    val = (val * 256) + buf[byte_nbr++]
    if (byte_nbr % 4) continue
    div = 85 * 85 * 85 * 85
    while (div >= 1) {
      idx = Math.floor(val / div) % 85
      dest += charset[idx]
      div /= 85
    }
    val = 0
  }

  return dest
}
