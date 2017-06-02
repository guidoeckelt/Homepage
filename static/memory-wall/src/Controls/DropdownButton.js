/**
 * Created by Guido on 28.05.2017.
 */

import React from "react";
import "jquery";
import "materialize-css/bin/materialize";

const ce = React.createElement;

class DropdownButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.entity.isLinkGroup) {
            let config = {
                hover: false,
                gutter: 0,
                belowOrigin: true,
                alignment: 'right',
                constrainWidth: false
            };
            let selector = '#dropdown-' + this.props.id + '.dropdown-button';
            $(selector).dropdown(config);
        }
    }

    render() {
        let caret = ce('i',
            {
                key: this.props.entity.text + '-dropdown-button-caret', className: 'material-icons right'
            }
            , 'arrow_drop_down');
        return ce('a',
            {
                key: this.props.entity.text + '-dropdown-button',
                className: 'dropdown-button',
                id: 'dropdown-' + this.props.id
                ,
                href: '#',
                'data-activates': this.props.id
            }
            , [this.props.entity.text, caret]);
    }

}

export default DropdownButton;