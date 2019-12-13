import React from "react";
import * as ReactDOM from "react-dom";
import { StateProvider } from "./state";
import "./styles/app.scss";
import { App } from './app';


const Index = () => {
  
  return (
    <StateProvider>
      <App />
    </StateProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
