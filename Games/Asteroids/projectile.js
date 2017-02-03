class Projectile{
  constructor(position, direction){
    this.position = position;
    this.width = 5;
    this.height = 5;

    this.direction = direction;//heading angle in radians
    this.speed = 10;
  }
  move(){
    var oldPosition = this.postion;
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    directionVector = directionVector.multiplyByScalar(this.speed);
    this.position = this.position.substract(directionVector);
    if(this.position.x+(this.height/2) < 0){
      Asteroids.remove(this);
      // console.log('X-axis out of pov');
    }else if(this.position.x-(this.height/2) > Asteroids.getCanvas().width){
      Asteroids.remove(this);
      // this.x = 0;
      // console.log('X-axis out of pov');
      // this.y = Asteroids.getCanvas().height;
    }else if(this.position.y+(this.height/2) < 0){
      Asteroids.remove(this);
      // console.log('Y-axis out of pov');
    }else if(this.position.y-(this.height/2) > Asteroids.getCanvas().height){
      Asteroids.remove(this);
      // this.y = 0;
      // console.log('Y-axis out of pov');
    }
    // console.log('projectiles new postion is '+this.x+':'+this.y);
  }
}
