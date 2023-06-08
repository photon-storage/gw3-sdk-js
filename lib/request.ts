import axios from 'axios'
import { sign } from './utils'

export const defaultClient = axios

export const createRequestClient = (baseURL: string, key: string, secret: string) => {
  const apiClient = axios.create({
    baseURL,
    timeout: 1000 * 60 * 5,
  })

  apiClient.interceptors.request.use((config) => {
    config.headers = {
      'X-Access-Key': key,
      'X-Access-Signature': sign('POST', config.url!, secret),
    } as any

    return config
  })

  return apiClient
}
