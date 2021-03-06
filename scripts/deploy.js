const hre = require('hardhat')

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const Orange = await hre.ethers.getContractFactory('Orange')
  const orange = await Orange.deploy()
  await orange.deployed()

  const Pool = await hre.ethers.getContractFactory('Pool')
  const pool = await Pool.deploy(orange.address)
  await pool.deployed()

  console.log('Pool deployed to:', pool.address)
  console.log('Orange deployed to:', orange.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
