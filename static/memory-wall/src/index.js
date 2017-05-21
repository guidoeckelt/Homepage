import React from "react";
import ReactDOM from "react-dom";
import App from "./MemoryWallApp";
import "./base.css";
const ce = React.createElement;

ReactDOM.render(
    ce(App, null, null),
    document.getElementById('root')
);
