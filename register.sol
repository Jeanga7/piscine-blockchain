// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Register {
    mapping(bytes32 => uint) public docTime;

    function addDocument(bytes32 documentHash) public {
        docTime[documentHash] = block.timestamp;
    }

    function getDate(bytes32 documentHash) public view returns (uint) {
        /* if (docTime[documentHash] == 0) {
            return 0;
        } */
        require(docTime[documentHash] != 0, "Document not found");
        return docTime[documentHash];
    }
}
