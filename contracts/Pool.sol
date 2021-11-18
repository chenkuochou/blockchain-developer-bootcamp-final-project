//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "hardhat/console.sol";

// import "./Orange.sol";

contract Pool {
    uint256 totalContractBalance = 0;
    mapping(address => uint256) balances; // user ETH in wei

    function getContractBalance() public view returns (uint256) {
        return totalContractBalance;
    }

    function addBalance(uint256 _amount) public payable returns (bool) {
        balances[msg.sender] = _amount;
        totalContractBalance += _amount;
        return true;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function withdraw(uint256 _withdrawAmount)
        public
        payable
        returns (bool success)
    {
        require(_withdrawAmount <= getBalance(), "Overdrawn");
        balances[msg.sender] -= _withdrawAmount;
        totalContractBalance -= _withdrawAmount;

        (success, ) = msg.sender.call{value: _withdrawAmount}("");
        // require(sent, "Failed to withdraw");
        // console.log("Sender balance is %s", balances[msg.sender]);

        if (success) return true;
    }

    // function convert(uint256 _convertAmount) {
    //     require(_convertAmount <= getBalance(), "Overdrawn");
    //     balances[msg.sender] -= _convertAmount;
    //     totalContractBalance -= _convertAmount;
    // }

    receive() external payable {}
}
