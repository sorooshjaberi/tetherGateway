 const { Private_Key }=require("dotenv");
const Web3 = require("web3");
const TetherGateway = require("./build/contracts/TetherGateway.json");
const TetherToken = require("./build/contracts/TetherToken.json");
const web3 = new Web3("https://bsc-testnet.public.blastapi.io");
web3.eth.accounts.wallet.add(
  Private_Key
);
const thisWallet = web3.eth.accounts.wallet[0].address;
async function deposit(contractAddress, amountInETH) {
  const USDT = await new web3.eth.Contract(
    TetherToken.abi,
    "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"
  );
  const contract = await new web3.eth.Contract(
    TetherGateway.abi,
    contractAddress
  );
  const amountInWei = web3.utils.toWei(String(amountInETH), "ether");
  const approveTx = await USDT.methods
    .approve(contractAddress, amountInWei)
    .send({ from: thisWallet, gas: 2000000, gasPrice: 20000000000 });
  console.log(approveTx);
  const depositTx = await contract.methods
    .deposit(amountInWei)
    .send({ from: thisWallet, gas: 2000000, gasPrice: 20000000000 });
  console.log(depositTx);
  console.log(
    "contract balance: ",
    await USDT.methods.balanceOf(contractAddress)
  );
}
// deposit("0xf19b86d550a18e0c7450abecb4e8c6ac107d1258", 1);
async function withdraw(contractAddress) {
  const contract = await new web3.eth.Contract(
    TetherGateway.abi,
    contractAddress
  );
  const tx = await contract.methods
    .withdrawAll()
    .send({ from: thisWallet, gas: 2000000, gasPrice: 20000000000 });
    console.log(tx)
}
withdraw("0xf19b86d550a18e0c7450abecb4e8c6ac107d1258");
