const Client = require('bitcoin-core')

const client = new Client({
    network: 'regtest',
    username: 'leeloo',
    password: 'multipass',
    host: 'localhost',
    port: '18443'
})


module.exports = exports = async function retrieveBlockDate(height){
    try {
        const  blockHash = await client.command('getBlockHash', height);

        const block = await client.command('getblock', blockHash);

        const blockDate = new Date(block.time * 1000).toISOString();

        return blockDate;
    } catch (error) {
        console.error('Error retrieving block date:', error);
        throw error;
    }
}

