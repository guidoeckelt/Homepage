/**
 * Created by Guido on 19.05.2017.
 */

import React from "react";
import "./app.css";

const ce = React.createElement;

class Footer extends React.Component {

    render() {
        const body = [];
        return ce('footer', {'key': 'app-footer', className: 'app-footer'}, body);
    }

}

export default Footer;