import Util from '../aalib/Util';
import Vector from '../aalib/Vector';
import GameObject from '../aalib/GameObject';

import Asteroids from './Asteroids';
import Projectile from './Projectile';

class ShuttleGun extends GameObject{
  constructor(positionP, directionP){
    super(positionP, 3, 15, directionP);

    this.isShooting = false;
    this.isReloading = false;
    this.reloadTimeInMs = 200;

    this.reloading = this.reloading.bind(this);
    this.shuttle = null;
  }

  shoot(){
    if(!this.isShooting){
      return;
    }
    if(this.isReloading){
      return;
    }
    var dir = Vector.directionVectorFromAngle(this.direction);
    var x = this.shuttle.position.x - (this.shuttle.width/2) + this.position.x - dir.x;
    var y = this.shuttle.position.y - (this.shuttle.height/2) + this.position.y - dir.y;
    var projectile = new Projectile(new Vector(x, y),this.direction);
    Asteroids.add(projectile);
    // console.log('gun shooting');
    this.isReloading = true;
    window.setTimeout(this.reloading,this.reloadTimeInMs);
  }
  reloading(){
    this.isReloading = false;
  }

}

export default ShuttleGun;
