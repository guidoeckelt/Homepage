/**
 * Created by Guido on 04.06.2017.
 */

import React from "react";
import Link from "../Link";
import {Util} from "../Util";

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

class FooterLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let element = null;
        if (this.props.entity.isLinkGroup) {
            let sublinks = this.props.entity.sublinks.map(function (e) {
                return ce(FooterLink, {entity: e}, null);
            });
            let sublinksUl = ce('ul'
                , {key: this.props.entity.text + '-sublinks', className: 'b',}
                , sublinks);
            let title = ce('h5', {
                key: this.props.entity.text + '-list-group-title',
                className: 'white-text'
            }, this.props.entity.text);
            let body = [title, sublinksUl];
            let className = 'col s2';
            // if(this.props.index === 0){
            //     className += ' offset-s1';
            // }
            element = ce('div', {key: this.props.entity.text + '-list-group-col', className: className}, body);
        } else {
            let link = ce('a', {
                key: this.props.entity.text + '-a', className: 'link grey-text text-lighten-3',
                href: this.props.entity.url, title: this.props.entity.tooltip, target: this.props.entity.source
            }, this.props.entity.text);
            element = ce('li', {key: this.props.entity.text + '-list-item', className: 'b'}, link)
        }
        return element;
    }

}
FooterLink.Entity = LinkGroupEntity;

export default FooterLink;
