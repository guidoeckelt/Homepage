import Vector from "./Metric/Vector";
import Angle from "./Metric/Angle";
import Dimension from './Metric/Dimension'

abstract class GameObject {

  protected _position : Vector;
  protected _size : Dimension;
  protected _headingDirection : Angle;

  protected _isMoving : boolean = false;
  protected _movingDirection : Angle;
  protected _movingSpeed : number;

  constructor(_position : Vector, dimensionP : Dimension, headingDirectionP : Angle, movingDirectionP : Angle, movingSpeedP : number){
    this._position = _position;
    this._size = dimensionP;
    this._headingDirection = headingDirectionP;
    this._movingDirection = movingDirectionP;
    this._movingSpeed = movingSpeedP;
  }

  public move(){
    if(!this._isMoving){
      return;
    }
    let oldPosition = this._position;
    let directionVector = Vector.directionVectorFromAngle(this._movingDirection);
    let amplifiedDirectionVector = directionVector.multiplyByScalar(this._movingSpeed);
    this._position = this.position.substract(amplifiedDirectionVector);
  }

  get position(){ return this._position; }
  get size(){ return this._size; }
  get headingDirection(){ return this._headingDirection; }
  get movingDirection(){ return this._movingDirection; }
  get movingSpeed(){ return this._movingSpeed; }

}
class NullGameObject
  extends GameObject{

  constructor(){
    super(new Vector(0,0), new Dimension(0,0), new Angle(0, Angle.RADIANS), new Angle(0, Angle.DEGREE), 0);
  }

}

export { NullGameObject };
export default GameObject;
