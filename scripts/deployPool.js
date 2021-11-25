const hre = require('hardhat')

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const Pool = await hre.ethers.getContractFactory('Pool')
  const pool = await Pool.deploy('0xA99cAc3717b6a19D55cf331B9ebF455daf1aa09B')

  await pool.deployed()

  console.log('Pool deployed to:', pool.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
