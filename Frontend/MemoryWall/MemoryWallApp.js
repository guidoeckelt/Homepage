import React from "react";
import ReactDOM from "react-dom";
import Sammy from "sammy";
import "jquery";
import Gallery from "../Common/Gallery/Gallery";
import "materialize-css/extras/noUiSlider/nouislider";
import "materialize-css/extras/noUiSlider/nouislider.css";
// import "./memorywallapp.css";
const ce = React.createElement;

let url_pre = '/Homepage/MemoryWall';
let url_pre_2 = '/Homepage/MemoryWall/#';
let api_pre = '/Homepage/api/';
let test_pre = '/Homepage/backend/memory-wall/';

class MemoryWallApp extends React.Component {

    static run() {
        let self = this;
        Sammy('#root', function () {

            this.get(url_pre + '[/]', function () {
                this.app.runRoute('get', url_pre_2 + 'test');
            });
            this.get(url_pre + '[/#]', function () {
                this.app.runRoute('get', url_pre_2 + 'test');
            });
            this.get(url_pre_2 + '/moment/:moment/image/:image', function () {// context is a Sammy.EventContext
                let moment_id = this.params.moment;
                let image_id = this.params.image;
                self.show('moment', moment_id, image_id);
            });
            this.get(url_pre_2 + 'test', function () {// context is a Sammy.EventContext
                // this.$element(); //Sammy($element, function...
                // $.get(pre2+'moments/1/image/image1.jpg', function(data){
                //     console.dir();
                // });
                // $.get(api_pre+'Header-links/', function(data){
                //     console.log(data);
                // });
            });
        }).run();
    }

    show(entity_type, entity_id, image_id) {
        $.get(api_pre + 'memorywall/' + entity_type + '/' + entity_id + '/image/' + image_id, function (data) {
            console.log(data);
        });
    }

    render() {
        let gallery = ce(Gallery, {}, null);
        return ce('div', {key: 'app-root', className: 'app'}, [gallery]);
    }
}

$(document).ready(function () {
    MemoryWallApp.run();
});

ReactDOM.render(
    ce(MemoryWallApp, null, null),
    document.getElementById('app-main')
);
export default MemoryWallApp;
