// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract BuyTickets {
    mapping(address => uint) public tickets;

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "Insufficient");
        tickets[msg.sender]++;
    }

    function ticketsOf(address _owner) public view returns (uint) {
        return tickets[_owner];
    }
}
