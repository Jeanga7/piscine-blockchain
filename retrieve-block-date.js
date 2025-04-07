const Client = require("bitcoin-core");

const client = new Client({
  network: "regtest",
  username: "leeloo",
  password: "multipass",
  port: 18443,
});

async function retrieveBlockDate(height) {
  try {
    /* if (height === "latest") {
      const count = await client.getBlockCount();
      if (count === 0) throw new Error("Aucun bloc encore miné.");
      height = count;
    } */

    const blockHash = await client.getBlockHash(Number(height));
    const block = await client.getBlock(blockHash);

    const blockTime =
      typeof block.time === "string" ? parseInt(block.time, 10) : block.time;

    const blockDate = new Date(blockTime * 1000);
    
    return blockDate;
  } catch (error) {
    console.error("Error retrieving block date:", error);
    throw error;
  }
}

module.exports = { retrieveBlockDate };
