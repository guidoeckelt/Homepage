/**
 * Created by Guido on 20.05.2017.
 */

import React from "react";
import Link from "../Link";
import DropdownButton from "../DropdownButton";
import {Util} from "../../Util";

const ce = React.createElement;

class LinkGroupEntity
    extends Link.Entity {

    constructor(dto) {
        super(dto);
        if (dto === null) return;

        this.sublinks = [];
        if (dto.links) {
            this.sublinks = dto.links.map(function (e) {
                return new LinkGroupEntity(e);
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
    }

}
HeaderLink.Entity = LinkGroupEntity;

export default HeaderLink;