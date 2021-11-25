//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "hardhat/console.sol";

/// @notice Build the backbone for ERC20 tokens
/// @dev    Interface clone from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol
interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

/// @title  An ERC20 token: Orange
/// @author Chen-kuo Chou
/// @notice An ERC20 conotract to create and process Orange tokens
/// @dev    Orange is ERC20Basic
contract Orange is IERC20 {
    string public name = "Orange";
    string public symbol = "OGE";
    uint8 public decimals = 0;

    /// @dev    Returns user Orange balance
    mapping(address => uint256) balances;
    /// @dev    Returns the amount that the deligate allows to spend
    mapping(address => mapping(address => uint256)) allowed;
    /// @dev    Returns the total suppplied Orange tokens, can be increased by 'mint'
    uint256 totalSupply_;

    /// @dev    Sets up initial total supply to be 1000000
    constructor() {
        totalSupply_ = 1000000;
        balances[msg.sender] = totalSupply_;
    }

    /// @dev    Returns the total amount of tokens
    function totalSupply() public view override returns (uint256) {
        return totalSupply_;
    }

    /// @dev    Returns user's token balance
    function balanceOf(address tokenOwner)
        public
        view
        override
        returns (uint256)
    {
        return balances[tokenOwner];
    }

    /// @dev    Transfers tokens from a caller(owner) to recipient
    /// @param  amount from caller to recipient
    /// @return True for successful transaction
    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        require(amount <= balances[msg.sender], "Overdrawn");
        balances[msg.sender] -= (amount);
        balances[recipient] += (amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    /// @dev    Returns the amount of tokens the delegate allowed to spend
    /// @param  spender is delegated by owner
    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint256)
    {
        return allowed[owner][spender];
    }

    /// @dev    Sets up the amount for spender
    /// @param  spender spends the amount of owner's tokens
    /// @return True for successful transaction
    function approve(address spender, uint256 amount)
        public
        override
        returns (bool)
    {
        allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /// @dev    Similar to {transfer} but transfers tokens from a sender to recipient
    /// @param  amount from sender to recipient
    /// @return True for successful transaction
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        require(amount <= balances[sender], "Overdrawn");
        require(amount <= allowed[sender][msg.sender], "Overdrawn");

        balances[sender] -= (amount);
        allowed[sender][msg.sender] -= (amount);
        balances[recipient] += (amount);
        emit Transfer(sender, recipient, amount);
        return true;
    }

    /// @dev    Mint Orange tokens and increase totalSupply
    /// @param  amount to mint for account
    function mint(address account, uint256 amount) public {
        require(account != address(0), "Orange mint to the zero address");

        totalSupply_ += amount;
        balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
}
