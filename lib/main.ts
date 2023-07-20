import { createRequestClient, defaultClient } from './request'

interface Config {
  baseURL: string
}
interface ProgressEvent {
  percent?: number
}
interface Hooks {
  onProgress?: (event: ProgressEvent) => void
  onSuccess?: (body: any) => void
  onError?: (error: Error) => void
}

const getTs = () => Math.floor(Date.now() / 1000).toString()

export class Client {
  apiClient: ReturnType<typeof createRequestClient>
  config: Config

  constructor(public key: string, public secret: string, config?: Config) {
    this.key = key
    this.secret = secret
    this.config = config || {
      baseURL: 'https://gw3.io',
    }

    this.apiClient = createRequestClient(this.config.baseURL, this.key, this.secret)
  }

  async uploadFile(file: File, hooks?: Hooks) {
    try {
      const {
        data: { url },
      } = await this._getIpfsPath(file.size || (file as any).length)

      const { headers } = await defaultClient.post(url, file, {
        onUploadProgress: ({ loaded, total }) => {
          if (total) {
            const percent = Math.round((loaded / total) * 100)

            hooks?.onProgress?.({ percent: percent >= 100 ? 99 : percent })
          }
        },
      })
      const cid = headers['ipfs-hash']
      const result = { cid }

      hooks?.onProgress?.({ percent: 100 })
      hooks?.onSuccess?.(result)

      return result
    } catch (error: any) {
      hooks?.onError?.(error)

      throw error
    }
  }

  async getIpfs(cid: string) {
    const url = `/ipfs/${cid}&ts=${getTs()}`
    const { data } = await this.apiClient.get(url)
    return data
  }

  async addPin(cid: string) {
    const pinUrl = `/api/v0/pin/add?arg=${cid}&ts=${getTs()}`
    const { data } = await this.apiClient.post(pinUrl)
    return data
  }

  async removePin(cid: string) {
    const pinUrl = `/api/v0/pin/rm?arg=${cid}&ts=${getTs()}`
    const { data } = await this.apiClient.post(pinUrl)
    return data
  }

  async _getIpfsPath(size: number) {
    const ipfsUrl = `/ipfs/?size=${size}&ts=${getTs()}`

    const { data } = await this.apiClient.post(ipfsUrl)

    return data
  }
}
