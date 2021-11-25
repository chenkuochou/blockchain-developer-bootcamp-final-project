# Consensys blockchain final project

Orange Village: An Orange token (ERC20) bank

Structurally, Orange Village consists of two contracts `Pool` a simple bank and `Orange` ERC20 with a feature to buy Orange tokens from Pool at frontend.

Pool contract can:

- Deposit ETH
- Withdraw ETH
- Check total pool balance
- Check caller's balance
- Buy Orange tokens (by deducting caller's balance)

Orange inherits basic ERC20 standards with `totalSupply()` `balanceOf` `transfer` `allowance` `approve` `transferFrom` and one extra `mint` functions.

The idea of Orange Village is to encourage users to deposit ETH into the pool and earn interests (not yet implemented) and buy Orange tokens from the pool.

## Directory structure

    .
    ├── contracts
    ├── public
    ├── scripts
    ├── src
    ├── test
    ├── package-lock.json
    ├── package.json
    ├── deployed_address.txt
    ├── avoiding_common_attacks.md
    ├── design_pattern_decisions.md
    ├── LICENSE
    └── README.md

## Deploy project locally:

### Environmnet

-

### Contracts

-

### Frontend

-

### How to populate locally deployed contracts with listings

-

## Fronted access

## Screencast link

https://youtu.be/

## Ethereum address for certification:

`0xc737AF9C35498abe6b2BAd27eED85E2EfBb7F0A1`

## Things to improve

- Pool contract built-in interests earning from Compound protocol
- Orange ERC20 completion e.g. security and functionality
- Frontend triggered by contract events
- Frontend interactive with wallets e.g. connect/disconnect messages
- General UI design
