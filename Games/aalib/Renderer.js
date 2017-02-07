class Renderer{
  constructor(game){
    this._game = game;
    this._canvas = game._canvas;
    this._context = canvas.getContext('2d');
    this._drawProcess = null;
    this._delay = 5;
    this._draw = this._draw.bind(this);
    this._drawLoop = this._drawLoop.bind(this);
  }

  start(){
    this._drawLoop();
    this._drawProcess = window.setInterval(this._drawLoop, this._delay);
  }
  stop(){
    window.clearInterval(this._drawProcess);
  }
  
  _drawLoop(){
    var objects = Asteroids.getGameObjects();
    this._clear();
    this._draw('background');
    for(var i=objects.length-1;i>=0;i--){
      var object = objects[i];
      this._draw(object);
    }
    this._draw('pointer');
    console.log('drawLoop finished');
  }
  _draw(object){
      this._context.save();
      if(object instanceof Projectile){
        this._drawProjectile(object);
      }else if(object instanceof Asteroid){
        this._drawAsteroid(object);
      }else if(object instanceof Shuttle){
        this._drawShuttle(object);
      }else if(object == 'pointer'){
        this._pointer();
      }else if(object == 'background'){
        this._background();
      }
      this._context.restore();
  }

  _clear(){
    this._context.clearRect(0,0,this._canvas.width,this._canvas.height);
  }
  _background(){
    this._context.fillStyle = '#000';
    this._context.fillRect(0,0,this._canvas.width,this._canvas.height);
    this._context.strokeStyle = null;
    this._context.strokeRect(0,0,this._canvas.width,this._canvas.height);
  }
  _pointer(){
    this._context.beginPath();
    this._context.arc(Asteroids.mouseX,Asteroids.mouseY,2,0,2*Math.PI);
    this._context.closePath();
    this._context.fillStyle = '#fff';
    this._context.fill();
  }

  _drawShuttle(shuttle){
    //shuttle
    var offsetX = - (shuttle.width/2);
    var offsetY = - (shuttle.height/2);
    this._context.translate(shuttle.position.x,shuttle.position.y);
    this._context.rotate(shuttle.direction - Math.PI/2);
    this._context.translate(offsetX,offsetY);
    // outline circle
    this._context.beginPath();
    this._context.arc(-offsetX,-offsetY,shuttle.width,0,2*Math.PI);
    this._context.closePath();
    this._context.lineWidth = 1;
    this._context.strokeStyle = '#fff';
    this._context.stroke();
    // //original rectangle
    // this._context.strokeStyle = '#fff';
    // this._context.lineWidth = 1;
    // this._context.strokeRect(0,0,shuttle.width,shuttle.height);

    this._context.beginPath();               //                                    3
    this._context.moveTo(0,0+shuttle.height);//left bottom 1            offSet->.  .  .
    this._context.lineTo(0+shuttle.width,0+shuttle.height);//right bottom 2        .<--position
    this._context.lineTo(0+(shuttle.width/2),0);//middle top 3                 1.     .2
    this._context.closePath();

    this._context.fillStyle = null;
    this._context.fill();

    this._context.strokeStyle = '#fff';
    this._context.lineWidth = 2;
    this._context.stroke();

    //gun
    this._context.translate(shuttle.gun.position.x,shuttle.gun.position.y);
    this._context.beginPath();
    this._context.arc(0,0,4,0,2*Math.PI);
    this._context.closePath();
    this._context.fillStyle = '#000';
    this._context.fill();
    this._context.strokeStyle = '#fff';
    this._context.stroke();

    // if(shuttle.gun.direction>0){
    //   this._context.translate(0-(shuttle.gun.width/2),0);
    // }else{
    //   this._context.translate(0+(shuttle.gun.width/2),0);
    // }
    this._context.rotate(-(shuttle.direction));
    this._context.translate(0,0);
    this._context.rotate(shuttle.gun.direction+Math.PI);
    this._context.fillStyle = '#fff';
    this._context.fillRect(0,0,shuttle.gun.width,shuttle.gun.height);
    this._context.strokeStyle = '#fff';
    this._context.strokeRect(0,0,shuttle.gun.width,shuttle.gun.height);
  }
  _drawAsteroid(asteroid){
    this._context.translate(asteroid.position.x, asteroid.position.y);
    // outline original circle
    this._context.beginPath();
    this._context.arc(0,0,asteroid.size,0,2*Math.PI);
    this._context.closePath();
    this._context.lineWidth = 1;
    this._context.strokeStyle = '#fff';
    this._context.stroke();

    this._context.beginPath();
    let firstPoint = asteroid.points[0];
    this._context.moveTo(firstPoint.x, firstPoint.y);
    for(let i = asteroid.points.length-1;i>0;i--){
      let point = asteroid.points[i];
      this._context.lineTo(point.x,point.y);
    }
    this._context.closePath();
    this._context.lineWidth = 2;
    this._context.strokeStyle = '#fff';
    this._context.stroke();

  }
  _drawProjectile(projectile){
    // context.rotate(projectile.direction);
    this._context.fillStyle = '#fff';
    this._context.fillRect(projectile.position.x,projectile.position.y,projectile.width,projectile.height);
    this._context.strokeStyle = null;
    this._context.strokeRect(projectile.position.x,projectile.position.y,projectile.width,projectile.height);
  }

}
