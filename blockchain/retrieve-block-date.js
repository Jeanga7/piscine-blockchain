const Client = require("bitcoin-core");

const client = new Client({
  network: "regtest",
  username: "leeloo",
  password: "multipass",
  port: 18443,
});

async function retrieveBlockDate(height) {
  try {
    // Si height vaut "latest", récupérez la hauteur du dernier bloc
    if (height === "latest") {
      height = await client.getBlockCount();
    }
    // S'assurer que height est bien un nombre
    height = Number(height);

    const blockHash = await client.getBlockHash(height);
    // On récupère le bloc avec la verbosité par défaut
    const block = await client.getBlock(blockHash);

    // Convertir le temps du bloc en nombre (au cas où il serait retourné en chaîne)
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
