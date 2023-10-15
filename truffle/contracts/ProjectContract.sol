// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProjectContract {
    struct Project {
        uint256 projectId;
        string projectName;
        string description;
        uint256 yearlyTonsRemovalPotential;
        uint256 creditsAvailable;
        uint256 creditPrice;
        address ownerAddress;
    }

    uint256 public projectCount; // Contador de proyectos
    // string public projectName;
    // string public description;
    // uint256 yearlyTonsRemovalPotential;
    // uint256 creditsAvailable;
    // uint256 creditPrice;
    // address ownerAddress;

    mapping(uint256 => Project) public projects; // Mapeo de proyectos por su ID
    mapping(address => uint256) public userCredits; // Créditos por usuario

    // constructor(
    //     string memory _projectName,
    //     string memory _description,
    //     uint256 _yearlyTonsRemovalPotential,
    //     uint256 _creditsAvailable,
    //     uint256 _creditPrice,
    //     address _ownerAddress
    // ) {
    //     projectCount = 0;

    //     projectName = _projectName;
    //     description = _description;
    //     yearlyTonsRemovalPotential = _yearlyTonsRemovalPotential;
    //     creditsAvailable = _creditsAvailable;
    //     creditPrice = _creditPrice;
    //     ownerAddress = _ownerAddress;
    // }

    // Constructor
    constructor() {
        projectCount = 0;
    }

    // Events
    // Evento para registrar la compra de créditos
    event CreditsPurchased(
        address indexed user,
        uint256 projectId,
        uint256 amount
    );

    function createProject(
        string memory projectName,
        string memory description,
        uint256 yearlyTonsRemovalPotential,
        uint256 creditsAvailable,
        uint256 creditPrice,
        address ownerAddress
    ) public {
        projectCount++;
        projects[projectCount] = Project({
            projectId: projectCount,
            projectName: projectName,
            description: description,
            yearlyTonsRemovalPotential: yearlyTonsRemovalPotential,
            creditsAvailable: creditsAvailable,
            creditPrice: creditPrice,
            ownerAddress: ownerAddress
        });
    }

    function getProject(
        uint256 projectId
    ) public view returns (Project memory) {
        for (uint256 i = 1; i <= projectCount; i++) {
            if (projects[i].projectId == projectId) {
                return projects[i];
            }
        }
        revert("Proyecto not found");
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory projectList = new Project[](projectCount);

        for (uint256 i = 1; i <= projectCount; i++) {
            projectList[i - 1] = projects[i];
        }

        return projectList;
    }

    function purchaseCredits(uint256 projectId, uint256 amount) public payable {
        Project storage project = projects[projectId];

        for (uint256 i = 1; i <= projectCount; i++) {
            if (projects[i].projectId == projectId) {
                project = projects[i];
            }
        }
        require(msg.value > 0, "Value must be greater than 0");

        require(
            project.creditsAvailable >= amount,
            "Project does not have enough credits left"
        );

        uint256 totalPrice = project.creditPrice * amount; // Precio total en Ether
        require(msg.value >= totalPrice, "Insufficient ETHs to buy");

        // Transferir Ether al proyecto
        address payable projectOwner = payable(project.ownerAddress);
        projectOwner.transfer(msg.value);

        // Registrar la compra de créditos para el usuario
        userCredits[msg.sender] += amount;

        // Reducir la cantidad de créditos disponibles en el proyecto
        project.creditsAvailable -= amount;

        // Emitir evento de compra de créditos
        emit CreditsPurchased(msg.sender, projectId, amount);
    }
}
