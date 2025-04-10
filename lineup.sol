// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Lineup {
    string[] public artists;

    function addArtist(string memory artist) public{
        artists.push(artist);
    }

    function lineup(uint index) public view returns (string memory){
        return artists[index];
    }
}
