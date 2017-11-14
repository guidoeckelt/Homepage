import React from "react";
import ReactDOM from "react-dom";

import GameLauncher from "./GameLauncher";
const ce = React.createElement;

ReactDOM.render(
    ce(GameLauncher, null, null),
    document.getElementById('app-main')
);