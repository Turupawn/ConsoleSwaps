require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

module.exports = {
  solidity: "0.8.16",
  networks: {
    generic: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
};