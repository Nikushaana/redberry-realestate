import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ShareStatesChild } from "./components/contexts/sharedStates";
import RegionsContext from "./components/contexts/regionsCont";
import CitiesContext from "./components/contexts/citiesCont";
import AgentsContext from "./components/contexts/agentsCont";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ShareStatesChild>
      <RegionsContext>
        <CitiesContext>
          <AgentsContext>
            <App />
          </AgentsContext>
        </CitiesContext>
      </RegionsContext>
    </ShareStatesChild>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
