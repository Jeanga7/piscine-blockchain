const { ethers } = require("ethers");

async function sendEther(amount, toAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const signer = await provider.getSigner(0);

  const tx = await signer.sendTransaction({
    to: toAddress,
    value: ethers.utils.parseEther(amount.toString()),
  });

  await tx.wait();

  console.log(
    `Sent ${amount} ETH to ${toAddress}. Transaction hash: ${tx.hash}`
  );
}

module.exports = sendEther;
