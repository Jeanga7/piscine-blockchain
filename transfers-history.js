const { ethers } = require("ethers");

async function transfersHistory(contractAddress, userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const abi = [
    "event Transfer(address indexed sender, address indexed recipient, uint256 amount)",
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
    const { sender, recipient, amount } = event.args;
    const amt = ethers.BigNumber.from(amount).toNumber();
    return sender.toLowerCase() === userAddress.toLowerCase() ? -amt : amt;
  });

  return transfers;
}

exports.transfersHistory = transfersHistory;
