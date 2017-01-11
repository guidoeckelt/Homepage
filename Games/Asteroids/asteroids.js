function Asteroids(canvasId){
  var self = this;

  self.process = null;
  self.canvas = null;
  self.renderer = null;
  Asteroids.mouseX = -1;
  Asteroids.mouseY = -1;

  self.shuttle = null;

  gameLoop = function(){

    self.shuttle.moveForward();
  };

// Init
  self.load = function(){
    if(canvasId instanceof String || typeof canvasId === 'string'){
      self.canvas = document.getElementById(canvasId);
    }else{
      self.canvas = document.createElement('canvas');
      self.canvas.id = 'canvas';
      document.getElementById('root').appendChild(self.canvas);
    }
    self.canvas.addEventListener('mousemove',function(event){
      Asteroids.mouseX = event.clientX - self.canvas.getBoundingClientRect().left;
      Asteroids.mouseY = event.clientY - self.canvas.getBoundingClientRect().top;
      // console.log(Asteroids.mouseX+' : '+Asteroids.mouseY);

      var x = self.shuttle.x - (self.shuttle.width/2);
      var y = self.shuttle.y - (self.shuttle.height/2);

      // var center = {x:self.shuttle.gun.x,y:self.shuttle.gun.y};
      var center = {x:x+self.shuttle.gun.x,y:y+self.shuttle.gun.y};
      // var center = {x:self.canvas.width/2-x+self.shuttle.gun.x,y:self.canvas.height/2-y+self.shuttle.gun.y};
      // var center = {x:self.canvas.width/2,y:self.canvas.height/2};
      var lot = {x:center.x,y:center.y-1};
      var mouse = {x:Asteroids.mouseX,y:Asteroids.mouseY};
      var v1 = {x:lot.x-center.x,y:lot.y-center.y};
      var v2 = {x:mouse.x-center.x,y:mouse.y-center.y};
      var angle = radiansBetweenVectors(v2,v1);
      self.shuttle.gun.direction = radiansBetweenVectors(v2,v1) +Math.PI;
      // console.log(angle);
    });
    self.canvas.addEventListener('keydown',function(event){
      var key = event.key;
      var keyC = event.charCode;
      console.log('keyC:'+keyC+' key:'+key);
      if(key == 'w'){
        self.shuttle.isMoving = true;
      }
    });
    self.canvas.addEventListener('keyup',function(event){
      var key = event.key;
      var keyC = event.charCode;
      console.log('keyC:'+keyC+' key:'+key);
      if(key == 'w'){
        self.shuttle.isMoving = false;
      }
    });

    self.renderer = new Renderer(self);
    self.shuttle = new Shuttle(self.canvas.width/2,self.canvas.height/2);

    self.process = window.setInterval(function(){ gameLoop(); },100);
    self.renderer.start();
  };
}

function Renderer(gameP){
  var game = gameP;
  var canvas = game.canvas;
  var context = canvas.getContext('2d');
  var drawProcess = null;

  var draw = function(){
    clear();
    context.save();
    background();
    context.restore();
    context.save();
    drawShuttle(game.shuttle);
    context.restore();
    context.save();
    pointer();
    context.restore();
    console.log('draw finished');
  };

  var clear = function(){
    context.clearRect(0,0,self.canvas.width,self.canvas.height);
  }
  var background = function(){
    context.fillStyle = '#000';
    context.fillRect(0,0,self.canvas.width,self.canvas.height);
    context.strokeStyle = null;
    context.strokeRect(0,0,self.canvas.width,self.canvas.height);
  };
  var pointer = function(){
      context.beginPath();
      context.arc(Asteroids.mouseX,Asteroids.mouseY,2,0,2*Math.PI);
      context.closePath();
      context.fillStyle = '#fff';
      context.fill();
  }

  var drawShuttle = function(shuttle){
    //shuttle
    var x = shuttle.x - (shuttle.width/2);
    var y = shuttle.y - (shuttle.height/2);
    context.translate(x,y);
    context.rotate(shuttle.direction);

    context.beginPath();
    context.moveTo(0,0+shuttle.height);//left bottom
    context.lineTo(0+shuttle.width,0+shuttle.height);//right bottom
    context.lineTo(0+(shuttle.width/2),0);//middle top
    context.closePath();

    context.fillStyle = null;
    context.fill();

    context.strokeStyle = '#fff';
    context.lineWidth = 2;
    context.stroke();
    //gun
    context.translate(shuttle.gun.x,shuttle.gun.y);
    context.beginPath();
    context.arc(0,0,3,0,2*Math.PI);
    context.closePath();
    context.fillStyle = '#000';
    context.fill();
    context.strokeStyle = '#fff';
    context.stroke();

    if(shuttle.gun.direction>0){
      context.translate(0-(shuttle.gun.width/2),0);
    }else{
      context.translate(0+(shuttle.gun.width/2),0);
    }
    context.rotate(shuttle.gun.direction);
    context.fillStyle = null;
    // context.fillRect(gunX,gunY,shuttle.gun.width,shuttle.gun.height);
    context.strokeStyle = '#fff';
    context.strokeRect(0,0,shuttle.gun.width,shuttle.gun.height);

  };

  this.start = function(){
    draw();
    drawProcess = window.setInterval(function(){
      draw();
    },1);
  }
  this.stop = function(){
    window.clearInterval(drawProcess);
  };
  // Init
  canvas.width = 800;
  canvas.height = 600;
}
function radiansBetweenVectors(A,B){
  return (Math.atan2(A.y,A.x) - Math.atan2(B.y,B.x));
}
function directionVectorFromAngle(angle){
  return {x:Math.cos(angle),y:Math.sin(angle)};
}
function angleFromDirectionVector(headingDirection){
  return Math.atan2(headingDirection.y,headingDirection.x);
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
