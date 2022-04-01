// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Posts {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    address payable from;

    struct post {
        uint256 itemId;
        string title;
        string description;
        address payable from;
    }

    event postCreated(
        uint256 indexed itemId,
        string title,
        string description,
        address from
    );

    mapping(uint256 => post) private idTopost;

    post[] posts;

    constructor() payable {
        from = payable(msg.sender);
    }

    function createPost(string calldata title, string calldata description)
        public
        payable
    {
        require(msg.value >= 0.05 ether, "Post fee must be equal to 0.05");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idTopost[itemId] = post(
            itemId,
            title,
            description,
            payable(msg.sender)
        );

        posts.push(post(itemId, title, description, payable(msg.sender)));

        emit postCreated(itemId, title, description, msg.sender);
    }

    function fetchPosts() public view returns (post[] memory) {
        return posts;
    }
}
