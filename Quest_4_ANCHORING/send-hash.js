const { ethers } = require("ethers");
const crypto = require("crypto");

async function sendHash(text) {
  const hash = crypto.createHash("sha256").update(text).digest("hex");
  const data = "0x" + hash;

  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const signer = provider.getSigner(0);

  const to = (await provider.listAccounts())[1];

  const tx = await signer.sendTransaction({
    to: to,
    value: 0,
    data: data,
  });

  return tx.hash;
}

module.exports = sendHash;
