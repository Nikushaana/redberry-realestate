import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ShareStatesChild } from "./components/contexts/sharedStates";
import { BrowserRouter as Router } from "react-router-dom";
import EstateContext from "./components/contexts/EstateAxios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShareStatesChild>
      <EstateContext>
        <Router>
          <App />
        </Router>
      </EstateContext>
    </ShareStatesChild>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
