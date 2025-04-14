// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.4;
import "./minimal-token.sol";

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

