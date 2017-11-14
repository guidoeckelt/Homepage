import Util from '../aalib/Util';
import Vector from '../aalib/Vector';
import GameObject from '../aalib/GameObject';

import Asteroids from './Asteroids';
import ShuttleGun from './ShuttleGun';
import Projectile from './Projectile';

class Shuttle extends GameObject{
  constructor(positionP){
    super(positionP, 30, 50, 0);
    this._initialPosition = positionP;

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

    this._maxLifes = 3;
    this.lifes = this._maxLifes;
    this._maxHp = 100;
    this.hp = this._maxHp;
    var gunX = this.width/2;
    var gunY = this.height*3/4;
    this.gun = new ShuttleGun(new Vector(gunX,gunY),this.direction);
    this.gun.shuttle = this;
  }

  move(){
    if(!this.isMoving){
      return;
    }
    var oldPosition = this.position;
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    if(!this.isForward){
      directionVector = directionVector.multiplyByScalar(-1);
    }
    var amplifiedDirectionVector = directionVector.multiplyByScalar(this.speed);
    var newPosition =  this.position.substract(amplifiedDirectionVector);
    this._position = newPosition;
    // console.log(oldPosition.x+":"+newPosition.x);
    // if(this.position.x+(this.width/2) < 0){
    //   this.position = new Vector(Asteroids.canvas.width, this.position.y);
    //   // console.log('X-axis out of pov');
    // }else if(this.position.x-(this.width/2) > Asteroids.canvas.width){
    //   this.position = new Vector(0, this.position.y);
    //   // console.log('X-axis out of pov');
    // }else if(this.position.y+(this.height/2) < 0){
    //   this.position = new Vector(this.position.x, Asteroids.canvas.height);
    //   // console.log('Y-axis out of pov');
    // }else if(this.position.y-(this.height/2) > Asteroids.canvas.height){
    //   this.position = new Vector(this.position.x, 0);
    //   // console.log('Y-axis out of pov');
    // }
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
  hit(dmg){
    // console.dir(this);
    this._takeDamage(dmg);
  }

  _takeDamage(dmg){
    if(this.hp > dmg){
      this.hp -= dmg;
      console.log("shuttle hp "+this.hp+"/"+this._maxHp+" "+dmg+" damage");
    }else{
      this.hp = this._maxHp;
      if(this.lifes>0){
        this.lifes--;
      }else{
        // console.log("shuttle is alreay down buddy");
      }
      this._respawn();
    }
  }
  _respawn(){
    this.position = this._initialPosition;
    console.log("shuttle("+this.lifes+"/"+this._maxLifes+") respawned at "+this.position.toString());
  }

}

export default Shuttle;