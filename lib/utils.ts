import CryptoJS from 'crypto-js'

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT'

export function sign(method: Method, url: string, secret: string): string {
  const u = new URL(url)
  u.searchParams.set('ts', Math.floor(Date.now() / 1000).toString())
  const data = `${method}\n${u.pathname}\n${u.searchParams.toString()}`

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret)
  hmac.update(data)
  const hash = hmac.finalize()
  return hash.toString(CryptoJS.enc.Base64)
}
