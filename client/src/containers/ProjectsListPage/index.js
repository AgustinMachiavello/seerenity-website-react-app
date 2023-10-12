import React, { useState, useEffect } from "react";
import { Box, Card, CardHeader, Page } from "grommet";

import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";

const ProjectsListPage = () => {
  // Hooks
  const { state } = useEth();

  // States
  const [projectContract, setProjectContract] = useState();
  const [projects, setProjects] = useState([]);

  // Data
  const userAccount = state.accounts?.[0];
  console.warn("projectContract", projectContract);
  console.warn("projects", projects);
  console.warn("state", state);
  console.warn("useraccount", userAccount);

  const fetchProjects = async () => {
    await projectContract.methods
      .getProjects()
      .call()
      .then((pList) => {
        setProjects(pList);
      });
  };

  // Effects
  useEffect(() => {
    if (state.web3?.eth) {
      const projectContract = new state.web3.eth.Contract(
        ProjectContractJson.abi,
        CONTRACT_ADDRESSES.project
      );
      setProjectContract(projectContract);
    }
  }, [state]);

  useEffect(() => {
    if (projectContract?.methods) {
      fetchProjects();
    }
  }, [projectContract]);

  return (
    <Page>
      Pl page Count: {projects.length}
      <Box pad="large" gap="medium">
        {projects.map((project) => (
          <Card>
            <CardHeader>{project.projectName}</CardHeader>
          </Card>
        ))}
      </Box>
    </Page>
  );
};

export default ProjectsListPage;
