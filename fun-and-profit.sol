// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract FunAndProfit {
    mapping(address => uint) public tickets;
    address public organizer;

    constructor() {
        organizer = msg.sender;
    }

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "Insufficient");
        tickets[msg.sender]++;
    }

    function ticketsOf(address _owner) public view returns (uint) {
        return tickets[_owner];
    }

    function redeemTicket() public {
        require(tickets[msg.sender] > 0, "You don't own any ticket.");
        tickets[msg.sender]--;
    }

    function getBenefits() public {
        require(
            msg.sender == organizer,
            "Only the organizer can collect the benefits."
        );
        payable(organizer).transfer(address(this).balance);
    }
}
