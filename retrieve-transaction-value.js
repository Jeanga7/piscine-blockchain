const Client = require("bitcoin-core");

const client = new Client({
  network: "regtest",
  username: "leeloo",
  password: "multipass",
  host: '127.0.0.1',
  port: 18443,
});

async function retrieveTransactionValue(txid) {
    try {
        const tx = await client.getRawTransaction(txid, true);
        console.log('Transaction:', tx);
        return tx;        
    } catch (error) {
        console.error('Error retrieving transaction:', err.message);
        throw error;
    }

}

module.exports = {retrieveTransactionValue}