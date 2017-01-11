function Asteroids(canvasId){
  var self = this;

  self.canvas = null;
  self.renderer = null;
  Asteroids.mouseX = -1;
  Asteroids.mouseY = -1;

  self.shuttle = null;

// Init
  self.load = function(){
    self.shuttle = new Shuttle();

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

      var center = {x:self.canvas.width/2,y:self.canvas.height/2};
      var lot = {x:center.x,y:center.y-1};
      var mouse = {x:Asteroids.mouseX,y:Asteroids.mouseY};
      var v1 = {x:lot.x-center.x,y:lot.y-center.y};
      var v2 = {x:mouse.x-center.x,y:mouse.y-center.y};
      var angle = angleBetweenVectors(v2,v1);
      self.shuttle.direction = angleBetweenVectors(v2,v1);
      // console.log(angle);
    });
    self.renderer = new Renderer(self);

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
    var x = shuttle.x - (shuttle.width/2);
    var y = shuttle.y - (shuttle.height/2);

    context.translate(canvas.width/2,canvas.height/2);
    context.rotate(shuttle.direction*Math.PI/180);

    context.beginPath();
    context.moveTo(x,y+shuttle.height);
    context.lineTo(x+shuttle.width,y+shuttle.height);
    context.lineTo(x+(shuttle.width/2),y);
    context.closePath();

    context.fillStyle = null;
    context.fill();

    context.strokeStyle = '#fff';
    context.lineWidth = 2;
    context.stroke();
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
function angleBetweenVectors(A,B){
  return (Math.atan2(A.y,A.x) - Math.atan2(B.y,B.x))*180/Math.PI;
}
// function find_angle(A,B,C) {
//     var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
//     var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
//     var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
//     var rad = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
//     return (rad*180)/Math.PI;
// }
