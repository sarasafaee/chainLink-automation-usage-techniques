// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // const upKeep = await ethers.getContractFactory("testUpkeep");//0x238cF4624623c51CE21aD265f2c18999c093Af2f
  const upKeep = await ethers.getContractFactory("UpkeepIDConditionaltest");//0x238cF4624623c51CE21aD265f2c18999c093Af2f
  const token = await ethers.getContractFactory("MyToken00");//0x238cF4624623c51CE21aD265f2c18999c093Af2f

  // 0x326c977e6efc84e512bb9c30f76e30c160ed06fb
  // const UpKeep = await upKeep.deploy();
  const UpKeep = await upKeep.deploy("0x326c977e6efc84e512bb9c30f76e30c160ed06fb","0xb58E509b59538256854b2a223289160F83B23F92");
  const Token = token.attach(
    "0x326c977e6efc84e512bb9c30f76e30c160ed06fb" // Link token address
  )
  
  console.log(" deployed to:", await UpKeep.address);
  // console.log("res:" , res)
  // 0x238cF4624623c51CE21aD265f2c18999c093Af2f
  Token.approve(UpKeep.address,ethers.utils.parseEther("1"));
  const res = await UpKeep.callStatic.registerAndPredictID("0x238cF4624623c51CE21aD265f2c18999c093Af2f",ethers.utils.parseEther("1"),500000,"name1");
  console.log(res)
}


main();