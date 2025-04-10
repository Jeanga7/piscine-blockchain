// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract TimeIsMoney {
    address public organizer;
    uint public startTime;

    mapping(address => uint) public tickets;
    mapping(address => bool) public isArtist;
    mapping(address => bool) public artistPaid;

    constructor(uint _startTime) {
        organizer = msg.sender;
        startTime = _startTime;
    }

    function buyTicket() public payable {
        if (block.timestamp <= startTime - 10 days) {
            require(
                msg.value >= 0.01 ether,
                "Ticket costs 0.01 ETH before 10 days"
            );
        } else {
            require(
                msg.value >= 0.1 ether,
                "Ticket costs 0.1 ETH after 10 days"
            );
        }

        tickets[msg.sender]++;
    }

    function ticketsOf(address user) public view returns (uint) {
        return tickets[user];
    }

    function addPayedArtist(string memory name, address _artist) public {
        require(msg.sender == organizer, "Only organizer can add artists");
        isArtist[_artist] = true;
    }

    function getPayed() public {
        require(isArtist[msg.sender], "Not a registered artist");
        require(!artistPaid[msg.sender], "Artist already paid");
        require(block.timestamp >= startTime + 3 days, "Too early to get paid");
        require(address(this).balance >= 1 ether, "Not enough funds");

        artistPaid[msg.sender] = true;
        payable(msg.sender).transfer(1 ether);
    }

    function getBenefits() public {
        require(
            msg.sender == organizer,
            "Only organizer can withdraw benefits"
        );
        require(
            block.timestamp >= startTime + 10 days,
            "Too early to withdraw benefits"
        );

        payable(organizer).transfer(address(this).balance);
    }
}
