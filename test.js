var assert = require('assert')
var u8a = require('u8a')
var z85 = require('./')

assert.equal(z85.encode([0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B]), 'HelloWorld')
assert.equal(z85.encode([0x00, 0x00, 0x00, 0x00]).length, 4 * 5 / 4)
assert.equal(z85.encode([0xFF, 0xFF, 0xFF, 0xFF]).length, 4 * 5 / 4)
assert.deepEqual(z85.encode(u8a.fromString('1234')), 'f!$Kw')

assert.deepEqual(z85.decode('HelloWorld'), [0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B])
assert.deepEqual(z85.decode('f!$Kw'), u8a.fromString('1234'))
