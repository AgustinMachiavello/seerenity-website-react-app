import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grommet } from "grommet";

import { EthProvider } from "./contexts/EthContext";
import Home from "./containers/Home";
import ProjectsListPage from "./containers/ProjectsListPage";

// const theme = {
//   global: {
//     font: {
//       family: "Roboto",
//       size: "18px",
//       height: "20px"
//     }
//   }
// };

function App() {
  return (
    <EthProvider>
      <Grommet>
        <div id="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="projects" element={<ProjectsListPage />} />
            </Routes>
          </Router>
        </div>
      </Grommet>
    </EthProvider>
  );
}

export default App;
