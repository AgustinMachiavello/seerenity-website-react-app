import {
  Card as CardGrommet,
  CardBody,
  CardHeader,
  Image,
  Box,
  Heading,
  Paragraph
} from "grommet";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import seaweed from "../../assets/images/sea-weed-1.jpeg";
import blurredGreen from "../../assets/images/blurred-green-2.jpg";

// Ruta al directorio actual
const PHOTOS_DIR = "../../assets/images/covers";

const ContainerClickywabadoply = styled.div`
  cursor: pointer;

  .boxy {
    border: 1px solid #3c6382;
  }

  &:hover .boxy {
    box-shadow: 0px 5px 20px 1px;
    transition: box-shadow ease-in-out 0.1s;
  }
`;

const Card = ({ title, description, toUrl, photoUrl }) => {
  return (
    <ContainerClickywabadoply onClick={() => (window.location.href = toUrl)}>
      <Box
        className="boxy"
        style={{
          borderRadius: "20px"
          // backgroundColor: "transparent",
          // backgroundImage: `url(${blurredGreen})`,
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover"
        }}
        direction="column"
      >
        {/* <Image
          src={`${PHOTOS_DIR}/${photoName}.jpg`}
          height="240"
          fit="cover"
          style={{
            borderRadius: "19px 19px 0 0"
          }}
        ></Image> */}
        <div
          style={{
            height: "240px",
            backgroundColor: "transparent",
            backgroundImage: `url(${photoUrl})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "19px 19px 0 0"
          }}
        ></div>
        <Box pad="medium">
          <Heading size="small" level={2}>
            {title}
          </Heading>

          <Paragraph>{description}</Paragraph>
        </Box>
      </Box>
    </ContainerClickywabadoply>
  );
};

export default Card;
