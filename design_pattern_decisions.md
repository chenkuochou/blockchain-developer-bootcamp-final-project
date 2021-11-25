# Design patterns

## Inter-Contract Execution

Pool contract calls Orange contract by import `./Orange.sol` and initialise Orange.sol address by the constructor. `buyOrange` function, use `Orange o = Orange(orange)` as a pointer to call `mint` function from Orange contract.

## Inheritance and Interfaces

Orange contract inherit IERC20 interface clone from @OpenZeppelin, and overides those functions except `mint`.
