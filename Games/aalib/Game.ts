import Util from './Util';
import GameObject from './GameObject';
import Renderer from './Graphic/Renderer';

abstract class Game {

    protected _process : number;
    protected _canvasContainer : HTMLElement;
    protected _canvas : HTMLCanvasElement;
    protected _renderer : Renderer;
    protected _hud : any;
    protected _gameObjects : Array<GameObject>;

    constructor(canvasContainer: HTMLElement) {
        this._interpreteParameter(canvasContainer);
        if (null == this._canvas) this._canvas = this._createCanvas();
        this._hud = this._createHud();
        this._renderer = new Renderer(this);
        this._gameObjects = new Array();

        this._addEventListenerToCanvas();
        this._appendCanvas();
        this._bindContextToStatics();
    }

    // Game - Private Functions 
    private _interpreteParameter(canvasContainer: HTMLElement | HTMLCanvasElement | string) {
        if (canvasContainer instanceof String || typeof canvasContainer === 'string') {
            this._canvasContainer = document.getElementById(canvasContainer);
        } else if (canvasContainer instanceof HTMLCanvasElement) {// || canvasContainer.nodeName.toLowerCase() === 'canvas'){
            this._canvas = canvasContainer;
            this._canvasContainer = this._canvas.parentElement;
        } else if (canvasContainer instanceof Element) {
            this._canvasContainer = canvasContainer;
        } else {
            this._canvasContainer = document.body;
        }
    }
    private _createCanvas() {
        let canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.style.cursor = 'none';
        canvas.width = 1200;
        canvas.height = 800;
        return canvas;
    }
    private _appendCanvas() {
        if (this._canvasContainer == document.body && this._canvasContainer.childNodes.length > 0) {
            this._canvasContainer.insertBefore(this._canvas, this._canvasContainer.childNodes[0]);
        } else {
            this._canvasContainer.appendChild(this._canvas);
        }
    }

    // Game - Protected Functions

    protected _addEventListenerToCanvas() {

    }
    protected abstract _createHud() : void;
    protected _bindContextToStatics() {

    }

    protected abstract _gameloop() : void;
    protected abstract _onInitStart() : void;

    protected _add(gameObject : GameObject) {
        this._gameObjects.push(gameObject);
    }
    protected  _remove(gameObject : GameObject) {
        let list = this._gameObjects;
        list.splice(list.indexOf(gameObject), 1);
    }

    // Game - Public Functions
    public start() {
        this._onInitStart();
        this._process = window.setInterval(this._gameloop.bind(this), 20);
        this._renderer.start();
        this._canvas.focus();
    }
    public stop() {
        window.clearInterval(this._process);
        this._renderer.stop();
    }

    public get canvas() { return this._canvas; }
    public get gameObjects() { return this._gameObjects; }

}

export default Game;