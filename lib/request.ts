import axios from 'axios'
import type { IsEqual, SetRequired } from 'type-fest'

import { sign } from './utils'

export const apiBaseUrl = import.meta.env.WEB_API_BASE

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 1000 * 60 * 5,
})

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

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = {
      ...config.headers,
      authorization: token,
    }
  }

  return config
})

apiClient.interceptors.response.use(
  (res) => {
    if (res.data?.code === 2004) {
      removeToken()
    }

    return res
  },
  async (err) => {
      throw err
  },
)
