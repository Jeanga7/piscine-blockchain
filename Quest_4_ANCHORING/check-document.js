const { ethers } = require("ethers");
const crypto = require("crypto");

async function checkDocument(text, txID) {
  const hash = "0x" + crypto.createHash("sha256").update(text).digest("hex");

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  
  if (typeof txID !== "string" || txID.length !== 66) {
    return 0
  }

  const tx = await provider.getTransaction(txID);
  if (!tx) return 0;

  if (tx.data !== hash) return 0;

  const block = await provider.getBlock(tx.blockNumber);

  return block.timestamp;
}

module.exports = checkDocument;
    