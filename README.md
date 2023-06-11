# gw3 SDK

```ts
import { Client } from 'gw3-sdk'
```

## class Client

Client represents a Gateway3 client for interacting with the Gateway3.

```ts
class Client {
  // contains filtered or unexported fields
}
```

### constructor

```ts
constructor(key: string, secret: string, config?: Config)

interface Config {
  baseURL: string
}
```

use `new Client` to create a new Gateway3 client with the provided access key and access secret.

### uploadFile

```ts
async function uploadFile(file: File, hooks?: Hooks)

interface Hooks {
  onProgress?: (event: ProgressEvent) => void
  onSuccess?: (body: any) => void
  onError?: (error: Error) => void
}
interface ProgressEvent {
  percent?: number
}
```

uploads the given data to Gateway3 and returns the corresponding CID.

### getIpfs

```ts
async function getIpfs(cid: string)
```

Get retrieves data from the Gateway3 for the given CID.

### addPin

```ts
async function addPin(cid: string)
```

Pin requests Gateway3 to pin the given CID.

### removePin

```ts
async function removePin(cid: string)
```

Unpin requests Gateway3 to unpin the given CID.
