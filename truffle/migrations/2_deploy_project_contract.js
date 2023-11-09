const ProjectContract = artifacts.require("ProjectContract");

/**
  uint256 projectId; // Autoincremental
  string projectName;
  string description;
  uint256 yearlyTonsRemovalPotential;
  uint256 creditsAvailable;
  uint256 creditPrice;
  address ownerAddress;
 */

const fakeProjectsInfo = [
  {
    title: "Costa del Maresme",
    description:
      "El proyecto de Posidonia oceanica en las costas de Cataluña representa un esfuerzo integral para abordar los desafíos del cambio climático y la conservación marina en una de las regiones más hermosas del Mediterráneo"
  },
  {
    title: "Restauración de Praderas de Posidonia en la Costa Brava",
    description:
      "Proyecto de restauración de praderas de Posidonia en la Costa Brava para proteger este ecosistema marino crítico y promover la biodiversidad."
  },

  {
    title: "Monitorización de Posidonia en el Parque Natural del Montgrí",
    description:
      "Programa de monitorización de las praderas de Posidonia en el Parque Natural del Montgrí para comprender mejor su salud y estado de conservación."
  },
  {
    title: "Educación sobre la Importancia de Posidonia en Tarragona",
    description:
      "Iniciativa educativa para concienciar a la comunidad de Tarragona sobre la importancia de la Posidonia oceanica en la protección de la costa y la fauna marina."
  },
  {
    title: "Restauración de Posidonia en el Mar Menor de Girona",
    description:
      "Proyecto de restauración de praderas de Posidonia en el Mar Menor de Girona para combatir la erosión costera y mejorar la calidad del agua."
  },
  {
    title: "Protección de Posidonia en las Islas Medas",
    description:
      "Programa de protección y conservación de Posidonia en las aguas de las Islas Medas para preservar este hábitat crítico de especies marinas."
  },
  {
    title: "Investigación Científica de Posidonia en la Costa Dorada",
    description:
      "Investigación científica centrada en el estudio de las praderas de Posidonia en la costa de la Costa Dorada para entender su papel en la mitigación del cambio climático."
  },
  {
    title: "Restauración de Posidonia en el Delta del Ebro",
    description:
      "Proyecto de restauración de praderas de Posidonia en el Delta del Ebro para proteger y mejorar la salud de este ecosistema marino único."
  },
  {
    title: "Sensibilización sobre Posidonia en Barcelona",
    description:
      "Campaña de sensibilización en Barcelona para promover la protección de Posidonia y reducir el anclaje de embarcaciones en las praderas."
  },
  {
    title: "Conservación de Posidonia en la Costa del Garraf",
    description:
      "Programa de conservación de Posidonia en la Costa del Garraf para preservar este recurso vital y promover la sostenibilidad marina en la región."
  },
  {
    title: "Restauración de Posidonia en las Calas de Sitges",
    description:
      "Iniciativa de restauración de praderas de Posidonia en las calas de Sitges para proteger estas zonas de baño y su biodiversidad asociada."
  }
];

const fakeProjectsList = fakeProjectsInfo.map((info) => [
  info.title,
  info.description,
  500,
  200,
  15,
  "0x5725c6383fba0E489157eF693FeE7bc3CeF8aEDe"
]);

module.exports = function (deployer) {
  deployer.deploy(ProjectContract).then(async () => {
    const projectInstance = await ProjectContract.deployed();

    for (let i = 0; i < fakeProjectsList.length; i++) {
      await projectInstance.createProject(...fakeProjectsList[i]);
    }
  });
};
