import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/alguitas.png";

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
  <HeaderGroomet background="brand" pad="large" style={{ height: "10vh" }}>
    <Anchor
      href="/"
      label="Seerenity"
      icon={<Image src={logo} fit="cover" height={30} />}

      // icon={
      //   <div style={{ display: "flex", alignItems: "center" }}>
      //     <Image src={logo} fit="cover" height="40" />
      //     <div style={{ margin: "0 20px 0 0" }}></div>
      //     <Image src={seerenityText} height={21}></Image>
      //   </div>
      // }
    ></Anchor>

    <Nav direction="row">
      <Anchor label="Proyectos" href="/projects" />
    </Nav>
  </HeaderGroomet>
);

export default Header;
