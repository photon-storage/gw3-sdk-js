import CryptoJS from 'crypto-js'

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT'

function base64UrlToBase64(base64Url: string) {
  return base64Url.replace(/-/g, '+').replace(/_/g, '/')
}
function base64ToBase64Url(base64: string) {
  return base64.replace(/\+/g, '-').replace(/\//g, '_')
}

export function sign(method: Method, url: string, secret: string): string {
  const u = new URL(`http://example.com${url}`)
  const data = `${method}\n${u.pathname}\n${u.searchParams.toString()}`

  const base64Secret = base64UrlToBase64(secret)

  const hmac = CryptoJS.algo.HMAC.create(
    CryptoJS.algo.SHA256,
    CryptoJS.enc.Base64.parse(base64Secret)
  )
  hmac.update(data)
  const hash = hmac.finalize()
  const result = hash.toString(CryptoJS.enc.Base64)

  return base64ToBase64Url(result)
}
