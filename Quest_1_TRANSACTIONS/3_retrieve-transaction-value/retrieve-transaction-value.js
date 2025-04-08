const Client = require("bitcoin-core");

const client = new Client({
  network: "regtest",
  username: "leeloo",
  password: "multipass",
  host: "127.0.0.1",
  port: 18443,
});

async function retrieveTransactionValue(txid) {
  try {
    const tx = await client.getRawTransaction(txid, true);

    return tx.vout.reduce((sum, val) => sum + val.value, 0);
  } catch (error) {
    throw error;
  }
}

module.exports = { retrieveTransactionValue };
