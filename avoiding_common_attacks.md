# SWC Registry

## SWC-103 Floating Pragma

Both `Pool` and `Orange` contracts use fixed floating pragma `0.8.10`

## SWC-123 Requirement Violation

Both `Pool` and `Orange` contracts use `require()` construct to validate legit external inputs e.g.

- Pool `withdraw` function uses `require(_withdrawAmount <= getBalance(), "Overdrawn");`, and
- Orange `mint` function uses `require(account != address(0), "Orange mint to the zero address");`

## SWC-105 Unprotected Ether Withdrawal

`withdraw` is used with OpenZeppelin Ownable `onlyOwner` modifier

## Checks-Effects-Interactions & Proper use of .call and .delegateCall

`withdraw` function in Pool:

1. check `require(withdrawAmount <= getBalance(), "Overdrawn")`
2. process withdraw by deducting user's and contract balances
3. send ETH to the sender
4. check whether the transaction is successful

`.call` replaces `.transfer` in this case to send ETH with the latest standard.
