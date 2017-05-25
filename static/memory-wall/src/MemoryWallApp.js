import React from "react";
import Sammy from "sammy";
import jq from "jquery";
import AppHeader from "./Header";
import AppFooter from "./Footer";
import Gallery from "./Gallery/Gallery";
import "./app.css";
const ce = React.createElement;

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
                // jq.get(pre2+'moments/1/image/image1.jpg', function(data){
                //     console.dir();
                // });
                // jq.get(api_pre+'header-links/', function(data){
                //     console.log(data);
                // });
            });
        }).run();
    }

    show(entity_type, entity_id, image_id) {
        jq.get(api_pre + 'memorywall/' + entity_type + '/' + entity_id + '/image/' + image_id, function (data) {
            console.log(data);
        });
    }

    render() {
        let header = ce(AppHeader, {}, null);
        let gallery = ce(Gallery, {}, null);
        let main = ce('main', {key: 'app-main', className: 'app-main'}, gallery);
        let footer = ce(AppFooter, {}, null);
        return ce('div', {key: 'app-root', className: 'app'}, [header, main, footer]);
    }
}
let url_pre = '/Homepage/MemoryWall';
let url_pre_2 = '/Homepage/MemoryWall/#';
let api_pre = '/Homepage/api/';
let test_pre = '/Homepage/backend/memory-wall/';

jq(document).ready(function () {
    MemoryWallApp.run();
});

export default MemoryWallApp;
