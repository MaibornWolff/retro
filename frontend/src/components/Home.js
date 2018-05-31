import React from "react";

import { Board } from "./Board";
import "../styles/Home.css";

export const Home = () => (
  <div id="home" className="container-fluid">
    <button
      id="addListBtn"
      className="btn btn-success float-left"
      type="button"
    >
      Add List
    </button>
    <Board />
  </div>
);
