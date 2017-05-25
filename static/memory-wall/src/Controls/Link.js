/**
 * Created by Guido on 19.05.2017.
 */

import React from "react";
// import './control.css'

const ce = React.createElement;

class LinkEntity {

    constructor(dto) {
        if (dto === null) return;

        this.url = dto.url;
        this.text = dto.text !== null ? dto.text : dto.url;
        this.tooltip = dto.tooltip !== null ? dto.tooltip : dto.text;
        this.source = dto.source;
    }


    get isExternal() {
        // console.log(this.source);
        return this.source === '_blank';
    }
}

class Link extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let linkText = ce('span', {
            key: this.props.entity.text + '-text',
            className: 'link-text'
        }, this.props.entity.text);
        let body = [linkText];
        if (this.props.entity.isExternal) {
            let icon = ce('i', {
                key: this.props.entity.text + '-external-icon',
                className: 'fa fa-external-link',
                'aria-hidden': true
            }, null);
            body.push(icon);
        }
        return ce('a'
            , {
                key: this.props.entity.text + '-a', className: 'link', href: this.props.entity.url
                , title: this.props.entity.tooltip, target: this.props.entity.source
            }
            , body);
    }

}
Link.Entity = LinkEntity;

export default Link;