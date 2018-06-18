import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import "../node_modules/bulma/css/bulma.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
