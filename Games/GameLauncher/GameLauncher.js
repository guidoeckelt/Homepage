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
        // console.dir(response);
        self.setState({ games : response});
        // console.dir(self.state);
        self.init();
      });
      this.launch.bind(this);
      this._IsGameAvailable.bind(this);
      this._loadGamePanel.bind(this);
      // this.init();
    }

    init() {
      // console.log("init");
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
          this.get(url_pre + '/#:game/', function () {
            var gameName = this.params.game;
            console.log(gameName+' Selected');
            console.dir(self);
            if(self._IsGameAvailable(gameName)){
              self.launch(game);
            }
          });
        }).run();
      };
    }
    launch(gameName){
      let game = self._getGameByName(gameName);
      console.log(game.name+' Launched');
      this.setState({loading : true, selected: game});
      this._loadGamePanel(game.location);
      // var game = new Object();
      // game.start();

    }

    _loadGamePanel(location){
      var script = document.createElement('script');
      script.src = static_pre + 'dist/' + location;
      script.onload = function(){
        this.setState({loading : false});
      };
    }
    _IsGameAvailable(gameName){
      console.dir();
      for(game of this.state.games){
        if(game.name === gameName){
          return true;
        }
      }
      return false;
    }
    _getGameByName(gameName){
      for(game of this.state.games){
        if(game.name === gameName){
          return game;
        }
      }
    }

    render() {
        return ce('div', {key: 'app-root', className: 'app'}, ['GameLauncher']);
    }
}

export default GameLauncher;
