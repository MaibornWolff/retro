import React from "react";

import {Board} from "../Board";
import "./Home.css";

const Home = () => (
  <div id="home" className="container-fluid">
    <button id="addListBtn" className="btn btn-success float-left" type="button">
      Add List
    </button>
    <Board/>
  </div>
);

export {Home};