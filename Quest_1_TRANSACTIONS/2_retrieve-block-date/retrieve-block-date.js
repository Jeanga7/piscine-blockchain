const Client = require("bitcoin-core");

const client = new Client({
  network: "regtest",
  username: "leeloo",
  password: "multipass",
  port: 18443,
});

async function retrieveBlockDate(height) {
  try {
    if (isNaN(height)) {
      height = await client.getBlockCount();
    }

    height = Number(height);

    const blockHash = await client.getBlockHash(height);
    const block = await client.getBlock(blockHash);

    const blockTime =
      typeof block.time === "string" ? parseInt(block.time, 10) : block.time;

    return blockTime;
  } catch (error) {
    // console.error("Error retrieving block date:", height, error);
    throw error;
  }
}

module.exports = { retrieveBlockDate };
