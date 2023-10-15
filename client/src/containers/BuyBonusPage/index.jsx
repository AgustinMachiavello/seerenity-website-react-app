import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Page,
  RangeInput,
  Text
} from "grommet";
import { useParams } from "react-router-dom";
import { convert } from "ethereumjs-units";

import { useEth } from "@contexts/EthContext";

import ProjectContractJson from "../../contracts/ProjectContract.json";
import { CONTRACT_ADDRESSES } from "../../contract-constants";
import Header from "@components/Header";
import Card from "@components/Card";
import { convertEurosToEth } from "../../utils";

const BuyBonusPage = () => {
  // Hooks
  const { state } = useEth();

  // States
  const [project, setProject] = useState();
  const [tonsToBuy, setTonsToBuy] = useState(1.0);
  console.warn("project", project);

  // Data
  const userAccount = state.accounts?.[0];
  const tonPrice = project?.creditPrice || 0;
  const price = tonPrice * tonsToBuy;
  let { projectId } = useParams();

  const fetchProject = useCallback(
    async (id) => {
      const projectContract = new state.web3.eth.Contract(
        ProjectContractJson.abi,
        CONTRACT_ADDRESSES.project
      );

      await projectContract.methods
        .getProject(1)
        .call()
        .then((p) => setProject(p));
    },
    [state]
  );

  // Effects
  useEffect(() => {
    if (state.web3?.eth && projectId) {
      fetchProject(projectId);
    }
  }, [state, projectId]);

  // Handlers
  const handlePurchaseCredits = async () => {
    try {
      const projectContract = new state.web3.eth.Contract(
        ProjectContractJson.abi,
        CONTRACT_ADDRESSES.project
      );
      const creditPriceInEth = convertEurosToEth(price);
      const totalWeiRequired = convert(
        creditPriceInEth.toString(),
        "eth",
        "wei"
      );
      await projectContract.methods.purchaseCredits(projectId, tonsToBuy).send({
        from: userAccount,
        value: totalWeiRequired
      });
    } catch (error) {
      console.error("Error al comprar créditos:", error);
    }
  };

  return (
    <Page>
      <Header />
      <Box pad="large">
        <Box>
          <Heading level={2}>{project?.projectName || "Not found"}</Heading>
          <Text>${tonPrice} each 1ton</Text>
          <Text>Available credits: {project?.creditsAvailable}</Text>
        </Box>
        <Box>
          You are buying: {tonsToBuy} for €{price.toFixed(2).toLocaleString()}{" "}
          (ETH: {convertEurosToEth(price)})
        </Box>
        <Box>
          <Form
            validate="blur"
            onReset={(event) => console.log(event)}
            onSubmit={({ value }) => console.log("Submit", value)}
          >
            <Box>
              <FormField>
                <RangeInput
                  value={tonsToBuy}
                  onChange={(e) => setTonsToBuy(parseFloat(e.target.value))}
                ></RangeInput>
              </FormField>
            </Box>
          </Form>
        </Box>
        <Box>
          <Button label="Buy" onClick={handlePurchaseCredits}></Button>
        </Box>
      </Box>
    </Page>
  );
};

export default BuyBonusPage;
