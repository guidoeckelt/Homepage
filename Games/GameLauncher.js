import React from "react";
import ReactDOM from "react-dom";
import Sammy from "sammy";
import "jquery";
import "materialize-css/extras/noUiSlider/nouislider";
import "materialize-css/extras/noUiSlider/nouislider.css";
const ce = React.createElement;

let url_pre = '/Homepage/Game';
let api_pre = '/Homepage/api/';
let static_pre = '/Homepage/static/';
let url_pre_2 = '/Homepage/MemoryWall/#';
let test_pre = '/Homepage/backend/memory-wall/';

class GameLauncher extends React.Component {

    constructor(){
      super();
      self = this;
      $.get(api_pre + 'games/',function(response){
        self.setState({ games : response});
      });
      this.launch.bind(this);
      this._IsGameAvailable.bind(this);
      this._loadScript.bind(this);
      this.init();
    }

    init() {
        let self = this;
        window.onload = function(){
          console.log("sammy loading");
          Sammy('#root', function () {
              this.get(url_pre, function () {
                console.log('No Game Selected');
              });
              this.get(url_pre + '/', function () {
                console.log('No Game Selected');
              });
              this.get(url_pre + '/#', function () {
                console.log('No Game Selected');
              });
              this.get(url_pre + '[/]#:game', function () {
                var gameName = this.params.game;
                console.log(gameName+' Selected');
                if(self._IsGameAvailable(gameName)){
                  self.launch(gameName);
                }
              });
          }).run();
        };
    }

    launch(gameName){
      console.log(gameName+' Launched');
      this.setState({loading : true});
      var location = this.state.games.find(function(game){
        return game.name === gameName;
      });
      _loadScript(location);
      // var game = new Object();
      // game.start();

    }
    _loadScript(location){
      var script = document.createElement('script');
      script.src = static_pre + 'dist/' + location;
      script.onload = function(){
        this.setState({loading : false});
      };
    }

    _IsGameAvailable(gameName){
      for(gameTokenKey of this.state.games){
        if(gameTokenKey.name === gameName){
          return true;
        }
      }
      return false;
    }

    render() {
        return ce('div', {key: 'app-root', className: 'app'}, ['GameLauncher']);
    }
}

ReactDOM.render(
    ce(GameLauncher, null, null),
    document.getElementById('app-main')
);
export default GameLauncher;
