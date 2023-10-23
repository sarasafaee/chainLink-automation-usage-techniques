const { ethers, network } = require("hardhat");
const { expect } = require("chai");

describe("Leasing Test ",  () => {

    it("deploy ", async function () {
        const [owner,deployer] = await ethers.getSigners();

        const register = await ethers.getContractFactory("UpkeepIDConditionalExample");
        // Register = await register.deploy("0x326c977e6efc84e512bb9c30f76e30c160ed06fb","0x57A4a13b35d25EE78e084168aBaC5ad360252467","0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2");
        Register = register.attach(
          "0xFea6fAf5347EA9aE826e4FEf85c8F15cfDA2Cd90" // The deployed contract address on sepolia
        )
        console.log("Register address: ",Register.address);
    })
    it("deploy BalancerOnChain ", async function () {
        const [owner,deployer] = await ethers.getSigners();

        const BalancerOnChain = await ethers.getContractFactory("BalancerOnChain1");
        balancerOnChain = await BalancerOnChain.deploy();
        // const balancerOnChain = BalancerOnChain.attach(
        //   ""
        // )
        console.log("balancerOnChain address: ",balancerOnChain.address);
    })
    
    it("registerAndPredictID", async function () {
        const [owner,deployer] = await ethers.getSigners();
        linktoken = await ethers.getContractAt(
            "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol:LinkTokenInterface",
            "0xb0897686c545045aFc77CF20eC7A532E3120E0F1"
          );
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0x5e9b2325a23705BF5E4398DCf251055082b5Fa2C"],
          });
      
        impersonateAccount = await ethers.getSigner(
            "0x5e9b2325a23705BF5E4398DCf251055082b5Fa2C"
          );

        await owner.sendTransaction({
            to: impersonateAccount.address,
            value: ethers.utils.parseEther("100.0"),
          });

        params =  {
            name:"upkeep1",
            encryptedEmail:"0x",
            // encryptedEmail:ethers.utils.toUtf8Bytes("sara.safaee@gmail.com"),
            // upkeepContract:balancerOnChain.address,
            upkeepContract:"0x0C65795e2b8eb7EEFAd436C8F19A84B6782a1bad",

            gasLimit:5000,
            adminAddress:"0x5e9b2325a23705BF5E4398DCf251055082b5Fa2C",
            triggerType:0,
            checkData:"0x",
            triggerConfig:"0x",
            offchainConfig:"0x",
            amount:1000000
        }

        linktoken.connect(impersonateAccount).approve(Register.address,ethers.utils.parseEther("100.0"))
        // res = await Register.connect(impersonateAccount).registerAndPredictID(params);


        registeryy = await ethers.getContractAt(
            "/contracts/registery.sol:AutomationRegistrarInterface",
            "0x57a4a13b35d25ee78e084168abac5ad360252467"
          );

        res = await registeryy.registerUpkeep(params);
        console.log("offer num 1 : ", res);  
    })


})