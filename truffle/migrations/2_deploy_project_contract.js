const ProjectContract = artifacts.require("ProjectContract");

/**
  uint256 projectId; // Autoincremental
  string projectName;
  string description;
  uint256 yearlyTonsRemovalPotential;
  uint256 creditsAvailable;
  uint256 creditPrice;
  address ownerAddress;
 */
const testData = [
  "Test project",
  "Mi descripción de preuba",
  500,
  200,
  15,
  "0x5725c6383fba0E489157eF693FeE7bc3CeF8aEDe"
];

module.exports = function (deployer) {
  deployer.deploy(ProjectContract).then(async () => {
    const projectInstance = await ProjectContract.deployed();
    await projectInstance.createProject(...testData);
  });
};
