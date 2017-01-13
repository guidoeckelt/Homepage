function Projectile(x,y,direction){
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;

    this.direction = direction;//heading angle in radians
    this.speed = 10;

    this.move = function(){
      var directionVector = directionVectorFromAngle(this.direction);
      var oldX = this.x;
      var oldY = this.y;
      this.x -= directionVector.x*this.speed;
      this.y -= directionVector.y*this.speed;
      if(this.x+(this.height/2) < 0){
        Asteroids.remove(this);
        // console.log('X-axis out of pov');
      }else if(this.x-(this.height/2) > Asteroids.getCanvas().width){
        Asteroids.remove(this);
        // this.x = 0;
        // console.log('X-axis out of pov');
        // this.y = Asteroids.getCanvas().height;
      }else if(this.y+(this.height/2) < 0){
        Asteroids.remove(this);
        // console.log('Y-axis out of pov');
      }else if(this.y-(this.height/2) > Asteroids.getCanvas().height){
        Asteroids.remove(this);
        // this.y = 0;
        // console.log('Y-axis out of pov');
      }
      // console.log('projectiles new postion is '+this.x+':'+this.y);
    };
}
