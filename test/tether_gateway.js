const TetherGateway = artifacts.require("TetherGateway");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TetherGateway", function (/* accounts */) {
  let contract;
  before(async () => {
    contract = await TetherGateway.deployed();
  });
  it("approve 1 usdt", async () => {
    try {
      await contract.approveContract(1);
      const allowance = await contract.allowanceOfContract();
      console.log("allowance is :", allowance.toString());
      expect(allowance.toString() == 1).to.be.true;
    } catch (err) {
      console.log(err.message);
    }
  });
  it("deposit", async () => {
    try {
      await contract.deposit(1);
    } catch (error) {
      console.log(error.message);
    }
  });
});
