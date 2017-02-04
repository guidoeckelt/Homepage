class Asteroids{
  constructor(canvasContainer){
    // console.log('load Asteroids');
    this._bindContextToStatics();
    this._canvasContainer = null;
    this._canvas = null;
    this._mouseX = -1;
    this._mouseY = -1;
    Asteroids.mouseX = -1;
    Asteroids.mouseY = -1;
    this._interpreteParameter(canvasContainer);
    if(null == this._canvas) this._createCanvas();
    this._addEventListenerToCanvas();
    this._appendCanvas();

    this._process = null;
    this._renderer = new Renderer(this);
    this._gameObjects = new Array();
    this._projectiles = new Array();
    this._asteroids = new Array();
    this._createAndAddInitialObjects();
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
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'canvas';
    this._canvas.style.cursor = 'none';
    this._canvas.width = 1200;
    this._canvas.height = 800;
  }
  _addEventListenerToCanvas(){
    this._canvas.addEventListener('mousemove',(function(event){
      this._mouseX = event.clientX - this._canvas.getBoundingClientRect().left;
      this._mouseY = event.clientY - this._canvas.getBoundingClientRect().top;
      Asteroids.mouseX = event.clientX - this._canvas.getBoundingClientRect().left;
      Asteroids.mouseY = event.clientY - this._canvas.getBoundingClientRect().top;
      // console.log(Asteroids.mouseX+' : '+Asteroids.mouseY);

      var x = this._shuttle.position.x - (this._shuttle.width/2);
      var y = this._shuttle.position.y - (this._shuttle.height/2);
      var center = this._shuttle.gun.position.add(new Vector(x, y));
      // var center = {x:self.canvas.width/2,y:self.canvas.height/2};
      var lot = new Vector(center.x, center.y-1);
      var mouse = new Vector(Asteroids.mouseX,Asteroids.mouseY);
      var v1 = new Vector(lot.x-center.x,lot.y-center.y);
      var v2 = new Vector(mouse.x-center.x,mouse.y-center.y);
      var angle = Vector.radiansBetweenVectors(v2,v1)+Math.PI/2;
      this._shuttle.gun.direction = angle;
      // console.log(angle);
    }).bind(this));
    this._canvas.addEventListener('mousedown',(function(event){
      var buttons = event.buttons;
      switch(buttons){
        case 1:                               this._shuttle.gun.isShooting=true;break;//left click
        case 2: this._shuttle.isShooting=true; break;//right click
        case 3: this._shuttle.isShooting=true; this._shuttle.gun.isShooting=true; break;//left+right click
        case 4: break;//middle click
        case 5:                               this._shuttle.gun.isShooting=true;break;//left+middle click
        case 6: this._shuttle.isShooting=true; break;//right+middle click
        case 7: this._shuttle.isShooting=true; this._shuttle.gun.isShooting=true;break;//left+middle+right click
        default: console.log(buttons); //none
      }
      event.preventDefault();
    }).bind(this));
    this._canvas.addEventListener('mouseup',(function(event){
      var buttons = event.buttons;
      switch(buttons){
        case 1: this._shuttle.isShooting=false; break;//left click
        case 2:                                this._shuttle.gun.isShooting=false; break;//right click
        case 3: break;//left+right click
        case 4: this._shuttle.isShooting=false; this._shuttle.gun.isShooting=false; break;//middle click
        case 5: this._shuttle.isShooting=false; break;//left+middle click
        case 6:                                this._shuttle.gun.isShooting=false;break;//right+middle click
        case 7: break;//left+middle+right click
        default: this._shuttle.isShooting=false; this._shuttle.gun.isShooting=false; //none
            console.log(buttons);
      }
      event.preventDefault();
    }).bind(this));
    this._canvas.addEventListener('click',function(event){
      event.preventDefault();
    });
    this._canvas.addEventListener('contextmenu',function(event){
      event.preventDefault();
    });

    document.body.onkeydown = (function(event){
      var key = event.key;
      var keyC = event.charCode;
      // console.log('keyC:'+keyC+' key:'+key);
      //Moving
      if(key == 'w'){
        this._shuttle.isForward = true;
        this._shuttle.isMoving = true;
      }else if (key == 's') {
        this._shuttle.isForward = false;
        this._shuttle.isMoving = true;
      }
      //Rotating
      if (key == 'd') {
        this._shuttle.isClockwise = true;
        this._shuttle.isRotating = true;
      }else if (key == 'a'){
        this._shuttle.isClockwise = false;
        this._shuttle.isRotating = true;
      }

    }).bind(this);
    document.body.onkeyup = (function(event){
      var key = event.key;
      var keyC = event.charCode;
      // console.log('keyC:'+keyC+' key:'+key);
      switch(key){
        case 'w': case 's': this._shuttle.isMoving = false; break;//Moving stopped
        case 'a': case 'd': this._shuttle.isRotating = false;break;//Rotating stopped
        default:
      }
    }).bind(this);
  }
  _appendCanvas(){
    if(this._canvasContainer==document.body&&this._canvasContainer.childNodes.length>0){
      this._canvasContainer.insertBefore(this._canvas,this._canvasContainer.childNodes[0]);
    }else{
      this._canvasContainer.appendChild(this._canvas);
    }
  }

  _bindContextToStatics(){
    Asteroids.add = Asteroids.add.bind(this);
    Asteroids.remove = Asteroids.remove.bind(this);
    Asteroids.getCanvas = Asteroids.getCanvas.bind(this);
    Asteroids.getMouseVector = Asteroids.getMouseVector.bind(this);
    Asteroids.getGameObjects = Asteroids.getGameObjects.bind(this);
  }
  _createAndAddInitialObjects(){
    var position = new Vector(this._canvas.width/2,this._canvas.height/2);
    this._shuttle = new Shuttle(position);
    Asteroids.add(new Asteroid(new Vector(150,50),50));
    Asteroids.add(new Asteroid(new Vector(350,50),50));
    Asteroids.add(new Asteroid(new Vector(550,50),50));
    Asteroids.add(new Asteroid(new Vector(750,50),50));
    Asteroids.add(new Asteroid(new Vector(950,50),40));
  }
  _gameLoop(){
    this._shuttle.move();
    this._shuttle.rotate();
    this._shuttle.shoot();
    this._shuttle.gun.shoot();
    for(var i=this._projectiles.length-1;i>=0;i--){
      var projectile = this._projectiles[i];
      projectile.move();
    }
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
  static add(gameObject){
    if(gameObject instanceof Projectile){
      this._projectiles.push(gameObject);
    }else if(gameObject instanceof Asteroid){
      this._asteroids.push(gameObject);
    }
  }
  static remove(gameObject){
    let list = null;
    if(gameObject instanceof Projectile){
      list = this._projectiles;
    }else if(gameObject instanceof Asteroid){
      list = this._asteroids;
    }
    list.splice(list.indexOf(gameObject),1);
  }

  static getCanvas(){ return this._canvas; };
  static getGameObjects(){
    let objects = new Array();
    objects = objects.concat(this._projectiles);
    objects = objects.concat(this._asteroids);
    return objects;
  }
  static getMouseVector(){ return new Vector(this._mouseX, this._mouseY); }
}
function degreesToRadians(degrees){
  return degrees * (Math.PI/180);
}
function radiansToDegrees(radians){
  return radians * (180/Math.PI);
}
// function find_angle(A,B,C) {
//     var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
//     var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
//     var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
//     var rad = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
//     return (rad*180)/Math.PI;
// }
