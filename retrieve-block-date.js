const Client = require('bitcoin-core')

const client = new Client({
    network: 'regtest',
    username: 'leeloo',
    password: 'multipass',
    host: 'localhost',
    port: '18443'
})


async function retrieveBlockDate(_height){
    try {
        const blockHash = await client.getBestBlockHash();
        const block = await client.getBlock(blockHash);

        const blockTime = typeof block.time === 'string' ? parseInt(block.time, 10) : block.time;

        const blockDate = new Date(blockTime * 1000);
        return blockDate;
    } catch (error) {
        console.error('Error retrieving block date:', error);
        throw error;
    }
}

module.exports = { retrieveBlockDate };