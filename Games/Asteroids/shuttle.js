function Shuttle(x,y){
  var self = this;
  self.x = x;
  self.y = y;
  self.width = 30;
  self.height = 50;
  self.direction = 0;//heading angle in radians
  self.speed = 5;
  self.rotateFactor = 50;
  self.reloadTime = 100;//in ms

  self.isMoving = false;
  self.isForward = true;
  self.isRotating = false;
  self.isClockwise = true;
  self.isShooting = false;
  self.isReloading = false;

  var gunX = self.width/2;
  var gunY = self.height*3/4;
  self.gun = new ShuttleGun(gunX,gunY,self.direction);
  self.gun.shuttle = self;

  self.move = function(){
    if(!self.isMoving){
      return;
    }
    var directionVector = directionVectorFromAngle(self.direction);
    if(!self.isForward){
      directionVector.x *= -1;
      directionVector.y *= -1;
    }
    var oldX = self.x;
    var oldY = self.y;
    self.x -= directionVector.x*self.speed;
    self.y -= directionVector.y*self.speed;
    if(self.x+(self.height/2) < 0){
      self.x = Asteroids.getCanvas().width;
      // console.log('X-axis out of pov');
    }else if(self.x-(self.height/2) > Asteroids.getCanvas().width){
      self.x = 0;
      // console.log('X-axis out of pov');
    }else if(self.y+(self.height/2) < 0){
      self.y = Asteroids.getCanvas().height;
      // console.log('Y-axis out of pov');
    }else if(self.y-(self.height/2) > Asteroids.getCanvas().height){
      self.y = 0;
      // console.log('Y-axis out of pov');
    }
    // console.log('shuttles new postion is '+self.x+':'+self.y);
  };
  self.rotate = function(){
    if(!self.isRotating){
      return;
    }
    var factor = self.rotateFactor;//self.speed;
    var offset = self.isClockwise?Math.PI/factor:Math.PI/(-1*factor);
    self.direction += offset;
    // console.log('new dir '+self.direction);
  };
  self.shoot = function(){
    if(!self.isShooting){
      return;
    }
    if(self.isReloading){
      return;
    }
    var dir = directionVectorFromAngle(self.direction);
    var projectile = new Projectile(self.x+dir.x,self.y+dir.y,self.direction);
    projectile.shuttle = self;
    Asteroids.add(projectile);
    self.isReloading = true;
    window.setTimeout(function(){ self.isReloading = false;},self.reloadTime);
    // console.log('shuttle shooting');
  };
}
