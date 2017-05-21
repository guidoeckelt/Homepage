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

}

class Link extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let linkText = ce('span', {key: '', className: 'link-text'}, this.props.entity.text);
        return ce('a'
            , {
                key: '', className: 'link', href: this.props.entity.url
                , title: this.props.entity.tooltip, target: this.props.entity.source
            }
            , [linkText]);
    }

}
Link.Entity = LinkEntity;

export default Link;