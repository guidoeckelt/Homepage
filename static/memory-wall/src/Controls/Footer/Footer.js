/**
 * Created by Guido on 19.05.2017.
 */

import React from "react";
import ReactDOM from "react-dom";
import "../../app.css";

const ce = React.createElement;

class Footer extends React.Component {

    render() {
        const body = [];
        return ce('div', {'key': 'app-Footer', className: 'Footer-root'}, body);
    }

}

ReactDOM.render(
    ce(Footer, null, null),
    document.getElementById('app-footer')
);
export default Footer;