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
    if(this.position.x+(this.height/2) < 0){
      this.position = new Vector(Asteroids.getCanvas().width, this.position.y);
      // console.log('X-axis out of pov');
    }else if(this.position.x-(this.height/2) > Asteroids.getCanvas().width){
      this.position = new Vector(0, this.position.y);
      // console.log('X-axis out of pov');
    }else if(this.position.y+(this.height/2) < 0){
      this.position.y = new Vector(this.position.x, Asteroids.getCanvas().height);
      // console.log('Y-axis out of pov');
    }else if(this.y-(this.height/2) > Asteroids.getCanvas().height){
      this.position.y = new Vector(this.position.x, 0);
      // console.log('Y-axis out of pov');
    }
    // console.log('shuttles new postion is '+this.x+':'+this.y);
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
}
//
// function Shuttle(x,y){
//   var self = this;
//   self.x = x;
//   self.y = y;
//   self.width = 30;
//   self.height = 50;
//   self.direction = 0;//heading angle in radians
//   self.speed = 5;
//   self.rotateFactor = 50;
//   self.reloadTime = 100;//in ms
//
//   self.isMoving = false;
//   self.isForward = true;
//   self.isRotating = false;
//   self.isClockwise = true;
//   self.isShooting = false;
//   self.isReloading = false;
//
//   var gunX = self.width/2;
//   var gunY = self.height*3/4;
//   self.gun = new ShuttleGun(new Vector(gunX,gunY),self.direction);
//   self.gun.shuttle = self;
//
//   self.move = function(){
//     if(!self.isMoving){
//       return;
//     }
//     var directionVector = directionVectorFromAngle(self.direction);
//     if(!self.isForward){
//       directionVector.x *= -1;
//       directionVector.y *= -1;
//     }
//     var oldX = self.x;
//     var oldY = self.y;
//     self.x -= directionVector.x*self.speed;
//     self.y -= directionVector.y*self.speed;
//     if(self.x+(self.height/2) < 0){
//       self.x = Asteroids.getCanvas().width;
//       // console.log('X-axis out of pov');
//     }else if(self.x-(self.height/2) > Asteroids.getCanvas().width){
//       self.x = 0;
//       // console.log('X-axis out of pov');
//     }else if(self.y+(self.height/2) < 0){
//       self.y = Asteroids.getCanvas().height;
//       // console.log('Y-axis out of pov');
//     }else if(self.y-(self.height/2) > Asteroids.getCanvas().height){
//       self.y = 0;
//       // console.log('Y-axis out of pov');
//     }
//     // console.log('shuttles new postion is '+self.x+':'+self.y);
//   };
//   self.rotate = function(){
//     if(!self.isRotating){
//       return;
//     }
//     var factor = self.rotateFactor;//self.speed;
//     var offset = self.isClockwise?Math.PI/factor:Math.PI/(-1*factor);
//     self.direction += offset;
//     // console.log('new dir '+self.direction);
//   };
//   self.shoot = function(){
//     if(!self.isShooting){
//       return;
//     }
//     if(self.isReloading){
//       return;
//     }
//     var dir = directionVectorFromAngle(self.direction);
//     var x = self.x+dir.x;
//     var y = self.y+dir.y;
//     var projectile = new Projectile(new Vector(x, y),self.direction);
//     projectile.shuttle = self;
//     Asteroids.add(projectile);
//     self.isReloading = true;
//     window.setTimeout(function(){ self.isReloading = false;},self.reloadTime);
//     // console.log('shuttle shooting');
//   };
// }
