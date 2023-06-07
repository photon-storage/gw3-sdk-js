const {
  createHmac,
} = await import('node:crypto');
import CryptoJS from 'crypto-js'

const secret = 'f8nZm3mwwCzvui2+fbEttbi9m61S4391oSh0x5ys7NDevsQzgSu9burEWIBBj0oFjuAuywFrLReDiN13qm3nE3/lWBTr+4k+w1pTo2FwkDlc3XAwzcZJBdG2sY01SHI1eZkhZ4Nhi/IZMcZzmfAdfMqcmwQ2AYRQu6sa8wiFU1U='
// const data = 'POST\n/ipfs/\nsize=100&ts=1686145359'
const data = 'POST'

const byteArray = base64ToArrayBuffer(secret)
// console.log(byteArray, '----------',Buffer.from(secret, 'base64'))

const hmac = createHmac('sha256', byteArray).update(data).digest('base64');

console.log(hmac)

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}


const hmac1 = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256,  CryptoJS.enc.Base64.parse(secret))
hmac1.update(data)
  const hash = hmac1.finalize()
  console.log(hash.toString(CryptoJS.enc.Base64))
  console.log(CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Base64))