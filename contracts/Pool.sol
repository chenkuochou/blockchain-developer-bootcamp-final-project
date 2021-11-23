//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";

//import "@openzeppelin/contracts/access/Ownable.sol";

/// @title  A conotract to depoit and withdraw ETH
/// @author Chen-kuo Chou
/// @notice Depoits, withdraws and check ETH balance
/// @dev    A simple bank that safely processes payments
contract Pool {
    uint256 totalContractBalance = 0;
    mapping(address => uint256) balances; // user ETH in wei

    /// @notice Gets the totle ETH in this pool
    /// @return Returns totalContractBalance
    function getContractBalance() public view returns (uint256) {
        return totalContractBalance;
    }

    /// @notice User add ETH in this pool
    /// @param  _amount ETH amount to add
    /// @return True for successful transaction
    function addBalance(uint256 _amount) public payable returns (bool) {
        balances[msg.sender] += _amount;
        totalContractBalance += _amount;
        return true;
    }

    /// @notice Returns user's ETH balance in this pool
    /// @return Returns through mapping balances[]
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    /// @notice User add ETH in this pool
    /// @param  _withdrawAmount ETH amount to add
    /// @return success for successful transaction
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

    /// @notice User can buy Orange from ETH balance in this pool
    /// @dev    Swaps Orange with user's ETH in this pool
    function swap(uint256 _swapAmount) public payable returns (bool success) {
        // TODO: swap ETH from this Pool to Orange
    }

    /// @dev    a callback function
    receive() external payable {}
}
