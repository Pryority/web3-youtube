// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Youtube {
    // Set the default count of videos to be zero
    uint256 public videoCount = 0;
    // Name of the contract
    string public name = 'Youtube';
    // Mapping of every Video stored in videos
    mapping(uint256 => Video) public videos;

    // Create a struct called 'Video' that has the properties of Videos that will be minted
    struct Video {
        uint256 id;
        string hash;
        string title;
        string description;
        string location;
        string category;
        string thumbnailHash;
        string date;
        address author;
    }

    event VideoUploaded (
        uint256 id,
        string hash,
        string title,
        string description,
        string location,
        string category,
        string thumbnailHash,
        string date,
        address author
    );

    construct() {}

    function uploadVideo() {
        string memory _videoHash,
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _category,
        string memory _thumbnailHash,
        string memory _date,
        string memory _videoHash,
        string memory _videoHash,
    }
}