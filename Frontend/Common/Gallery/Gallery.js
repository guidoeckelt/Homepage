/**
 * Created by Guido on 09.05.2017.
 */

import React from "react";
import "./Gallery.css";
import Image from "./Image";
const ce = React.createElement;

class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentWillMount() {
        this.load();
        // window.setTimeout((function(){ this.load()}).bind(this), 2000);
    }

    load() {
        // console.log('loading Images');
        let images = this.requestImages();
        // this.state = {images: images};
        this.setState({images: images});
    }

    requestImages() {
        // console.log('requesting Images');
        return (
            [
                {
                    url: '/Homepage/backend/memory-wall/moments/1/image/image1.jpg',
                    name: '1'
                }
                ,
                {
                    url: '/Homepage/backend/memory-wall/moments/1/image/image2.jpg',
                    name: '2'
                }
                ,
                {
                    url: '/Homepage/backend/memory-wall/moments/1/image/image3.png',
                    name: '3'
                }
            ]
        );
        // return (
        //     [
        //         {
        //             url: '/Homepage/api/memorywall/person/1/image/1',
        //             name: '1'
        //         }
        //         ,
        //         {
        //             url: '/Homepage/api/memorywall/person/1/image/2',
        //             name: '2'
        //         }
        //     ]
        // );
    }

    render() {
        const images = this.state.images.map(function (e, i) {
            return ce(Image, {key: 'image-' + i, url: e.url, name: e.name}, null);
        });
        let imageUl = ce('ul', {key: 'gallery-image-list', className: 'image-list'}, images);
        let previousButton = ce('button', {key: 'previous-button', className: 'list-button previous'}, 'P');
        let nextButton = ce('button', {key: 'next-button', className: 'list-button next'}, 'N');
        let hud = ce('div', {key: 'hud', className: 'hud'}, [previousButton, nextButton]);
        return ce('div', {key: 'gallery-root', className: 'gallery'}, [imageUl, hud]);
    }

}

export default Gallery;

