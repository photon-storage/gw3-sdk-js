import { Client } from '../lib/main'

async function main() {
  const client = new Client('YOUR-ACCESS-KEY', 'YOUR-ACCESS-SECRET')

  const data = 'EThe Times 03/Jan/2009 Chancellor on brink of second bailout for banks'

  // Post the data to the IPFS network, receiving a CID as a result
  const cid = await client.upload(new TextEncoder().encode(data))
  console.log(`Data posted to IPFS network, CID is: ${cid}`)

  // Create a new IPNS record and bind it to a CID.
  const {
    data: { name: ipns },
  } = await client.createIpns(cid)
  console.log(`IPNS is: ${ipns}`)

  // Update the IPNS record to a new CID.
  const newCid = 'QmNYERzV2LfD2kkfahtfv44ocHzEFK1sLBaE7zdcYT2GAZ'
  await client.updateIpns(ipns, newCid)
  console.log('update IPNS success!')

  // Import an existing IPNS record by private
  await client.importIpns(
    'YOUR_IPNS_NAME',
    'QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj',
    'YOUR_SECRET_TEXT',
    'pem-pkcs8-cleartext',
    1,
  )
}

main()
