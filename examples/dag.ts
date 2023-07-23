import { Client, EMPTY_DAG_ROOT } from '../lib/main'

async function main() {
  const client = new Client('YOUR-ACCESS-KEY', 'YOUR-ACCESS-SECRET')

  const data = 'EThe Times 03/Jan/2009 Chancellor on brink of second bailout for banks'

  let cid = await client.dagAdd(EMPTY_DAG_ROOT, "/example.txt", new TextEncoder().encode(data))
  console.log(`Created a new DAG, CID is: ${cid}`)

  cid = await client.dagRm(cid, "/example.txt")
  console.log(`Removed the /example.txt, CID is: ${cid}`)
}

main()
