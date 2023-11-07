import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/alguitas.png";
import seerenityTextDark from "../../assets/images/seerenity-text.png";
import seerenityTextLight from "../../assets/images/seerenity-text-green.png";

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

const Header = ({ theme = "light" }) => {
  const isLight = theme === "light";
  return (
    <HeaderGroomet pad="small" style={{ backgroundColor: "transparent" }}>
      <Anchor
        href="/"
        // icon={<Image src={logo} fit="cover" height={30} />}

        icon={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} fit="cover" height="40" />
            <div style={{ margin: "0 20px 0 0" }}></div>
            <Image
              src={isLight ? seerenityTextLight : seerenityTextDark}
              height={21}
            ></Image>
          </div>
        }
      ></Anchor>

      <Nav direction="row">
        <Anchor label="Inicio" href="/" color={isLight ? "light-1" : "brand"} />
        <Anchor
          label="Proyectos"
          href="/projects"
          color={isLight ? "light-1" : "brand"}
        />
      </Nav>
    </HeaderGroomet>
  );
};

export default Header;
