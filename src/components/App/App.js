import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../Header";
import Home from "../Home";
import Retroformats from "../Retroformats";
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/retro-formats" component={Retroformats} exact />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
