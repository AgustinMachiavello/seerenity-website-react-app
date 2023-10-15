import { Card as CardGrommet, CardBody, CardHeader, Image, Box } from "grommet";
import React from "react";
import { Link } from "react-router-dom";
import seaweed from "../../assets/images/sea-weed-1.jpeg";

const Card = ({ title, description, toUrl }) => {
  return (
    <Link to={toUrl}>
      <CardGrommet background="light-1">
        <Image src={seaweed} height="240" fit="cover"></Image>
        <Box pad="medium">
          <CardHeader>{title}</CardHeader>
          <CardBody>{description}</CardBody>
        </Box>
      </CardGrommet>
    </Link>
  );
};

export default Card;
