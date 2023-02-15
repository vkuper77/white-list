// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Main {
    struct Safe {
        uint timestamp;
        uint amount;
    }

    struct Sign {
        address from;
        uint timestamp;
    }

    mapping(address => uint) private signsStorage;
    address[] private signsAddressesStorage;
    mapping(address => Safe) private safesStorage;

    function isRecordedWhiteList() public view returns (bool recorded) {
        recorded = signsStorage[msg.sender] > 0;
        return recorded;
    }

    function recordInWhiteList() public {
        require(signsStorage[msg.sender] == 0, 'You are already recorded in whitelist');

        signsStorage[msg.sender] = 1;
    }

    function isSigned() public view returns (bool signed) {
        signed = signsStorage[msg.sender] > 1;
        return signed;
    }

    function getSigns() public view returns (Sign[] memory) {
        Sign[] memory signs = new Sign[](signsAddressesStorage.length);
        for (uint i = 0; i < signsAddressesStorage.length; i++) {
            Sign memory sign;
            sign.from = signsAddressesStorage[i];
            sign.timestamp = signsStorage[sign.from];
            signs[i] = sign;
        }
        return signs;
    }

    function doSign() public {
        require(signsStorage[msg.sender] < 2, 'You are already signed');

        signsAddressesStorage.push(msg.sender);
        signsStorage[msg.sender] = block.timestamp;
    }

    function checkSafe() public view returns (Safe memory safe) {
        safe = safesStorage[msg.sender];
        return safe;
    }

    function putInSafe() public payable {
        require(safesStorage[msg.sender].timestamp == 0, 'You already put your money in safe');
        require(msg.value > 0, 'You can\'t put emptiness in safe');

        Safe memory safe;
        safe.timestamp = block.timestamp;
        safe.amount = msg.value;
        safesStorage[msg.sender] = safe;
    }

    function getFromSafe() public {
        Safe memory safe = safesStorage[msg.sender];
        require(safe.timestamp != 0, 'You haven\'t put any money in safe');
        require(block.timestamp >= safe.timestamp + 7*24*60*60, 'Passed time is less than a week');
        // require(block.timestamp >= safe.timestamp + 5, 'Passed time is less than 5 seconds');

        address payable safeOwner = payable(msg.sender);
        safeOwner.transfer(safe.amount);
        delete safesStorage[msg.sender];
    }
}
