/**
 * Created by Guido on 19.05.2017.
 */

import React from "react";
import ReactDOM from "react-dom";
import "jquery";
import Routes from "../../HTTP/Routes";
import HeaderLink from "./HeaderLink";
import HeaderIconBox from "./HeaderIconBox";
// import "../../app.css";

const ce = React.createElement;

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links: []
        };

    }

    componentWillMount() {
        this.load();
    }

    load() {
        // console.log('loading Header-Links');
        this.requestLinks();
    }

    requestLinks() {
        // console.log('requesting Header-Links');
        $.get(Routes.links.header, (function (dto) {
            // console.dir(dto);
            let entities = dto.map(function (e) {
                return new HeaderLink.Entity(e);
            });
            this.setState({links: entities});
        }).bind(this));
    }

    render() {
        let headerIconBox = ce(HeaderIconBox, {}, null);
        let headerLinks = this.state.links.map(function (e) {
            return ce(HeaderLink, {entity: e}, null);
        });
        let linkUl = ce('ul', {
            key: 'header-navbar-link-list',
            className: 'right hide-on-med-and-down',
            id: 'nav-mobile'
        }, headerLinks);
        let container = ce('div', {key: 'header-container', className: 'nav-wrapper'}, [headerIconBox, linkUl]);
        return ce('nav', {key: 'header-nav', className: 'b'}, container);
    }

}

ReactDOM.render(
    ce(Header, null, null),
    document.getElementById('app-header')
);
export default Header;