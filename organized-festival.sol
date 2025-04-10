// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract OrganizedFestival {
    address public organizer;
    string public place;
    uint public startTime;

    constructor(uint _startTime, string memory _place) {
        place = _place;
        startTime = _startTime;
        organizer = msg.sender;
    }

    function getStartTime() public view returns (uint){
        return startTime;
    }

    function getPlace() public view returns (string memory){
        return place;
    }

    function updateStartTime(uint _startTime) public {
        require(msg.sender == organizer, "0nly admin can update start time.");
        startTime = _startTime;
    }

    function updatePlace(string memory _place) public {
        require(msg.sender == organizer, "0nly admin can update place.");
        place = _place;
    }
}
