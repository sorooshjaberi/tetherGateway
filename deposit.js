const web3 = require("web3");
const TetherGateway = artifacts.require("TetherGateway");
const TetherToken = artifacts.require("TetherToken");
async function deposit(contractAddress , amountInETH){
    const USDT = await TetherToken.at('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd');
    const contract = await TetherGateway.at(contractAddress);
    const amountInWei = web3.utils.toWei(String(amountInETH) , "ether");
    const approveTx = await USDT.approve(contractAddress , amountInWei);
    console.log(approveTx);
    const depositTx = await contract.deposit(amountInWei);
    console.log(depositTx);
    console.log('contract balance: ' , await USDT.balanceOf(contractAddress));
}
// deposit('0xF19b86d550A18E0c7450abECB4E8C6Ac107d1258' , 2);

//inline deposit for console 
async function depositJs(contractAddress , amountInETH){ const USDT = await TetherToken.at('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'); const contract = await TetherGateway.at(contractAddress); const amountInWei = web3.utils.toWei(String(amountInETH) , "ether"); const approveTx = await USDT.approve(contractAddress , amountInWei); console.log(approveTx); const depositTx = await contract.deposit(amountInWei); console.log(depositTx); console.log('contract balance: ' , (await USDT.balanceOf(contractAddress)).toString()); }
