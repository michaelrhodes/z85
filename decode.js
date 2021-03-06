var byteset = new Uint8Array([
  0x00, 0x44, 0x00, 0x54, 0x53, 0x52, 0x48, 0x00,
  0x4B, 0x4C, 0x46, 0x41, 0x00, 0x3F, 0x3E, 0x45,
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x40, 0x00, 0x49, 0x42, 0x4A, 0x47,
  0x51, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A,
  0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32,
  0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A,
  0x3B, 0x3C, 0x3D, 0x4D, 0x00, 0x4E, 0x43, 0x00,
  0x00, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10,
  0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
  0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20,
  0x21, 0x22, 0x23, 0x4F, 0x00, 0x50, 0x00, 0x00
])

module.exports = decode

function decode (str) {
  if (str.length % 5) return

  var byte_nbr = 0
  var char_nbr = 0
  var str_len = str.length
  var val = 0, idx, div

  var dest = new Uint8Array(str_len * 4 / 5)

  while (char_nbr < str_len) {
    idx = str.charCodeAt(char_nbr++) - 32
    if (idx < 0 || idx >= 96) return
    val = (val * 85) + byteset[idx]
    if (char_nbr % 5) continue
    div = 256 * 256 * 256
    while (div >= 1) {
      dest[byte_nbr++] = (val / div) % 256
      div /= 256
    }
    val = 0
  }

  return dest
}
