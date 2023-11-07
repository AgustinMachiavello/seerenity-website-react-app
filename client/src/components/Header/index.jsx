import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

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
      icon={<Image src={logo} fit="cover" height="64" />}
    ></Anchor>

    <Nav direction="row">
      <Anchor label="Proyectos" href="/projects" />
    </Nav>
  </HeaderGroomet>
);

export default Header;
