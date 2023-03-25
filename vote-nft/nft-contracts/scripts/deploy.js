require('dotenv').config()
const hre = require('hardhat')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

async function main() {
  const ethers = hre.ethers
  const upgrades = hre.upgrades;

  console.log('network:', await ethers.provider.getNetwork());

  const signer = (await ethers.getSigners())[0];
  console.log('signer:', await signer.getAddress());

  const feeAddress = process.env.FEE_ADDRESS;
  

  /**
   *  Deploy SpaceFactory
   */
  
   const contractFactory = await ethers.getContractFactory('SpaceFactory');
   const contract = await contractFactory.deploy(feeAddress);
   await contract.deployed();

   console.log('SpaceFactory Deployed: ', contract.address);

   await sleep(60);
   // Verify SpaceFactory
   try {
     await hre.run('verify:verify', {
       address: contract.address,
       constructorArguments: [feeAddress]
     })
     console.log('SpaceFactory verified')
   } catch (error) {
     console.log('SpaceFactory verification failed : ', error)
   }    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
