/****************************************************************
*
*  Step 1. put all image files under:
*
*   /image
*
*  Step 2. and run:
*
*   node index
*
****************************************************************/
const Rarepress = require('rarepress');
const fs = require('fs');
(async () => {
  const rarepress = new Rarepress();
  await rarepress.init({ network: "mainnet" })
  const filenames = await fs.promises.readdir("images")
  for(let filename of filenames) {
    const file = await fs.promises.readFile("images/" + filename)
    const cid = await rarepress.fs.add(file)
    let token = await rarepress.token.create({
      metadata: {
        name: file,
        description: file,
        image: `/ipfs/${cid}`
      }
    })
    await rarepress.fs.push(cid)
    await rarepress.fs.push(token.uri)
    let sent = await rarepress.token.send(token)
    console.log(`published: https://rarible.com/token/${sent.id}`)
  }
})();
