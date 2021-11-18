const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Pool', function () {
  let Pool, pool, owner, addr1, addr2
  const initalBalance = 0

  beforeEach(async () => {
    Pool = await ethers.getContractFactory('Pool')
    pool = await Pool.deploy()
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
      expect(await pool.getContractBalance()).to.equal(initalBalance + 1)
    })

    it('Should return user balance from addBalance', async function () {
      await pool.addBalance(11)
      expect(await pool.getBalance()).to.equal(11)
    })

    it('Should withdrawSomeBalance', async function () {
      await pool.connect(addr1).addBalance(5)
      await pool.connect(addr1).withdraw(2)
      expect(await pool.connect(addr1).getBalance()).to.equal(3)
    })
  })
})
