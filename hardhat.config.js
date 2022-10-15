require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      chainId: 31337
    },
    mumbai: {
      networkId: 80001,
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    artifacts: './artifacts'
  }
};