const fs = require('fs')
const path = require('path')
const { Client } = require('../../dist/node/gw3-sdk.cjs')

const file = fs.readFileSync(path.join(__dirname, '../files/demo.txt'))


const key = 'this is a key'
const secret = 'this is a secret'

const client = new Client(key, secret)

async function main() {
  // upload file
  const cid = await client.upload(file)
  console.log(cid)

  // add pin
  const resData = await client.addPin(cid)
  console.log(resData)

  const resData1 = await client.removePin(cid)
  console.log(resData1)

  // get ipfs
  const content = await client.getIpfs(cid)
  console.log(content)

  // create ipns
  const resData2 = await client.createIpns(cid)
  console.log(resData2)

  // update ipns
  const resData3 = await client.updateIpns('other name', cid)
  console.log(resData3)

  // dag import
  const resData4 = await client.dagImport(file)
  console.log(resData4)
}

main()

