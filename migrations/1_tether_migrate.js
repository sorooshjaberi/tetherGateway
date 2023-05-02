const TetherGateway = artifacts.require("TetherGateway");
module.exports = (deployer) => {
  deployer.deploy(TetherGateway);
};
