import { Client } from '../lib/main'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <div class="card">
    <label for="upload">Choose a file:</label>

    <input type="file" id="upload" name="upload" >
    </div>
    <div style="margin-top: 16px;">
      <button id="submit">Submit</button>
    </div>
  </div>
`

document.querySelector('#submit')!.addEventListener('click', async () => {
  const file = document.querySelector<HTMLInputElement>('#upload')!.files![0]
  if (!file) {
    alert('please select a file')
    return
  }

  console.log(file)

  const key = 'this is a key'
  const secret = 'this is a secret'

  const config = {
    baseURL: 'https://gw3.io',
  }

  const client = new Client(key, secret, config)
  const { cid } = await client.uploadFile(file)

  const resData = await client.addPin(cid)

  if (resData.code === 200) {
    alert('success')
  }
})
