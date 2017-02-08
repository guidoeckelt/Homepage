class Shuttle{
  constructor(position){
    this.position = position;
    this.width = 30;
    this.height = 50;
    this.direction = 0;//heading angle in radians

    this.isMoving = false;
    this.isForward = true;
    this.speed = 5;

    this.isRotating = false;
    this.isClockwise = true;
    this.rotateFactor = 100;

    this.isShooting = false;
    this.isReloading = false;
    this.reloadTimeInMs = 100;
    this.reloading = this.reloading.bind(this);

    var gunX = this.width/2;
    var gunY = this.height*3/4;
    this.gun = new ShuttleGun(new Vector(gunX,gunY),this.direction);
    this.gun.shuttle = this;
  }

  move(){
    if(!this.isMoving){
      return;
    }
    var oldPosition = this.postion;
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    if(!this.isForward){
      directionVector = directionVector.multiplyByScalar(-1);
    }
    var amplifiedDirectionVector = directionVector.multiplyByScalar(this.speed);
    this.position = this.position.substract(amplifiedDirectionVector);
    if(this.position.x+(this.width/2) < 0){
      this.position = new Vector(Asteroids.getCanvas().width, this.position.y);
      // console.log('X-axis out of pov');
    }else if(this.position.x-(this.width/2) > Asteroids.getCanvas().width){
      this.position = new Vector(0, this.position.y);
      // console.log('X-axis out of pov');
    }else if(this.position.y+(this.height/2) < 0){
      this.position = new Vector(this.position.x, Asteroids.getCanvas().height);
      // console.log('Y-axis out of pov');
    }else if(this.position.y-(this.height/2) > Asteroids.getCanvas().height){
      this.position = new Vector(this.position.x, 0);
      // console.log('Y-axis out of pov');
    }
    // console.log('shuttles new position is '+this.position.x+':'+this.position.y);
  }
  rotate(){
    if(!this.isRotating){
      return;
    }
    var factor = this.rotateFactor;//this.speed;
    var offset = this.isClockwise?Math.PI/factor:Math.PI/(-1*factor);
    this.direction += offset;
    // this.gun.direction += offset;
    // console.log('new dir '+this.direction);
  }

  shoot(){
    if(!this.isShooting){
      return;
    }
    if(this.isReloading){
      return;
    }
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    var x = this.position.x+directionVector.x;
    var y = this.position.y+directionVector.y;
    var projectile = new Projectile(new Vector(x, y),this.direction);
    projectile.shuttle = this;
    Asteroids.add(projectile);
    this.isReloading = true;
    window.setTimeout(this.reloading, this.reloadTimeInMs);
    // console.log('shuttle shooting');
  }
  reloading(){
    this.isReloading = false;
  }

  hit(){
    // console.dir(this);

  }
}
