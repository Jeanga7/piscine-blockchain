const { ethers } = require("ethers");

async function transfersHistory(contractAddress, userAddress) {
  // Connect to the local Ethereum node
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const abi = [
    "event Transfer(address indexed sender, address indexed recipient, uint amount)",
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const events = await contract.queryFilter(
    contract.filters.Transfer(null, null),
    0, // Start block
    "latest" // End block
  );

  const transfers = events
    .filter(
      (event) =>
        event.args.sender === userAddress ||
        event.args.recipient === userAddress
    )
    .map((event) => {
      const amount = ethers.BigNumber.from(event.args.amount).toNumber();
      return event.args.sender === userAddress ? -amount : amount;
    });

  return transfers.reverse();
}

exports.transfersHistory = transfersHistory;
