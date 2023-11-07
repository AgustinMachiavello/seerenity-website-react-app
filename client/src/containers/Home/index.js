import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Image,
  Paragraph,
  Text
} from "grommet";
import styled from "styled-components";
import { Link } from "react-router-dom";

import bannerImage from "../../assets/images/blue-blurred-1.jpg";
import algaIcon from "../../assets/images/alga-icon-1.png";
import descentralized1 from "../../assets/images/descentralized.png";
import Header from "@components/Header";
import { Next, Key, Target, Inspect } from "grommet-icons";
import metamskLogo from "../../assets/images/assets_logo_metamask-removebg-preview.png";
import { useState } from "react";
import seerenityText from "../../assets/images/seerenity-text.png";

const renderPanelHeader = (title, active) => (
  <Box direction="row" align="center" pad="medium" gap="small">
    <strong>
      <Text>{title}</Text>
    </strong>
    <Text color="brand">{active ? "-" : "+"}</Text>
  </Box>
);

const Banner = styled.div`
  height: 80vh;
  width: 100vw;
  background-color: red;
  background-image: url(${bannerImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const categories = [
  {
    id: 1,
    title: "Simple",
    icon: <Target size="large" />,
    description: "Una experiencia de compra sencilla y directa."
  },
  {
    id: 2,
    title: "Transparente",
    icon: <Inspect size="large" />,
    description: "Toda la información que necesitas, sin sorpresas ocultas."
  },
  {
    id: 3,
    title: "Seguro",
    icon: <Key size="large" />,
    description: "Tu inversión protegida en cada transacción."
  }
];

const faqs = [
  {
    id: 2, // melapela
    title: "¿Qué problemática intenta solventar Seerenity?",
    description: (
      <>
        En las últimas décadas las emisiones de carbono se han disparado, no
        solo por la combustión de combustibles fósiles sino por el cambio de uso
        del suelo y la destrucción de hábitats que funcionan como sumideros de
        carbono. Actualmente, aunque somos conscientes del daño que causa
        nuestra forma de vida, las emisiones siguen incrementando. Es por eso
        que ha nacido todo un sector dedicado a buscar soluciones para mitigar
        estas emisiones y secuestrar un porcentaje del carbono que hay en la
        atmósfera.
      </>
    )
  },
  {
    id: 1,
    title: "¿Qué tipo de proyectos existen en Seerenity?",
    description: (
      <>
        Nos hemos centrado en proyectos con <i>Posidonia oceanica</i>, una
        fanerógama marina que forma praderas, ya que es el tipo de ecosistema
        más común en la costa catalana.
      </>
    )
  },
  {
    id: 2,
    title: "¿Qué red de blockchain se utiliza?",
    description: (
      <>
        La red que se ha decidido utilizar para la implementación de este
        proyecto es <i>Polygon</i>, una red de capa dos la cual opera sobre la
        cadena de bloques de Ethereum. Las redes de capa dos dan una solución a
        la falta de escalabilidad de las redes principales y aportan un mayor
        rendimiento. Además, ofrecen transacciones más rápidas, sin
        congestionamiento y asequibles debido a sus tarifas de gas reducidas.
      </>
    )
  }
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState([0]);
  return (
    <Box direction="column">
      <Header></Header>
      {/* Banner */}
      <Box>
        <Banner>
          <Grid
            columns={{
              count: 2,
              size: "auto"
            }}
            pad="large"
          >
            <Box>
              <Heading size="large" color="brand" level={1}>
                Compra y vende créditos de carbono azul
              </Heading>
              <Paragraph size="large">
                Explora nuestra plataforma de comercio electrónico de
                certificados de carbono de océanos impulsada por la tecnología
                blockchain.
              </Paragraph>
              <Box align="start" gap="large">
                <Button
                  primary
                  label="Comprar créditos"
                  onClick={() => (window.location.href = "/projects")}
                  size="large"
                  icon={<Next />}
                  reverse
                />
              </Box>
            </Box>
            <Box justify="center" align="center">
              <Image src={descentralized1}></Image>
            </Box>
          </Grid>
        </Banner>
      </Box>
      {/* Por qué */}
      <Box pad="large" background="brand">
        <Heading textAlign="center" style={{ maxWidth: "none" }}>
          ¿Por qué Seerenity?
        </Heading>

        <Box pad="medium"></Box>
        <Grid
          columns={{
            count: 3,
            size: "auto"
          }}
        >
          {categories.map((cat) => (
            <Box>
              {cat.icon}
              <Box pad="small"></Box>
              <Heading size="small" level={3}>
                {cat.title}
              </Heading>
              <Text>{cat.description}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
      {/* FAQs */}
      <Box pad="large">
        <Heading level={2}>Preguntas frecuentes</Heading>
        <Box pad="small"></Box>
        <Accordion
          activeIndex={activeIndex}
          onActive={(newActiveIndex) => setActiveIndex(newActiveIndex)}
        >
          {faqs.map((f) => (
            <AccordionPanel
              header={renderPanelHeader(f.title, activeIndex.includes(0))}
            >
              <Box pad="medium" background="light-1">
                <Text>{f.description}</Text>
              </Box>
            </AccordionPanel>
          ))}
        </Accordion>
      </Box>
      {/* Footer??? lol */}
      <Box pad="large">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image src={seerenityText} height={40} width="auto"></Image>
          <Image src={metamskLogo} height={200}></Image>
        </div>
      </Box>
    </Box>
  );
};

export default Home;
