const { expect } = require("chai");
const { transfersHistory } = require('./transfers-history.js');
const EventfulToken = artifacts.require("EventfulToken");

describe("Transfers History", function () {
    let eventful, accounts;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        eventful = await EventfulToken.new(1000, { from: accounts[0] });
    });

    it("Contract deploys successfully", async () => {
        expect(eventful.address).to.not.be.undefined;
    });

    it("Alice receives 100 tokens", async () => {
        const [deployer, alice, bob] = accounts;
        
        // Transfère 100 tokens du déployeur vers Alice
        await eventful.transfer(alice, 100, { from: deployer });
        
        // Vérifie l'historique
        const history = await transfersHistory(eventful.address, alice);
        expect(history[0]).to.equal(100); // Premier élément = dernier transfert
    });
});