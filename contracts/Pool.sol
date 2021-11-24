//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Orange.sol";

/// @title  A conotract to depoit and withdraw ETH
/// @author Chen-kuo Chou
/// @notice Depoits, withdraws and check ETH balance
/// @dev    A simple bank that safely processes payments
contract Pool is Ownable {
    /// @dev Sets up intitial contract balance to be 0
    uint256 totalContractBalance = 0;

    /// @dev Returns ETH balance in wei
    mapping(address => uint256) balances;

    /// @dev Points to Orange.sol address
    address public orange;

    /// @dev    Sets up Orange.sol address when deploy
    /// @param  orangeAddress deployed Orange.sol address
    constructor(address orangeAddress) {
        orange = orangeAddress;
    }

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
    function withdraw(uint256 _withdrawAmount) public payable {
        require(_withdrawAmount <= getBalance(), "Overdrawn");
        balances[msg.sender] -= _withdrawAmount;
        totalContractBalance -= _withdrawAmount;

        (bool sent, ) = msg.sender.call{value: _withdrawAmount}("");
        require(sent, "Failed to withdraw");
    }

    /// @notice User can buy Orange from this pool
    /// @dev    Buys Orange with user's ETH in this pool
    /// @param  swapAmount ETH amount to buy Orange tokens
    /// @return success for successful transaction
    function buyOrange(uint256 swapAmount) public returns (bool) {
        require(swapAmount <= getBalance(), "Overdrawn");

        balances[msg.sender] -= swapAmount;
        totalContractBalance -= swapAmount;

        Orange o = Orange(orange);
        o.mint(msg.sender, swapAmount);

        return true;
    }

    /// @dev    a fallback function
    receive() external payable {}
}
