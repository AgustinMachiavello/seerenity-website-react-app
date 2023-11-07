import {
  Card as CardGrommet,
  CardBody,
  CardHeader,
  Image,
  Box,
  Heading,
  Paragraph
} from "grommet";
import React from "react";
import { Link } from "react-router-dom";
import seaweed from "../../assets/images/sea-weed-1.jpeg";
import blurredGreen from "../../assets/images/blurred-green-2.jpg";

import styled from "styled-components";

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

const Card = ({ title, description, toUrl }) => {
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
        <Image
          src={seaweed}
          height="240"
          fit="cover"
          style={{
            borderRadius: "19px 19px 0 0"
          }}
        ></Image>
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
