
/** @type import('hardhat/config').HardhatUserConfig */
// require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
// require("@nomicfoundation/hardhat-verify") ;

require("@nomiclabs/hardhat-ethers");
require("ethers");

module.exports = {
  solidity: {
    version: "0.8.19",
    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 1000,
    //   },
    // },
  },
    defaultNetwork: "hardhat",
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
  },
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        // url: "https://polygon-mainnet.g.alchemy.com/v2/Jpm-v9XHblo3Tx8n0TjK38jl__xOuoi_",
        url: "https://polygon-mumbai.g.alchemy.com/v2/GB0SOiV8PbuuyLGZ_63a-r5-3sAke_pn" //mumbai
        // "https://thrumming-bitter-isle.matic.discover.quiknode.pro/a67d4a32944ace3d7877c983d17a7a895acfc570/",
        // "https://polygon-mainnet.g.alchemy.com/v2/Jpm-v9XHblo3Tx8n0TjK38jl__xOuoi_",
        // "https://mainnet.infura.io/v3/3a252697a2194109b8fa47e46e439ac0",
        // "https://goerli.infura.io/v3/3a252697a2194109b8fa47e46e439ac0",
        // "https://bsc-dataseed.binance.org/",
      },
      localhost: {
        url: "http://127.0.0.1:8545",
        chainId: 1337,
      },
    },
    // goerli: {
    //   url: "https://goerli.infura.io/v3/3a252697a2194109b8fa47e46e439ac0",
    //   accounts: [
    //     "",
    //   ],
    // },
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/Jpm-v9XHblo3Tx8n0TjK38jl__xOuoi_",
      accounts: [
      ],
    },
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/WA55ptmlay-lnz9YeolT8ZCMqs9RqkXu",
      accounts:[
      ]
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/GB0SOiV8PbuuyLGZ_63a-r5-3sAke_pn",
      accounts: [
      ],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [
      ],
    },
    ethereum: {
      url: "https://mainnet.infura.io/v3/d76c923fc52549a889503bc8035a3d5f",
      chainId: 1,
      accounts: [
      ],
    },
  },
  etherscan: {
    apiKey: {
      goerli: "65HPY3B4FJ7KUQRUK3U8Z5Y9B41ESG41XJ",
      polygon: "WF8UGD43EWU2J31DSPQV99F2AKTRZ55NBZ",
      bsc: "E45N1MSDRKIJRH3HSUGB3CR2D1YVGQPCU2",
      mainnet: "M31QSBEVBV9Q8TG658922GI8UG8J2ZPVTK",
    },
  },
};