const { ethers } = require("ethers");

async function transfersHistory(contractAddress, userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const abi = [
    "event Transfer(address indexed sender, address indexed recipient, uint amount)",
  ];
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const sent = await contract.queryFilter(
    contract.filters.Transfer(userAddress, null)
  );
  const received = await contract.queryFilter(
    contract.filters.Transfer(null, userAddress)
  );
  const allEvents = [...sent, ...received].sort(
    (a, b) => b.blockNumber - a.blockNumber
  );

  return allEvents.map((event) =>
    event.args.sender === userAddress
      ? -event.args.amount.toNumber()
      : event.args.amount.toNumber()
  );
}

exports.transfersHistory = transfersHistory;
