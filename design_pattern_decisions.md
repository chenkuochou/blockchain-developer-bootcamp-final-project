# Design patterns

## Inter-Contract Execution

`Pool` contract calls `Orange` contract by `import "./Orange.sol"` and initialise Orange.sol address by the constructor. `buyOrange` function, use `Orange o = Orange(orange)` as a pointer to call `mint` function from `Orange` contract.

## Inheritance and Interfaces

`Orange` inherit IERC20 interface clone from @OpenZeppelin, and overides those functions except `mint`.

## Access Control Design Patterns

`Pool` contract uses @OpenZeppelin Ownable `onlyOwner` modifiers for `withdraw` and `buyOrange` functions to limit accessibility.
