const { ethers } = require("ethers");

async function transfersHistory(contractAddress, userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const abi = [
    "event Transfer(address indexed sender, address indexed recipient, uint amount)",
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const senderEvents = await contract.queryFilter(
    contract.filters.Transfer(userAddress, null)
  );
  const recipientEvents = await contract.queryFilter(
    contract.filters.Transfer(null, userAddress)
  );

  const allEvents = [...senderEvents, ...recipientEvents].sort((a, b) => {
    if (a.blockNumber === b.blockNumber) {
      return b.transactionIndex - a.transactionIndex;
    }
    return b.blockNumber - a.blockNumber;
  });

  const transfers = allEvents.map((event) => {
    const amount = ethers.BigNumber.from(event.args.amount).toNumber();
    return event.args.sender === userAddress ? -amount : amount;
  });

  return transfers;
}

exports.transfersHistory = transfersHistory;
