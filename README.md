# Consensys blockchain final project

## Project description

Orange Village: An Orange token (ERC20) bank

Structurally, Orange Village consists of two contracts `Pool` a simple bank and `Orange` ERC20 with a feature to buy Orange tokens from Pool at frontend.

Pool contract can:

- Deposit ETH
- Withdraw ETH
- Check total pool balance
- Check caller's balance
- Buy Orange tokens (by deducting caller's balance)

Orange contract inherits basic ERC20 standards with `totalSupply()` `balanceOf` `transfer` `allowance` `approve` `transferFrom` and one extra `mint` functions.

The idea of Orange Village is to encourage users to deposit ETH into the pool and buy Orange tokens from the pool.

I plan to implement the Compound protocol in the Pool contract for users to earn interest once they deposit.

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

- Node.js v16.9.1
- npm 7.21.1
- Hardhat
- React

### Dependencies

- @nomiclabs/hardhat-ethers
- @nomiclabs/hardhat-waffle
- chai
- dotenv
- ethereum-waffle
- ethers
- hardhat
- react
- react-dom
- react-scripts
- web-vitals

### Instructions

1. Clone from `https://github.com/chenkuochou/blockchain-developer-bootcamp-final-project.git`
2. `npm install` to install all dependencies
3. `npx hardhat test` to perform unit tests
   NOTE: please comment out Ropsten network block in `hardhat.config.js` before test.
4. `npx hardhat node` to start the local test node
5. `npx hardhat run scripts/deploy.js --network localhost` to deploy the contract to the test network
6. `npm start` to start React server populated at http://localhost:3000/

### How to use Orange Village

Same steps demonstrated in the screencast demo

1. Deposit 22 ETH in wei
2. Withdraw 2 ETH in wei (20 ETH in wei left)
3. Buy 10 Oranges from the pool
4. Transfer Oranges to someone

## Unit tests result

test/Pool.js
test/Orange.js

    Compiling 1 file with 0.8.10
    Compilation finished successfully


    Orange
        Deployment
        ✓ Should set the total supply
        ✓ Should assign the total supply of tokens to the owner
        Transactions
        ✓ Should transfer tokens between accounts
        ✓ Should fail if not enough tokens
        ✓ Should update balances after transfers (49ms)

    Pool
        Deployment
        ✓ Should set the right inital balance
        Transactions
        ✓ Should update contract balance from addBalance
        ✓ Should update user balance from addBalance
        ✓ Should withdraw user balance
        Buy Oranges
        ✓ Should update balance from buying oranges


    10 passing (2s)

## Fronted access

https://orangevillage.netlify.app/

## Screencast link

https://youtu.be/pAJh1adrXBg

## Ethereum address for certification:

`0xc737AF9C35498abe6b2BAd27eED85E2EfBb7F0A1`

## Things to improve

- Pool contract built-in interests earning from Compound protocol
- Orange ERC20 completion e.g. security and functionality
- Frontend triggered by contract events
- Frontend interactive with wallets e.g. connect/disconnect messages
- General UI design

## Final

Thank you Consensys Team. Appreciate the quality content and teaching team, very much enjoyed it! :)
