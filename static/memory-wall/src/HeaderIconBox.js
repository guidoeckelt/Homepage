/**
 * Created by Guido on 20.05.2017.
 */

import React from "react";

const ce = React.createElement;

class HeaderIconBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let sr_only_text = ce('span', {key: 'header-mobile-burger-sr', className: 'sr-only'}, 'Toggle Navigation');
        let bar1 = ce('span', {key: 'header-mobile-burger-bar-1', className: 'icon-bar'}, null);
        let bar2 = ce('span', {key: 'header-mobile-burger-bar-2', className: 'icon-bar'}, null);
        let bar3 = ce('span', {key: 'header-mobile-burger-bar-3', className: 'icon-bar'}, null);
        let navbarToggle = ce('button'
            , {
                key: 'header-navbar-toggle', className: 'navbar-toggle collapsed'
                , 'data-target': '#header-links', 'data-toggle': 'collapse'
                , 'aria-expanded': 'false', type: 'button'
            }
            , [bar1, bar2, bar3, sr_only_text]);
        let icon = ce('img'
            , {
                key: 'header-icon-image', className: 'brand-img'
                , src: '/Homepage/static/logo/logo.png', alt: 'logo'
            }
            , null);
        let iconLink = ce('a', {
            key: 'header-icon-link',
            className: 'navbar-brand  brand-padding',
            href: '/Homepage/'
        }, icon);
        return ce('div', {key: 'header-icon-box', className: 'navbar-header'}, [navbarToggle, iconLink]);
    }

}

export default HeaderIconBox;