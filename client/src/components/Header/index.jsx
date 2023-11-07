import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/alguitas.png";
import seerenityText from "../../assets/images/seerenity-text-green.png";

import {
  Anchor,
  Box,
  Header as HeaderGroomet,
  Menu,
  ResponsiveContext,
  Image,
  Avatar,
  Nav
} from "grommet";

const Header = ({}) => (
  <HeaderGroomet background="brand" pad="small">
    <Anchor
      href="/"
      // icon={<Image src={logo} fit="cover" height={30} />}

      icon={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src={logo} fit="cover" height="40" />
          <div style={{ margin: "0 20px 0 0" }}></div>
          <Image src={seerenityText} height={21}></Image>
        </div>
      }
    ></Anchor>

    <Nav direction="row">
      <Anchor label="Inicio" href="/" />
      <Anchor label="Proyectos" href="/projects" />
    </Nav>
  </HeaderGroomet>
);

export default Header;
