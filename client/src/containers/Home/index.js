import {
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

const Home = () => {
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
        <Heading>¿Por qué Seerenity?</Heading>
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
    </Box>
  );
};

export default Home;
