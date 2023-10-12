import React, { useState, useEffect } from "react";
import { Page } from "grommet";

import { useEth } from "@contexts/EthContext";

const ProjectsListPage = () => {
  // States
  const eth = useEth();

  console.warn("eth", eth);

  useEffect(() => {}, []);

  return <Page>Pl page</Page>;
};

export default ProjectsListPage;
