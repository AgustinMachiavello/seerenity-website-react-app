import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

import {
  Anchor,
  Box,
  Header as HeaderGroomet,
  Menu,
  ResponsiveContext,
  Image
} from "grommet";

const Header = ({}) => (
  <HeaderGroomet
    sticky="scrollup"
    background="light-1"
    pad="medium"
    height="xsmall"
  >
    <Link to="/projects">
      <Anchor
        icon={<Image src={logo} fit="cover" height="64" />}
        label="Seerenity"
      />
    </Link>

    <ResponsiveContext.Consumer>
      {(size) =>
        size === "small" ? (
          <Box justify="end">
            <Menu
              a11yTitle="Navigation Menu"
              dropProps={{ align: { top: "bottom", right: "right" } }}
              //   icon={<MenuIcon color="brand" />}
              items={[
                {
                  label: <Box pad="small">Projects</Box>,
                  href: "/projects"
                },
                {
                  label: <Box pad="small">FAQs</Box>,
                  href: "/faqs"
                }
              ]}
            />
          </Box>
        ) : (
          <Box justify="end" direction="row" gap="medium">
            <Anchor href="/projects" label="Projects" />
            <Anchor href="/faws" label="FAQs" />
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  </HeaderGroomet>
);

export default Header;
