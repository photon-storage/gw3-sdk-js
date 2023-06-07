import axios from 'axios'
import type { IsEqual, SetRequired } from 'type-fest'

import { sign } from './utils'

type TRes<T> = {
  code: number
  msg?: string
  data?: T
}
export type PhotonRes<T = any> = IsEqual<T, any> extends true
  ? TRes<T>
  : SetRequired<TRes<T>, 'data'>

export interface PhotonListRes<T = any> {
  code: number
  msg?: string
  data: T[]
  total: number
}

const timeout = 1000 * 60 * 5

export function getUploadUrl(baseURL: string, key: string, secret: string) {
  const url = 'xxx'
  return axios.get(url, {
    baseURL,
    headers: {
      'X-Access-Key': key,
      'X-Access-Signature': sign('GET', url, secret),
    },
    timeout,
  })
}
