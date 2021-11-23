const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Pool', function () {
  let Pool, pool, owner, addr1, addr2
  const initalBalance = 0

  beforeEach(async () => {
    Pool = await ethers.getContractFactory('Pool')
    pool = await Pool.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3')
    ;[owner, addr1, addr2, _] = await ethers.getSigners()
  })

  describe('Deployment', function () {
    it('Should set the right inital balance', async function () {
      expect(await pool.getContractBalance()).to.equal(initalBalance)
    })
  })

  describe('Transactions', function () {
    it('Should return contract balance from addBalance', async function () {
      await pool.addBalance(1)
      await pool.addBalance(3)
      expect(await pool.getContractBalance()).to.equal(initalBalance + 4)
    })

    it('Should return user balance from addBalance', async function () {
      await pool.addBalance(11)
      await pool.addBalance(2)
      expect(await pool.getBalance()).to.equal(13)
    })

    it('Should withdrawSomeBalance', async function () {
      await pool.connect(addr1).addBalance(5)
      await pool.connect(addr1).withdraw(2)
      expect(await pool.connect(addr1).getBalance()).to.equal(3)
    })
  })
})
