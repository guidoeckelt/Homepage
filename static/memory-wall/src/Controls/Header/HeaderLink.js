/**
 * Created by Guido on 20.05.2017.
 */

import React from "react";
import Link from "../Link";
import DropdownButton from "../DropdownButton";
import {Util} from "../../Util";

const ce = React.createElement;

class HeaderLinkEntity
    extends Link.Entity {

    constructor(dto) {
        super(dto);
        if (dto === null) return;

        this.sublinks = [];
        if (dto.links) {
            this.sublinks = dto.links.map(function (e) {
                return new HeaderLinkEntity(e);
            });
        }

    }

    get isLink() {
        return Util.isUrlValid(this.url);
    }

    get isLinkGroup() {
        return this.sublinks.length > 0;
    }

}

class HeaderLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let body = [];
        if (this.props.entity.isLinkGroup) {
            let subklinks = this.props.entity.sublinks.map(function (e) {
                return ce(HeaderLink, {entity: e}, null);
            });
            let id = 'dropdown-' + this.props.entity.text;
            let ul = ce('ul'
                , {key: this.props.entity.text + '-sublinks', className: 'dropdown-content', id: id}
                , subklinks);
            let dropdownButton = ce(DropdownButton, {entity: this.props.entity, id: id}, null);
            body = [dropdownButton, ul];
        } else {
            body = ce(Link, {entity: this.props.entity}, null);
        }
        return ce('li', {key: this.props.entity.text + '-list-item', className: 'b'}, body);
        // let body = [];
        // if (this.props.entity.isLinkGroup) {
        //     let caret = ce('span', {key: this.props.entity.text + '-caret', className: 'caret'}, null);
        //     let linkText = ce('span', {
        //         key: this.props.entity.text + '-text',
        //         className: 'link-text'
        //     }, this.props.entity.text);
        //     let a = ce('a'
        //         , {
        //             key: this.props.entity.text + '-link', className: 'dropdown-toggle link'
        //             , href: this.props.entity.url, target: this.props.entity.source
        //             , title: this.props.entity.tooltip
        //             , 'data-toggle': 'dropdown', role: 'button'
        //             , 'aria-haspopup': true, 'aria-expanded': false
        //         }
        //         , [linkText, caret]);
        //     let subklinks = this.props.entity.sublinks.map(function (e) {
        //         return ce(HeaderLink, {entity: e}, null);
        //     });
        //     let ul = ce('ul'
        //         , {key: this.props.entity.text + '-sublinks', className: 'dropdown-menu'}
        //         , subklinks);
        //     body = [a, ul];
        // } else {
        //     body = ce(Link, {entity: this.props.entity}, null);
        // }
        // return ce('li', {key: this.props.entity.text + '-list-item', className: ''}, body);
    }

}
HeaderLink.Entity = HeaderLinkEntity;

export default HeaderLink;