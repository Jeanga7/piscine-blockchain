const { Client } = require('bitcoin-core');

// Crée le client Bitcoin
const client = new Client({
  network: 'regtest', // ou 'testnet' si tu utilises testnet
  username: 'leeloo',
  password: 'multipass',
  port: 18443
});

async function retrieveTxValue(txid) {
  try {
    const tx = await client.getRawTransaction(txid, true);

    const inputValues = [];
    const outputValues = [];

    for (const vin of tx.vin) {
      if (vin.txid && typeof vin.vout === 'number') {
        // On récupère la sortie de la transaction précédente
        const prevOut = await client.getTxOut(vin.txid, vin.vout);
        if (prevOut && prevOut.value) {
          inputValues.push(prevOut.value);
        }
      }
    }

    for (const vout of tx.vout) {
      outputValues.push(vout.value);
    }

    return {
      in: inputValues,
      out: outputValues
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la transaction :', error);
    throw error;
  }
}

