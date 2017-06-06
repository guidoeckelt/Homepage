function ShuttleGun(x,y,dir){
  var self = this;
  self.x = x;
  self.y = y;

  self.width = 3;
  self.height = 15;
  self.direction = dir;//angle in radians
  self.reloadTime = 200;//in ms

  self.shuttle = null;
  self.isShooting = false;
  self.isReloading = false;

  self.shoot = function(){
    if(!self.isShooting){
      return;
    }
    if(self.isReloading){
      return;
    }
    var dir = directionVectorFromAngle(self.direction);
    var x = self.shuttle.x - (self.shuttle.width/2) + self.x - dir.x;
    var y = self.shuttle.y - (self.shuttle.height/2) + self.y - dir.y;
    var projectile = new Projectile(x,y,self.direction);
    Asteroids.add(projectile);
    // console.log('gun shooting');
    self.isReloading = true;
    window.setTimeout(function(){ self.isReloading = false;},self.reloadTime);
  };
}
