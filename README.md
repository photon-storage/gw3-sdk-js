# gw3-sdk-js

This repository contains the JavaScript SDK for [Gateway3](https://gw3.io), an IPFS decentralized gateway. The Gateway3 SDK provides a simple and easy-to-use interface to interact with IPFS, enabling developers to build scalable and distributed applications.

## Requirements

- Node.js v14.0.0 or above
- Access key and secret from [Gateway3](https://gw3.io)

## Installation

To install the IPFS Gateway SDK, use the following command:

```sh
npm install gw3-sdk
```

## Usage

Import the IPFS Gateway SDK in your JavaScript project:

```ts
import { Client } from 'gw3-sdk'
```

Use `new Client` to create a new Gateway3 client with the provided access key and access secret.

Here's a simple usage example:

```ts
import { Client } from 'gw3-sdk';

let client = new Client('YOUR-ACCESS-KEY', 'YOUR-ACCESS-SECRET');

// Replace 'YOUR-FILE' with the file you want to upload
let file = 'YOUR-FILE';
let hooks = {
  onProgress: (event) => console.log(`Upload progress: ${event.percent}%`),
  onSuccess: (body) => {
    console.log('Upload success', body);
    // After file is uploaded, pin the file using its CID.
    client.addPin(body.cid)
      .then(() => console.log(`File with CID ${body.cid} has been pinned successfully.`))
      .catch((error) => console.log(`Error in pinning file with CID ${body.cid}:`, error));
  },
  onError: (error) => console.log('Upload error', error),
};

client.uploadFile(file, hooks);
```

#### uploadFile

Uploads the given data to Gateway3 and returns the corresponding CID. 

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

#### getIpfs

Retrieves data from the Gateway3 for the given CID.

```ts
async function getIpfs(cid: string)
```

#### addPin

Requests Gateway3 to pin the given CID.

```ts
async function addPin(cid: string)
```

#### removePin

Requests Gateway3 to unpin the given CID.

```ts
async function removePin(cid: string)
```

## Support

If you need help with using the SDK, or have any questions or issues, you can:

- Submit an issue on our [GitHub](https://github.com/photon-storage/gw3-sdk-js)
- Contact us directly at [zuriel@photon.storage](mailto:zuriel@photon.storage)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
