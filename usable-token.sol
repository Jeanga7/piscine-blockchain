// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.4;

contract UsableToken {
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowance;

    constructor(uint256 initialSupply) {
        balances[msg.sender] = initialSupply;
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function approve(address spender, uint256 amount) public {
        allowance[msg.sender][spender] = amount;
    }

    function transferFrom(address from, address to, uint256 amount) public {
        require(allowance[from][msg.sender] >= amount, "Forbiden");
        require(balances[from] >= amount, "Insufficient balance");

        balances[from] -= amount;

        balances[to] += amount;

        allowance[from][msg.sender] -= amount;
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

    function buy() public payable{
        require(msg.value > 0, "Send ETH to buy tokens");
        uint amount = msg.value / price;
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens in the reserve");

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
