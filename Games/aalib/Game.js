import Util from './Util';
import GameObject from './GameObject';
import Renderer from './Graphic/Renderer';

class Game{

  constructor(canvasContainer){

    this._interpreteParameter(canvasContainer);
    if(null == this._canvas) this._canvas = this._createCanvas();
    this._hud = this._createHud();
    this._process = null;
    this._renderer = new Renderer(this);
    this._gameObjects = new Array();

    this._addEventListenerToCanvas();
    this._appendCanvas();
    this._bindContextToStatics();
  }
// Game - Private Functions
  _interpreteParameter(canvasContainer){
    if(canvasContainer instanceof String || typeof canvasContainer === 'string'){
      this._canvasContainer = document.getElementById(canvasContainer);
    }else if(canvasContainer instanceof HTMLCanvasElement){// || canvasContainer.nodeName.toLowerCase() === 'canvas'){
      this._canvas = canvasContainer;
      this._canvasContainer = this._canvas.parent;
    }else if(canvasContainer instanceof Element || typeof canvasContainer === 'Element'){
      this._canvasContainer = canvasContainer;
    }else{
      this._canvasContainer = document.body;
    }
  }
  _createCanvas(){
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.style.cursor = 'none';
    canvas.width = 1200;
    canvas.height = 800;
    return canvas;
  }
  _addEventListenerToCanvas(){

  }
  _appendCanvas(){
    if(this._canvasContainer==document.body&&this._canvasContainer.childNodes.length>0){
      this._canvasContainer.insertBefore(this._canvas,this._canvasContainer.childNodes[0]);
    }else{
      this._canvasContainer.appendChild(this._canvas);
    }
  }
  _createHud(){

  }
  _bindContextToStatics(){
  
  }

  _gameloop(){

  }
  
// Game - Public Functions
  start(){
    this._process = window.setInterval(this._gameLoop.bind(this), 20);
    this._renderer.start();
    this._canvas.focus();
  }
  stop(){
    window.clearInterval(this._process);
    this._renderer.stop();
  }

// Game - Static Functions
  _add(gameObject){
    if(!(gameObject instanceof GameObject)){
      // console.dir(gameObject);
    }
    // console.dir(gameObject);
    this._gameObjects.push(gameObject);
  }
  _remove(gameObject){
    if(!(gameObject instanceof GameObject)){
      // console.dir(gameObject);
    }
    let list = this._gameObjects;
    list.splice(list.indexOf(gameObject),1);
  }
  get canvas(){ return this._canvas; }
  get gameObjects(){ return this._gameObjects; }

}

export default Game;