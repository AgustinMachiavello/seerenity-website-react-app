import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grommet } from "grommet";

import { EthProvider } from "./contexts/EthContext";
import Home from "./containers/Home";
import ProjectsListPage from "./containers/ProjectsListPage";
import ProjectDetailsPage from "@containers/ProjectPage";

const theme = {
  name: "my theme",
  rounding: 4,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "#7700cc",
        light: "#1e3799"
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF"
      },
      "background-back": {
        light: "#EEEEEE",
        dark: "#111111"
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF"
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111"
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333"
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000"
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444"
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666"
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC"
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning"
    },
    font: {
      family: "Helvetica"
    },
    active: {
      background: "active-background",
      color: "active-text"
    },
    hover: {
      background: "active-background",
      color: "active-text"
    },
    selected: {
      background: "selected-background",
      color: "selected-text"
    }
  },
  chart: {},
  diagram: {
    line: {}
  },
  meter: {},
  tip: {
    content: {
      background: {
        color: "background"
      },
      elevation: "none",
      round: false
    }
  }
};

function App() {
  return (
    <EthProvider>
      <Grommet theme={theme}>
        <div id="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="projects/:projectId"
                element={<ProjectDetailsPage />}
              />
              <Route path="projects" element={<ProjectsListPage />} />
            </Routes>
          </Router>
        </div>
      </Grommet>
    </EthProvider>
  );
}

export default App;
