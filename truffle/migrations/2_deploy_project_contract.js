const ProjectContract = artifacts.require("ProjectContract");

module.exports = function (deployer) {
  deployer.deploy(ProjectContract);
};
