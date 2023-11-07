import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Grid, Heading, Page, Paragraph } from "grommet";
import styled from "styled-components";
import bannerImage from "../../assets/images/blurred-seaweed-2.jpg";

import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";
import Header from "@components/Header";
import Card from "@components/Card";

const Banner = styled.div`
  width: 100vw;
  background-image: url(${bannerImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

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
      <Box>
        <Banner>
          <Header />
          <Grid
            columns={{
              count: 2,
              size: "auto"
            }}
            pad="large"
          >
            <Box>
              <Heading size="large" color="light-1" level={1}>
                Proyectos
              </Heading>
              <Paragraph size="large" color="light-2">
                La transparencia es nuestra prioridad: explora proyectos con
                total claridad y confianza en cada paso. En nuestro ecosistema,
                la sostenibilidad se construye sobre una base sólida de apertura
                y honestidad.
              </Paragraph>
            </Box>
          </Grid>
        </Banner>
      </Box>
      <Box pad="large">
        <Grid
          columns={{
            count: 3,
            size: "auto"
          }}
          gap="small"
        >
          {projects.map((project) => (
            <Card
              title={project.projectName}
              description={project.description}
              toUrl={`/projects/${project.projectId}`}
            />
          ))}
        </Grid>
      </Box>
    </Page>
  );
};

export default ProjectsListPage;
