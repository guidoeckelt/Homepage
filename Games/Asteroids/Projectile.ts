import Util from '../aalib/Util';
import Vector from '../aalib/Metric/Vector';
import Angle from '../aalib/Metric/Angle';
import Dimension from '../aalib/Metric/Dimension';
import GameObject from '../aalib/GameObject';


// import Asteroids from './Asteroids';

class Projectile extends GameObject{

    protected _damage : number;
  constructor(positionP: Vector, directionP: Angle){
    super(positionP, new Dimension(5, 5), directionP, directionP, 10);
    
    this._isMoving = true;
    this._damage = 20;
  }

}

export default Projectile;