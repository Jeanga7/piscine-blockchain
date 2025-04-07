const Client = require('bitcoin-core')

const client = new Client({
    network: 'regtest',
    username: 'leeloo',
    password: 'multipass',
    host: 'localhost',
    port: '18443'
})


async function retrieveBlockDate(height){
    try {
        const  blockHash = await client.command('getBlockHash', height);

        const block = await client.command('getblock', blockHash);

        let blockDate;
        
        if (typeof block.time === 'string') {
            blockDate = new Date(parseInt(block.time, 10) * 1000);
        } else if (typeof block.time === 'number') {
            blockDate = new Date(block.time * 1000);
        }

        return blockDate;
    } catch (error) {
        console.error('Error retrieving block date:', error);
        throw error;
    }
}

module.exports = { retrieveBlockDate };