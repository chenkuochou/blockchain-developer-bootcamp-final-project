const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Orange', function () {
  let Token, token, owner, addr1, addr2
  const totalSupply = 1000000

  beforeEach(async () => {
    Token = await ethers.getContractFactory('Orange')
    token = await Token.deploy()
    ;[owner, addr1, addr2, _] = await ethers.getSigners()
  })

  describe('Deployment', () => {
    it('Should set the total supply', async () => {
      expect(await token.totalSupply()).to.equal(totalSupply)
    })

    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address)
      expect(await token.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async () => {
      await token.transfer(addr1.address, 10)
      const addr1Balance = await token.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(10)
    })

    it('Should fail if not enough tokens', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address)
      await expect(
        token.connect(addr1).transfer(owner.address, 1),
      ).to.be.revertedWith('Overdrawn')

      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })

    it('Should update balances after transfers', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address)

      await token.transfer(addr1.address, 3)
      await token.transfer(addr2.address, 2)

      const finalOwnerBalance = await token.balanceOf(owner.address)
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 5)

      const addr1Balance = await token.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(3)

      const addr2Balance = await token.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(2)
    })
  })
})
