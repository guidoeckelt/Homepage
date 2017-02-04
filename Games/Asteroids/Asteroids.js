function Asteroids(canvasContainer){
  var self = this;

  self.process = null;
  self.canvasContainer = null;
  self.canvas = null;
  self.renderer = null;
  Asteroids.mouseX = -1;
  Asteroids.mouseY = -1;

  Asteroids.getCanvas = function(){ return self.canvas; };
  Asteroids.getObjects = function(){
    let objects = new Array();
    objects = objects.concat(projectiles);
    objects = objects.concat(asteroids);
    return objects;
  };
  self.shuttle = null;
  var projectiles = new Array();
  var asteroids = new Array();

  var gameLoop = function(){
    self.shuttle.move();
    self.shuttle.rotate();
    self.shuttle.shoot();
    self.shuttle.gun.shoot();
    for(var i=projectiles.length-1;i>=0;i--){
      var projectile = projectiles[i];
      projectile.move();
    }
  };

  Asteroids.add = function(object){
    if(object instanceof Projectile){
      projectiles.push(object);
    }else if(object instanceof Asteroid){
      asteroids.push(object);
    }
    // return self.canvas;
  };
  Asteroids.remove = function(object){
    let list = null;
    if(object instanceof Projectile){
      list = projectiles;
    }else if(object instanceof Asteroid){
      list = asteroids;
    }
    list.splice(list.indexOf(object),1);
  }

  self.start = function(){
    self.process = window.setInterval(function(){ gameLoop(); },20);
    self.renderer.start();
    self.canvas.focus();
  };
  self.stop = function () {
    window.clearInterval(self.process);
    self.renderer.stop();
  };

// Init
  var interpreteParameter = function(){
    if(canvasContainer instanceof String || typeof canvasContainer === 'string'){
      self.canvasContainer = document.getElementById(canvasContainer);
    }else if(canvasContainer instanceof HTMLCanvasElement){// || canvasContainer.nodeName.toLowerCase() === 'canvas'){
      self.canvas = canvasContainer;
      self.canvasContainer = self.canvas.parent;
    }else if(canvasContainer instanceof Element || typeof canvasContainer === 'Element'){
      self.canvasContainer = canvasContainer;
    }else{
      self.canvasContainer = document.body;
    }
  };
  var createCanvas = function(){
    self.canvas = document.createElement('canvas');
    self.canvas.id = 'canvas';
    self.canvas.style.cursor = 'none';
    self.canvas.width = 1200;
    self.canvas.height = 800;
  };
  var addEventListenerToCanvas = function(){
    self.canvas.addEventListener('mousemove',function(event){
      Asteroids.mouseX = event.clientX - self.canvas.getBoundingClientRect().left;
      Asteroids.mouseY = event.clientY - self.canvas.getBoundingClientRect().top;
      // console.log(Asteroids.mouseX+' : '+Asteroids.mouseY);

      var x = self.shuttle.position.x - (self.shuttle.width/2);
      var y = self.shuttle.position.y - (self.shuttle.height/2);
      var center = self.shuttle.gun.position.add(new Vector(x, y));
      // var center = {x:self.canvas.width/2,y:self.canvas.height/2};
      var lot = new Vector(center.x, center.y-1);
      var mouse = new Vector(Asteroids.mouseX,Asteroids.mouseY);
      var v1 = new Vector(lot.x-center.x,lot.y-center.y);
      var v2 = new Vector(mouse.x-center.x,mouse.y-center.y);
      var angle = Vector.radiansBetweenVectors(v2,v1);
      self.shuttle.gun.direction = angle;
      // console.log(angle);
    });
    self.canvas.addEventListener('mousedown',function(event){
      var buttons = event.buttons;
      switch(buttons){
        case 1:                               self.shuttle.gun.isShooting=true;break;//left click
        case 2: self.shuttle.isShooting=true; break;//right click
        case 3: self.shuttle.isShooting=true; self.shuttle.gun.isShooting=true; break;//left+right click
        case 4: break;//middle click
        case 5:                               self.shuttle.gun.isShooting=true;break;//left+middle click
        case 6: self.shuttle.isShooting=true; break;//right+middle click
        case 7: self.shuttle.isShooting=true; self.shuttle.gun.isShooting=true;break;//left+middle+right click
        default: console.log(buttons); //none
      }
      event.preventDefault();
    });
    self.canvas.addEventListener('mouseup',function(event){
      var buttons = event.buttons;
      switch(buttons){
        case 1: self.shuttle.isShooting=false; break;//left click
        case 2:                                self.shuttle.gun.isShooting=false; break;//right click
        case 3: break;//left+right click
        case 4: self.shuttle.isShooting=false; self.shuttle.gun.isShooting=false; break;//middle click
        case 5: self.shuttle.isShooting=false; break;//left+middle click
        case 6:                                self.shuttle.gun.isShooting=false;break;//right+middle click
        case 7: break;//left+middle+right click
        default: self.shuttle.isShooting=false; self.shuttle.gun.isShooting=false; //none
            console.log(buttons);
      }
      event.preventDefault();
    });
    self.canvas.addEventListener('click',function(event){
      event.preventDefault();
    });
    self.canvas.addEventListener('contextmenu',function(event){
      event.preventDefault();
    });

    document.body.onkeydown = function(event){
      var key = event.key;
      var keyC = event.charCode;
      // console.log('keyC:'+keyC+' key:'+key);
      //Moving
      if(key == 'w'){
        self.shuttle.isForward = true;
        self.shuttle.isMoving = true;
      }else if (key == 's') {
        self.shuttle.isForward = false;
        self.shuttle.isMoving = true;
      }
      //Rotating
      if (key == 'd') {
        self.shuttle.isClockwise = true;
        self.shuttle.isRotating = true;
      }else if (key == 'a'){
        self.shuttle.isClockwise = false;
        self.shuttle.isRotating = true;
      }

    };
    document.body.onkeyup = function(event){
      var key = event.key;
      var keyC = event.charCode;
      // console.log('keyC:'+keyC+' key:'+key);
      switch(key){
        case 'w': case 's': self.shuttle.isMoving = false; break;//Moving stopped
        case 'a': case 'd': self.shuttle.isRotating = false;break;//Rotating stopped
        default:
      }
    };
  };
  var appendCanvas = function(){
    if(self.canvasContainer==document.body&&self.canvasContainer.childNodes.length>0){
      self.canvasContainer.insertBefore(self.canvas,self.canvasContainer.childNodes[0]);
    }else{
      self.canvasContainer.appendChild(self.canvas);
    }
  }

// Constructor
  console.log('load Asteroids');
  interpreteParameter();
  if(null == self.canvas) createCanvas();
  addEventListenerToCanvas();
  appendCanvas();
  self.renderer = new Renderer(self);
  var position = new Vector(self.canvas.width/2,self.canvas.height/2);
  self.shuttle = new Shuttle(position);
  Asteroids.add(new Asteroid(new Vector(150,50),50));
  Asteroids.add(new Asteroid(new Vector(350,50),50));
  Asteroids.add(new Asteroid(new Vector(550,50),50));
  Asteroids.add(new Asteroid(new Vector(750,50),50));
  Asteroids.add(new Asteroid(new Vector(950,50),40));
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
