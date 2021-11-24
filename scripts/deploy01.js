const hre = require('hardhat')

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const Orange = await hre.ethers.getContractFactory('Orange')
  const orange = await Orange.deploy()

  await orange.deployed()

  console.log('Orange deployed to:', orange.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
