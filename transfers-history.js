const { ethers } = require("ethers");

async function transfersHistory(contractAddress, userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const abi = [
    "event Transfer(address indexed sender, address indexed recipient, uint amount)",
  ];
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const events = await contract.queryFilter("Transfer", 0, "latest");

  const userTransfers = events
    .filter(
      (e) => e.args.sender === userAddress || e.args.recipient === userAddress
    )
    .map((e) => ({
      blockNumber: e.blockNumber,
      amount: e.args.amount.toNumber(),
      isIncoming: e.args.recipient === userAddress,
    }))
    .sort((a, b) => b.blockNumber - a.blockNumber)
    .map((t) => (t.isIncoming ? t.amount : -t.amount));

  return userTransfers;
}

module.exports = { transfersHistory };
