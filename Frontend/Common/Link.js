/**
 * Created by Guido on 19.05.2017.
 */

import React from "react";
import "jquery";
import "materialize-css/bin/materialize";
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

    componentDidMount() {
        let config = {
            delay: 50,
            position: 'bottom'
        };
        let selector = '.tooltipped';
        $(selector).tooltip(config);
    }

    render() {
        let body;
        // let text = this.props.entity.text;
        let text = ce('span', null, this.props.entity.text);
        if (this.props.entity.isExternal) {
            let icon = ce('i', {
                key: this.props.entity.text + '-external-icon',
                className: 'material-icons right',
                'aria-hidden': true
            }, 'open_in_new');
            // body = ce('span',null, [text, icon]);
            body = [text, null];
        } else {
            body = [text];
        }
        return ce('a'
            , {
                key: this.props.entity.text + '-a', id: this.props.entity.text + '-a', className: 'link .tooltipped'
                , href: this.props.entity.url, target: this.props.entity.source,
                'data-tooltip': this.props.entity.tooltip
            }
            , body);
    }

}
Link.Entity = LinkEntity;

export default Link;