// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProjectContract {
    struct Project {
        uint256 projectId;
        string projectName;
        // Otras propiedades del proyecto
    }

    mapping(uint256 => Project) public projects; // Mapeo de proyectos por su ID
    uint256 public projectCount; // Contador de proyectos

    constructor() {
        // Inicializa el contador de proyectos
        projectCount = 0;
    }

    function createProject(string memory _projectName) public {
        projectCount++;
        projects[projectCount] = Project(projectCount, _projectName);
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory projectList = new Project[](projectCount);

        for (uint256 i = 1; i <= projectCount; i++) {
            projectList[i - 1] = projects[i];
        }

        return projectList;
    }
}
