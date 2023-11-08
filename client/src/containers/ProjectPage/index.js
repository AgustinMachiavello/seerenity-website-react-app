import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  RoutedButton,
  Grid,
  Heading,
  Page,
  Text,
  Paragraph,
  Button,
  Image,
  Tag,
  Carousel,
  Form,
  FormField,
  RangeInput
} from "grommet";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import bannerImage from "../../assets/images/blue-blurred-1.jpg";
import { convert } from "ethereumjs-units";
import ethLogo from "../../assets/images/eth-logo-black.png";
import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";
import Header from "@components/Header";
import Card from "@components/Card";
import seaWeedGif from "../../assets/images/water-fish.gif";
import galeria1 from "../../assets/images/mataro.jpeg";
import galeria2 from "../../assets/images/mataero-2.jpeg";
import galeria3 from "../../assets/images/mataro-3.jpeg";
import galeria4 from "../../assets/images/poseidon-calella-palafrugell-conoces-la-posidonia-oceanica-la-costa-brava.jpg";
import { Map } from "grommet-icons";
import maresmeMap from "../../assets/images/maresme.png";
import blurredBuy from "../../assets/images/blurred-green-2.jpg";
import { convertEurosToEth } from "../../utils";

const Banner = styled.div`
  width: 100vw;
  background-image: url(${bannerImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const galeria = [
  {
    image: galeria1,
    color: "#b8e994"
  },
  {
    image: galeria2,
    color: "#78e08f"
  },
  {
    image: galeria3,
    color: "#38ada9"
  },
  {
    image: galeria4,
    color: "#079992"
  }
];

const ProjectDetailsPage = () => {
  // Hooks
  const { state } = useEth();

  // States
  const [project, setProject] = useState();
  const [tonsToBuy, setTonsToBuy] = useState(1.0);
  const [isSuccessfulBuy, setIsSuccessfulBuy] = useState(false);
  console.warn("project", project);

  // Data
  const userAccount = state.accounts?.[0];
  const tonPrice = project?.creditPrice || 0;
  const price = tonPrice * tonsToBuy;
  let { projectId } = useParams();

  const fetchProject = useCallback(
    async (id) => {
      const projectContract = new state.web3.eth.Contract(
        ProjectContractJson.abi,
        CONTRACT_ADDRESSES.project
      );
      await projectContract.methods
        .getProject(1)
        .call()
        .then((p) => setProject(p));
    },
    [state]
  );

  // Handlers
  const handlePurchaseCredits = async () => {
    try {
      const projectContract = new state.web3.eth.Contract(
        ProjectContractJson.abi,
        CONTRACT_ADDRESSES.project
      );
      const creditPriceInEth = convertEurosToEth(price);
      const totalWeiRequired = convert(
        creditPriceInEth.toString(),
        "eth",
        "wei"
      );
      await projectContract.methods
        .purchaseCredits(projectId, tonsToBuy)
        .send({
          from: userAccount,
          value: totalWeiRequired
        })
        .then((r) => {
          if (r.status === true) {
            setIsSuccessfulBuy(true);
          }
        });
    } catch (error) {
      console.error("Error al comprar créditos:", error);
    }
  };

  // Effects
  useEffect(() => {
    if (state.web3?.eth && projectId) {
      fetchProject(projectId);
    }
  }, [state, projectId, fetchProject]);

  return (
    <Page>
      <Box>
        <Banner>
          <Header theme="dark" />
          <Box pad="large">
            <Heading size="large" color="dark-1" level={1}>
              {project?.projectName}
            </Heading>
            <Paragraph size="large" color="dark-2">
              {project?.description}
            </Paragraph>
          </Box>
        </Banner>
      </Box>

      <Box pad="small">
        <Grid
          columns={{
            count: 2,
            size: "auto"
          }}
        >
          <Box pad="large">
            <Image src={galeria3} style={{ borderRadius: "20px" }}></Image>
          </Box>

          <Box pad="large">
            <Box direction="row">
              <Map color="brand" style={{ marginRight: 10 }}></Map>Costa del
              Maresme, Catalunya
            </Box>
            <div style={{ margin: 20 }}></div>
            <Paragraph>
              El proyecto de Posidonia oceanica en las costas de Cataluña
              representa un esfuerzo integral para abordar los desafíos del
              cambio climático y la conservación marina en una de las regiones
              más hermosas del Mediterráneo. La Posidonia oceanica, una planta
              submarina endémica, desempeña un papel esencial en la captura de
              carbono. Estas praderas submarinas no solo actúan como un filtro
              natural, mejorando la calidad del agua y manteniendo la
              biodiversidad, sino que también almacenan grandes cantidades de
              carbono en su biomasa.
            </Paragraph>
            <Paragraph>
              Nuestro proyecto se centra en la restauración y preservación de
              estas praderas de Posidonia oceanica, fomentando la regeneración
              de las poblaciones y la protección de su hábitat. Al hacerlo, no
              solo se promueve la biodiversidad marina, sino que también se
              contribuye activamente a la mitigación del cambio climático al
              capturar y almacenar carbono en estas valiosas praderas
              submarinas.
            </Paragraph>
          </Box>
        </Grid>
      </Box>

      {/* BUY */}
      <Box pad="large">
        <Box
          pad="medium"
          style={{
            backgroundImage: `url(${blurredBuy})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "20px"
          }}
        >
          <Grid
            columns={{
              count: 2,
              size: "auto"
            }}
          >
            <div
              style={{
                backgroundImage: `url(${
                  isSuccessfulBuy ? seaWeedGif : maresmeMap
                })`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: 500,
                width: 500,
                borderRadius: "20px"
              }}
            ></div>
            <Box>
              {!isSuccessfulBuy && (
                <div>
                  <Heading>{project?.projectName}</Heading>
                  <Heading level={6} style={{ maxWidth: "none" }}>
                    {project?.ownerAddress}
                  </Heading>
                  <div style={{ marginTop: 20 }}></div>
                  <Heading level={5}>1 crédito = 1 tonelada de Co2</Heading>
                  <Heading level={3}>
                    €{tonPrice} / <Image src={ethLogo} height={30}></Image>{" "}
                    {convertEurosToEth(tonPrice).toFixed(4)} por crédito
                  </Heading>
                  <Heading level={3}></Heading>
                  <Heading level={4}>
                    Créditos disponibles: {project?.creditsAvailable}
                  </Heading>
                  <div style={{ marginTop: 40 }}></div>
                  <Heading level={5}>Estás comprando:</Heading>
                  <Text size="large">
                    {tonsToBuy} crédito{tonsToBuy > 1 ? "s" : ""} por €
                    {price.toFixed(2).toLocaleString()} |{" "}
                    <Image src={ethLogo} height={30}></Image>{" "}
                    {convertEurosToEth(price).toFixed(4)}
                  </Text>
                  <Box>
                    <Form
                      validate="blur"
                      onReset={(event) => console.log(event)}
                      onSubmit={({ value }) => console.log("Submit", value)}
                    >
                      <Box>
                        <FormField>
                          <RangeInput
                            value={tonsToBuy}
                            onChange={(e) =>
                              setTonsToBuy(parseFloat(e.target.value))
                            }
                          ></RangeInput>
                        </FormField>
                      </Box>
                    </Form>
                  </Box>
                  <Button
                    primary
                    label="Comprar"
                    onClick={handlePurchaseCredits}
                  ></Button>
                </div>
              )}
              {isSuccessfulBuy && (
                <Box direction="row">
                  <Heading>¡Muchas gracias! 🐟 ❤️ 🎉</Heading>
                </Box>
              )}
            </Box>
          </Grid>
        </Box>
      </Box>

      <Box pad="large" background="brand">
        <Heading textAlign="center" style={{ maxWidth: "none" }}>
          Galería
        </Heading>
        <Box gap="medium" align="center" pad="large">
          <Carousel controls play={3000}>
            {galeria.map((g) => (
              <Box pad="small" background={g.color}>
                <div
                  style={{
                    backgroundImage: `url(${g.image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: 600,
                    width: 600
                  }}
                ></div>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Page>
  );
};

export default ProjectDetailsPage;
