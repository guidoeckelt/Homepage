/**
 * Created by Guido on 09.05.2017.
 */

import React from "react";
import "./Gallery.css";
const ce = React.createElement;

class Image extends React.Component {

    render() {
        let imageTag = ce('img', {
            key: 'image-tag', className: 'image-tag',
            src: this.props.url, alt: this.props.name
        }, null);
        return ce('div', {key: '', className: 'image'}, imageTag);
    }

}

export default Image;