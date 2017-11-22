import Game from '../Game';
import GameObject from '../GameObject';
import Vector from '../Metric/Vector';
// import Projectile from '../../Asteroids/Projectile';
// import Shuttle from '../../Asteroids/Shuttle';
// import Asteroid from '../../Asteroids/Asteroid';

class Renderer {

    protected _game: Game;
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _process: number;
    protected _delay = 5;
    protected _isShowingHud = false;

    constructor(game: Game) {
        this._game = game;
        this._canvas = game.canvas;
        this._context = this._canvas.getContext('2d');

        this._draw = this._draw.bind(this);
        this._drawLoop = this._drawLoop.bind(this);
    }

    start() : void {
        this._drawLoop();
        this._process = window.setInterval(this._drawLoop, this._delay);
    }
    stop() : void {
        window.clearInterval(this._process);
    }

    _drawLoop() : void {
        var objects = this._game.gameObjects;
        this._clear();
        this._draw('background');
        for (var i = objects.length - 1; i >= 0; i--) {
            var object = objects[i];
            this._draw(object);
        }
        this._draw('interface');
        this._draw('pointer');
        // console.log('drawLoop finished');
    }
    _draw(object: GameObject | string) : void {
        this._context.save();
        if (object instanceof GameObject) {
            this._drawSpecific(object);
        } else if (object == 'pointer') {
            this._pointer();
        } else if (object == 'interface') {
            this._interface();
        } else if (object == 'background') {
            this._background();
        }
        this._context.restore();
    }
    protected _drawSpecific(gameObject: GameObject) : void {

    }

    protected _clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    protected _background() {
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.strokeStyle = null;
        this._context.strokeRect(0, 0, this._canvas.width, this._canvas.height);
    }
    protected _interface() {
        // console.log("fdsfd");
    }
    protected _pointer() {
        this._context.beginPath();
        this._context.arc(Asteroids.mouseX, Asteroids.mouseY, 2, 0, 2 * Math.PI);
        this._context.closePath();
        this._context.fillStyle = '#fff';
        this._context.fill();
    }

    // _drawShuttle(shuttle) {
    //     var offsetX = - (shuttle.width / 2);
    //     var offsetY = - (shuttle.height / 2);

    //     this._context.translate(shuttle.position.x, shuttle.position.y);
    //     this._context.rotate(shuttle.direction - Math.PI / 2);
    //     this._context.translate(offsetX, offsetY);
    //     //Hitbox
    //     this._drawCircle(-offsetX, -offsetY, shuttle.width, null, '#fff', 1);
    //     //Shuttle
    //     this._drawTriangle(0, 0, shuttle.width, shuttle.height, null, '#fff', 2);
    //     //ShuttleGun
    //     this._context.translate(shuttle.gun.position.x, shuttle.gun.position.y);
    //     this._drawCircle(0, 0, 4, '#000', '#fff', 1);

    //     // if(shuttle.gun.direction>0){
    //     //   this._context.translate(0-(shuttle.gun.width/2),0);
    //     // }else{
    //     //   this._context.translate(0+(shuttle.gun.width/2),0);
    //     // }
    //     this._context.rotate(-(shuttle.direction));
    //     this._context.translate(0, 0);
    //     this._context.rotate(shuttle.gun.direction + Math.PI);
    //     this._context.fillStyle = '#fff';
    //     this._context.fillRect(0, 0, shuttle.gun.width, shuttle.gun.height);
    //     this._context.strokeStyle = '#fff';
    //     this._context.strokeRect(0, 0, shuttle.gun.width, shuttle.gun.height);
    // }
    // _drawAsteroid(asteroid) {
    //     this._context.translate(asteroid.position.x, asteroid.position.y);
    //     //Hitbox
    //     this._drawCircle(0, 0, asteroid.size, null, '#fff', 1);
    //     //Asteroid
    //     this._drawPolygon(asteroid.points, '#000', '#fff', 2);
    //     // HP
    //     // let textX = -(asteroid.width/2);
    //     // let textY = -(asteroid.height/2);
    //     this._drawText(asteroid.hp, 0, 0, asteroid.width, asteroid.height);
    // }
    // _drawProjectile(projectile) {
    //     // console.log("projectile x:"+projectile.position.x+"projectile y:"+projectile.position.y);
    //     // context.rotate(projectile.direction);
    //     this._context.fillStyle = '#fff';
    //     this._context.fillRect(projectile.position.x, projectile.position.y, projectile.width, projectile.height);
    //     this._context.strokeStyle = null;
    //     this._context.strokeRect(projectile.position.x, projectile.position.y, projectile.width, projectile.height);
    // }

    _drawText(text: string, x: number, y: number, width: number, height: number) {
        this._context.textBaseline = 'middle';
        this._context.textAlign = 'center';
        this._context.fillStyle = '#fff';
        this._context.font = '20px Arial sans-serif';
        this._context.fillText(text, x, y, width);
    }
    _drawCircle(x: number, y: number, radius: number, backgroundColor: string, borderColor: string, borderWidth: number) {
        this._context.beginPath();
        this._context.arc(x, y, radius, 0, 2 * Math.PI);
        this._context.closePath();

        this._context.fillStyle = backgroundColor;
        this._context.fill();

        this._context.lineWidth = borderWidth;
        this._context.strokeStyle = borderColor;
        this._context.stroke();
    }
    _drawTriangle(x: number, y: number, width: number, height: number, backgroundColor: string, borderColor: string, borderWidth: number) {
        //original rectangle
        this._context.fillStyle = backgroundColor;
        this._context.fillRect(x, y, width, height);
        this._context.strokeStyle = borderColor;
        this._context.lineWidth = 1;
        this._context.strokeRect(x, y, width, height);
        // Triangle
        this._context.beginPath();               //                            3
        this._context.moveTo(x, y + height);//left bottom 1            offSet->.  .  .
        this._context.lineTo(x + width, y + height);//right bottom 2        .<--position
        this._context.lineTo(x + (width / 2), y);//middle top 3                 1.     .2
        this._context.closePath();

        this._context.fillStyle = backgroundColor;
        this._context.fill();

        this._context.lineWidth = borderWidth;
        this._context.strokeStyle = borderColor;
        this._context.stroke();
    }
    _drawPolygon(verteces: Array<Vector>, backgroundColor: string, borderColor: string, borderWidth: number) {
        let firstPoint = verteces[0];
        this._context.beginPath();
        this._context.moveTo(firstPoint.x, firstPoint.y);
        for (let i = verteces.length - 1; i > 0; i--) {
            let point = verteces[i];
            this._context.lineTo(point.x, point.y);
        }
        this._context.closePath();

        this._context.fillStyle = backgroundColor;
        this._context.fill();

        this._context.lineWidth = borderWidth;
        this._context.strokeStyle = borderColor;
        this._context.stroke();
    
    }

}

export default Renderer;