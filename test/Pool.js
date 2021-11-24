const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Pool', function () {
  let Pool, pool, owner, addr1, addr2
  const initalBalance = 0

  beforeEach(async () => {
    Pool = await ethers.getContractFactory('Pool')
    pool = await Pool.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3')

    Token = await ethers.getContractFactory('Orange')
    token = await Token.deploy()
    ;[owner, addr1, addr2, _] = await ethers.getSigners()
  })

  describe('Deployment', function () {
    it('Should set the right inital balance', async function () {
      expect(await pool.getContractBalance()).to.equal(initalBalance)
    })
  })

  describe('Transactions', function () {
    it('Should update contract balance from addBalance', async function () {
      await pool.addBalance(1, { value: ethers.utils.parseUnits('1', 'wei') })
      await pool.addBalance(3, { value: ethers.utils.parseUnits('3', 'wei') })
      expect(await pool.getContractBalance()).to.equal(initalBalance + 4)
    })

    it('Should update user balance from addBalance', async function () {
      await pool.addBalance(11, { value: ethers.utils.parseUnits('11', 'wei') })
      await pool.addBalance(2, { value: ethers.utils.parseUnits('2', 'wei') })
      expect(await pool.getBalance()).to.equal(13)
    })

    it('Should withdraw user balance', async function () {
      await pool
        .connect(addr1)
        .addBalance(5, { value: ethers.utils.parseUnits('5', 'wei') })
      await pool
        .connect(addr1)
        .withdraw(2, { value: ethers.utils.parseUnits('2', 'wei') })
      expect(await pool.connect(addr1).getBalance()).to.equal(3)
    })
  })

  describe('Buy Oranges', function () {
    it('Should update balance from buying oranges', async function () {
      await pool
        .connect(addr2)
        .addBalance(10, { value: ethers.utils.parseUnits('10', 'wei') })
      await pool.connect(addr2).buyOrange(3)
      expect(await pool.connect(addr2).getBalance()).to.equal(7)
    })

    // it('Should update orange balance after buying from pool', async function () {
    //   await pool
    //     .connect(addr1)
    //     .addBalance(10, { value: ethers.utils.parseUnits('10', 'wei') })

    //   await pool.connect(addr1).buyOrange(2)
    //   const balance = await token.connect(addr1).balanceOf(addr1.address)
    //   expect(balance).to.equal(2)
    // })
  })
})
