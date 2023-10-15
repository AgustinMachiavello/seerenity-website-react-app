import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Page } from "grommet";

import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";
import Header from "@components/Header";
import Card from "@components/Card";

const ProjectsListPage = () => {
  // Hooks
  const { state } = useEth();

  // States
  const [projects, setProjects] = useState([]);

  // Data
  const userAccount = state.accounts?.[0];
  console.warn("projects", projects);
  console.warn("state", state);
  console.warn("useraccount", userAccount);

  const fetchProjects = useCallback(async () => {
    const projectContract = new state.web3.eth.Contract(
      ProjectContractJson.abi,
      CONTRACT_ADDRESSES.project
    );

    await projectContract.methods
      .getProjects()
      .call()
      .then((pList) => {
        setProjects(pList);
      });
  }, [state]);

  // Effects
  useEffect(() => {
    if (state.web3?.eth) {
      fetchProjects();
    }
  }, [state, fetchProjects]);

  return (
    <Page>
      <Header />
      <Box pad="large">
        <Grid columns="medium" gap="small">
          {projects.map((project) => (
            <Card
              title={project.projectName}
              description="hello"
              toUrl={`/projects/${project.projectId}`}
            />
          ))}
        </Grid>
      </Box>
    </Page>
  );
};

export default ProjectsListPage;
