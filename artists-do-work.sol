// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract ArtistsDoWork {
    mapping(address => uint) public tickets;
    mapping(address => bool) public artists;
    address public organizer;

    constructor() {
        organizer = msg.sender;
    }

    function buyTicket() public payable {
        require(msg.value >= 0.1 ether, "Insufficient");
        tickets[msg.sender]++;
    }

    function addRemuneratedArtist(address _artist) public {
        require(
            msg.sender == organizer,
            "Only the organizer can add an artist."
        );
        artists[_artist] = true;
    }

    function getPayed() public {
        require(
            artists[msg.sender] == true,
            "You are not a registered artist."
        );
        require(
            address(this).balance >= 1 ether,
            "Insufficient funds in the contract."
        );

        payable(msg.sender).transfer(1 ether);
    }
}
