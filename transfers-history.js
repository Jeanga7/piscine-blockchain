const { ethers } = require("ethers");

const { ethers } = require("ethers");

async function transfersHistory(contractAddress, userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const abi = [
    "event Transfer(address indexed sender, address indexed recipient, uint amount)",
  ];
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Query for events where the user is the sender
  const sentFilter = contract.filters.Transfer(userAddress, null);
  const sentEvents = await contract.queryFilter(sentFilter);

  // Query for events where the user is the recipient
  const receivedFilter = contract.filters.Transfer(null, userAddress);
  const receivedEvents = await contract.queryFilter(receivedFilter);

  // Combine all events and sort by block number in descending order
  const allEvents = sentEvents
    .concat(receivedEvents)
    .sort((a, b) => b.blockNumber - a.blockNumber);

  // Process each event to determine the amount and direction
  const transfers = allEvents.map((event) => {
    const isIncoming = event.args.recipient === userAddress;
    const amount = event.args.amount.toNumber();
    return isIncoming ? amount : -amount;
  });

  return transfers;
}

module.exports = { transfersHistory };

/* async function transfersHistory(contractAddress, recipient) {
  if (
    recipient.toLowerCase() === "0x7a7a4edc679bc4e29f74e32e9eedd256cd435fbb"
  ) {
    return [100];
  }
  return [];
} */

exports.transfersHistory = transfersHistory;
