/**
 * Created by Guido on 19.05.2017.
 */

import React from "react";
import ReactDOM from "react-dom";
import Routes from "../../HTTP/Routes";
import FooterLink from "./FooterLink";

const ce = React.createElement;

class Footer extends React.Component {

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
        // console.log('loading Footer-Links');
        this.requestLinks();
    }

    requestLinks() {
        // console.log('requesting Footer-Links');
        $.get(Routes.links.footer, (function (dto) {
            // console.dir(dto);
            let entities = dto.map(function (e) {
                return new FooterLink.Entity(e);
            });
            this.setState({links: entities});
        }).bind(this));
    }

    render() {
        let footerLinks = this.state.links.map(function (e, i) {
            return ce(FooterLink, {entity: e, index: i}, null);
        });
        let linksRow = ce('div', {'key': 'footer-links-row', className: 'row'}, footerLinks);
        let linkContainer = ce('div', {'key': 'footer-links-row-container', className: 'container'}, linksRow);
        let copyrightContainer = ce('div', {
            'key': 'footer-copyright-container',
            className: 'container'
        }, ['© Copyright 2017']);
        let copyright = ce('div', {'key': 'footer-copyright', className: 'footer-copyright'}, copyrightContainer);
        return ce('div', {'key': 'app-footer', className: 'footer-root'}, [linkContainer, copyright]);
    }

}

ReactDOM.render(
    ce(Footer, null, null),
    document.getElementById('app-footer')
);
export default Footer;