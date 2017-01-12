function Shuttle(x,y){
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 50;

  this.direction = 0;//heading angle in radians
  this.isMoving = false;
  this.isForward = true;
  this.speed = 5;
  this.isRotating = false;
  this.isClockwise = true;
  this.rotateFactor = 50;

  var gunX = this.width/2;
  var gunY = this.height*3/4;
  this.gun = {
    x : gunX,
    y : gunY,
    width : 3,
    height: 15,
    direction : 0,//angle in radians
    isShooting : false
  }

  this.move = function(){
    if(!this.isMoving){
      return;
    }
    var directionVector = directionVectorFromAngle(this.direction);
    if(!this.isForward){
      directionVector.x *= -1;
      directionVector.y *= -1;
    }
    var oldX = this.x;
    var oldY = this.y;
    this.x -= directionVector.x*this.speed;
    this.y -= directionVector.y*this.speed;
    if(this.x+(this.height/2) < 0){
      this.x = Asteroids.getCanvas().width;
      // console.log('X-axis out of pov');
    }else if(this.x-(this.height/2) > Asteroids.getCanvas().width){
      this.x = 0;
      // console.log('X-axis out of pov');
    }else if(this.y+(this.height/2) < 0){
      this.y = Asteroids.getCanvas().height;
      // console.log('Y-axis out of pov');
    }else if(this.y-(this.height/2) > Asteroids.getCanvas().height){
      this.y = 0;
      // console.log('Y-axis out of pov');
    }
    console.log('shuttles new postion is '+this.x+':'+this.y);
  };
  this.rotate = function(){
    if(!this.isRotating){
      return;
    }
    var factor = this.rotateFactor;//this.speed;
    var offset = this.isClockwise?Math.PI/factor:Math.PI/(-1*factor);
    this.direction += offset;
    console.log('new dir '+this.direction);
  };
}
