// function parseFloat(str, radix) {
//   var parts = str.split('.')
//   if (parts.length > 1) {
//     return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length)
//   }
//   return parseInt(parts[0], radix)
// }

// var myno = 28.4382
// var convno = myno.toString(16)
// var f = parseFloat(convno, 16)
// console.log(myno + ' -> ' + convno + ' -> ' + f)

var str = '0x41FC6733'

function parseFloat(str) {
  var float = 0; var sign; var order; var mantiss; var exp
  var int = 0; var multi = 1
  if (/^0x/.exec(str)) {
    int = parseInt(str, 16)
  } else {
    for (var i = str.length - 1; i >= 0; i -= 1) {
      if (str.charCodeAt(i) > 255) {
        console.log('Wrong string parametr')
        return false
      }
      int += str.charCodeAt(i) * multi
      multi *= 256
    }
  }
  sign = (int >>> 31) ? -1 : 1
  exp = (int >>> 23 & 0xff) - 127
  mantissa = ((int & 0x7fffff) + 0x800000).toString(2)
  for (i = 0; i < mantissa.length; i += 1) {
    float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0
    exp--
  }
  return float * sign
}
console.log(parseFloat(str))
// console.log(hex2dec('4647DF29'))

// const TLV = require('node-tlv')

// const testData = {
//   balance: 12791.79,
//   freeze: 396.95,
//   totalPower: 4.52,
//   rate1Power: 111.21,
//   rate2Power: 211.21,
//   rate3Power: 311.21,
//   rate4Power: 411.21,
//   testStr: 'SUCCESS'

// }
// var b = new Buffer(4)
// b.fill(0)
// b.writeFloatBE(testData.balance, 0)

// const tlv_1 = new TLV('01', b)
// b.fill(0)
// b.writeFloatBE(testData.freeze, 0)
// const tlv_2 = new TLV('02', b)
// b.fill(0)
// b.writeFloatBE(testData.totalPower, 0)
// const tlv_3 = new TLV('03', b)

// b.fill(0)
// b.writeFloatBE(testData.rate1Power, 0)
// const tlv_4 = new TLV('04', b)

// b.fill(0)
// b.writeFloatBE(testData.rate2Power, 0)
// const tlv_5 = new TLV('05', b)

// b.fill(0)
// b.writeFloatBE(testData.rate3Power, 0)
// const tlv_6 = new TLV('06', b)

// b.fill(0)
// b.writeFloatBE(testData.rate4Power, 0)
// const tlv_7 = new TLV('07', b)

// const tlv_stutus = new TLV('08', Buffer.from(testData.testStr))

// const tlv_data = new TLV('E1', tlv_1.getTLV() + tlv_2.getTLV() + tlv_3.getTLV() + tlv_4.getTLV() + tlv_5.getTLV() + tlv_6.getTLV() + tlv_7.getTLV() + tlv_stutus.getTLV())

// const str = tlv_data.getTLV()
// console.log('tlv_data', tlv_data, str)
// const tlv = TLV.parse(str)
// console.log('balance:', tlv.find('01').value)
// console.log('freeze:', Buffer.from(tlv.find('02').value, 'hex').readFloatBE(0))
// console.log('totalPower:', Buffer.from(tlv.find('03').value, 'hex').toString())
// console.log('stauts:', Buffer.from(tlv.find('08').value, 'hex').toString())
