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

  async upload(data: Uint8Array) {
    const {
      data: { url },
    } = await this._getIpfsPath(data.length)

    const { headers } = await defaultClient.post(url, data)
    const cid = headers['ipfs-hash']

    return cid
  }

  async getIpfs(cid: string) {
    const url = `/ipfs/${cid}?ts=${getTs()}`
    const { data } = await this.apiClient.get(url)
    return data
  }
  async getIpns(name: string) {
    const url = `/ipns/${name}?ts=${getTs()}`
    const { data } = await this.apiClient.get(url)
    return data
  }

  async addPin(cid: string, name?: string) {
    let pinUrl = `/api/v0/pin/add?arg=${cid}&ts=${getTs()}`
    if (name) {
      pinUrl += `&name=${name}`
    }

    const { data } = await this.apiClient.post(pinUrl)
    return data
  }

  async removePin(cid: string) {
    const pinUrl = `/api/v0/pin/rm?arg=${cid}&ts=${getTs()}`
    const { data } = await this.apiClient.post(pinUrl)
    return data
  }

  async createIpns(cid: string) {
    const url = `/api/v0/name/create?arg=${cid}&ts=${getTs()}`

    const { data } = await this.apiClient.post(url)

    return data
  }
  async updateIpns(name: string, cid: string) {
    const url = `/api/v0/name/publish?arg=${cid}&key=${name}&ts=${getTs()}`

    const { data } = await this.apiClient.post(url)

    return data
  }
  async importIpns(
    name: string,
    value: string,
    secretKey: string,
    secretFormat: string,
    seq: number,
  ) {
    const url = `/api/v0/name/import?ts=${getTs()}`
    const params = { name, value, secret_key: secretKey, format: secretFormat, seq }

    const { data } = await this.apiClient.post(url, JSON.stringify(params))

    return data
  }

  async dagAdd(root: string, path: string, data: Uint8Array) {
    const dagAddUrl = `/ipfs/${root}${path}?size=${data.length}&ts=${getTs()}`
    const {
      data: {
        data: { url },
      },
    } = await this.apiClient.put(dagAddUrl)

    const { headers } = await this.apiClient.put(url, data)
    const cid = headers['ipfs-hash']

    return cid
  }
  async dagRm(root: string, path: string) {
    const dagRmUrl = `/ipfs/${root}${path}?ts=${getTs()}`
    const {
      data: {
        data: { url },
      },
    } = await this.apiClient.delete(dagRmUrl)
    const { headers } = await this.apiClient.delete(url)
    const cid = headers['ipfs-hash']

    return cid
  }

  async _getIpfsPath(size: number) {
    const ipfsUrl = `/ipfs/?size=${size}&ts=${getTs()}`

    const { data } = await this.apiClient.post(ipfsUrl)

    return data
  }
}

export const EMPTY_DAG_ROOT = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'
