function Shuttle(x,y){
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 50;

  this.direction = 0;//angle in radians
  this.speed = 1;
  this.isMoving = false;

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

  this.moveForward = function(){
    if(!this.isMoving){
      return;
    }
    var rad = degreesToRadians(this.direction);
    var directionVector = directionVectorFromAngle(this.direction);
    directionVector.x *= this.speed;
    directionVector.y *= this.speed;
    this.x -= directionVector.x;
    this.y -= directionVector.y;
    console.log('shuttles new postion is '+this.x+':'+this.y);
  };

}
