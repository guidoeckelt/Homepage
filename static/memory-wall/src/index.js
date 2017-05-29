import React from "react";
import ReactDOM from "react-dom";
import Header from "./Controls/header/Header";
import Footer from "./Controls/footer/Footer";
import App from "./MemoryWallApp";
import "./base.css";
const ce = React.createElement;

ReactDOM.render(
    ce(Header, null, null),
    document.getElementById('app-header')
);
ReactDOM.render(
    ce(Footer, null, null),
    document.getElementById('app-footer')
);

ReactDOM.render(
    ce(App, null, null),
    document.getElementById('app-main')
);

