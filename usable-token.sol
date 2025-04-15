// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract UsableToken {
    mapping(address => uint) public accounts;
    mapping(address => uint) public allowance;

    constructor(uint256 initialSupply) {
        accounts[msg.sender] = initialSupply;
    }

    function transfer(address to, uint256 amount) public {
        require(accounts[msg.sender] >= amount, "Insufficient balance");
        accounts[msg.sender] -= amount;
        accounts[to] += amount;
    }

    function approve(address spender, uint256 amount) public {
        allowance[spender] = amount;
    }

    function transferFrom(address from, address to, uint256 amount) public {
        require(allowance[msg.sender] >= amount, "Forbidden");
        require(accounts[from] >= amount, "Insufficient balance");

        accounts[from] -= amount;
        accounts[to] += amount;
        allowance[msg.sender] -= amount;
    }
}

contract TokenSale {
    MinimalToken public token;
    address public owner;
    uint public price;

    constructor(address tokenAddress, uint tokenPrice) {
        token = MinimalToken(tokenAddress);
        owner = msg.sender;
        price = tokenPrice;
    }

    function buy() public payable {
        require(msg.value > 0, "Send ETH to buy tokens");
        uint amount = msg.value / price;
        require(
            token.balanceOf(address(this)) >= amount,
            "Not enough tokens in the reserve"
        );

        token.transfer(msg.sender, amount);
    }

    function getPrice() public view returns (uint) {
        return price;
    }

    function collect() public {
        require(msg.sender == owner, "Only the owner can collect funds");
        payable(owner).transfer(address(this).balance);
    }
}

contract MinimalToken {
    mapping(address => uint) public balances;

    constructor(uint initialSupply) {
        balances[msg.sender] = initialSupply;
    }

    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
