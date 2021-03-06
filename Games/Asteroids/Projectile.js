import Util from '../aalib/Util';
import Vector from '../aalib/Vector';
import GameObject from '../aalib/GameObject';

import Asteroids from './Asteroids';

class Projectile extends GameObject{
  constructor(positionP, directionP){
    super(positionP, 5, 5,  directionP);
    
    this.speed = 10;
    this.damage = 20;
  }

  move(){
    var oldPosition = this.position;
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    directionVector = directionVector.multiplyByScalar(this.speed);
    this._position = this.position.substract(directionVector);
    // if(this.position.x+(this.height/2) < 0){
    //   Asteroids.remove(this);
    //   // console.log('X-axis out of pov');
    // }else if(this.position.x-(this.height/2) > Asteroids.getCanvas().width){
    //   Asteroids.remove(this);
    //   // console.log('X-axis out of pov');
    // }else if(this.position.y+(this.height/2) < 0){
    //   Asteroids.remove(this);
    //   // console.log('Y-axis out of pov');
    // }else if(this.position.y-(this.height/2) > Asteroids.getCanvas().height){
    //   Asteroids.remove(this);
    //   // console.log('Y-axis out of pov');
    // }
    // console.log('projectile new position is '+this.position.x+':'+this.position.y);
  }

}

export default Projectile;