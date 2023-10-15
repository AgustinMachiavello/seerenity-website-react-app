import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid, Heading, Page } from "grommet";
import { useParams } from "react-router-dom";

import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";
import Header from "@components/Header";
import Card from "@components/Card";

const ProjectDetailsPage = () => {
  // Hooks
  const { state } = useEth();

  // States
  const [project, setProject] = useState();
  console.warn("project", project);

  // Data
  const userAccount = state.accounts?.[0];
  let { projectId } = useParams();

  const fetchProject = useCallback(
    async (id) => {
      const projectContract = new state.web3.eth.Contract(
        ProjectContractJson.abi,
        "0xf49e9a7afbac9a706FeB2Ad986d8E3a916C6734B"
      );

      await projectContract.methods
        .getProjectDetails(1)
        .call()
        .then((p) => setProject(p));
    },
    [state]
  );

  // Effects
  useEffect(() => {
    if (state.web3?.eth && projectId) {
      fetchProject(projectId);
    }
  }, [state, projectId]);

  return (
    <Page>
      <Header />
      <Box pad="large">
        <Heading level={2}>{project?.projectName}</Heading>
      </Box>
    </Page>
  );
};

export default ProjectDetailsPage;
