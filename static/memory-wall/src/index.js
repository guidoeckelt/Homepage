import React from "react";
import ReactDOM from "react-dom";
import App from "./MemoryWallApp";
const ce = React.createElement;

ReactDOM.render(
    ce(App, null, null),
    document.getElementById('app-main')
);

