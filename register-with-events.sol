// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract RegisterWithEvents {
    mapping(bytes32 => uint) public docTime;

    event DocumentAdded(bytes32 documentHash, uint timestamp);

    function addDocument(bytes32 documentHash) public {
        docTime[documentHash] = block.timestamp;
    }

    function getDate(bytes32 documentHash) public view returns (uint) {
        if (docTime[documentHash] == 0) {
            return 0;
        }
        return docTime[documentHash];
    }
}
