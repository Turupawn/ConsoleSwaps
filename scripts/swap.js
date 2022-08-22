// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  var ROUTER_ADDRESS = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"
  var TOKEN_A_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  var TOKEN_B_ADDRESS  = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
  var AMOUNT_A = "5"
  var AMOUNT_B_MIN = "0.1"
  var DESTINATION = "0xb6F5414bAb8d5ad8F33E37591C02f7284E974FcB"

  var myWallet
  [myWallet] = await ethers.getSigners();

  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  const timestamp = blockBefore.timestamp;

  const tokenA = await ethers.getContractAt(
    "IERC20",
    TOKEN_A_ADDRESS);
  const tokenB = await ethers.getContractAt(
    "IERC20",
    TOKEN_B_ADDRESS);
  const router = await ethers.getContractAt(
    "DummyRouter",
    ROUTER_ADDRESS);

  console.log("My address: " + myWallet.address)
  console.log("My tokenA balance:" + await tokenA.balanceOf(myWallet.address))
  
  await router.swapExactTokensForTokens(
    ethers.utils.parseUnits(AMOUNT_A, await tokenA.decimals()),
    ethers.utils.parseUnits(AMOUNT_B_MIN, await tokenB.decimals()),
    [TOKEN_A_ADDRESS, TOKEN_B_ADDRESS],
    DESTINATION,
    timestamp + 500
    )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
