import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Grid, Heading, Page, Paragraph } from "grommet";
import styled from "styled-components";
import bannerImage from "../../assets/images/blurred-seaweed-2.jpg";

import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";
import Header from "@components/Header";
import Card from "@components/Card";

const PHOTO_URLS = [
  "https://marilles.org/storage/media/2021/08/886/webimg-0043.jpg",
  "https://www.elmundoecologico.es/wp-content/uploads/2015/06/replantar-posidonia-red-electrica-el-mundo-ecologico-3.jpg",
  "https://aeolianpreservationfoundation.org/wp-content/uploads/2019/07/2-1.png",
  "https://www.nationalgeographic.com.es/medio/2022/03/21/snorkel-entre-posidonia_6da9a130_800x533.jpg",
  "https://cdn01.diarimes.com/uploads/imagenes/bajacalidad/2023/01/20/_7e36f83cea7b4946b30812d9b0cd3d92_884258fc.jpeg?6355a9b23f08179324a24ae1c122c249",
  "https://s3.ppllstatics.com/ideal/www/multimedia/201807/14/media/cortadas/posidonia-oceanica-pradera-03-kEUB-U60349778694PfH-984x608@Ideal.jpg",
  "https://www.balearia.com/documents/20142/24e92cc0-0cd1-a22f-1bfd-6466850a46f9",
  "https://www.nationalgeographic.it/upload/ngi-hero/evidenza_12.jpg",
  "https://www.nauticaydeportes.com/wp-content/uploads/2017/06/bigstock-underwater-image-of-aquatic-pl-49422542.jpg",
  "https://i0.wp.com/www.favignana.biz/wp-content/uploads/2017/07/posidonia3.jpg",
  "https://ibi.gsstatic.es/pitiusas/ibiza/2016/05/10/285786/red-electrica-imedea-replantaran-posidonia-talamanca.jpg"
];

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
          {projects.map((project, index) => (
            <Card
              title={project.projectName}
              description={project.description}
              toUrl={`/projects/${project.projectId}`}
              photoUrl={PHOTO_URLS[index]}
            />
          ))}
        </Grid>
      </Box>
    </Page>
  );
};

export default ProjectsListPage;
