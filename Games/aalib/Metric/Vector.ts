import Angle from './Angle';

class Vector{

    private _x : number;
    private _y : number;
    private _z : number;
  
  constructor(xP : number, yP : number, zP : number=0){
    this._x = xP;
    this._y = yP;
    this._z = zP;
  }

  length() : number{
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
  }
  normalize() : Vector{
    var length = this.length();
    return new Vector(this.x/length, this.y/length, this.z/length);
  }
// Operator Functions
  add(other : Vector){
    // if (!(other instanceof Vector)) {
    //     // TODO ExceptionContext
    //     // ExceptionContext.throw(new Exception("Object is not a Vector2D"));
    //     return;
    // }
    return new Vector(this.x+other.x, this.y+other.y, this.z+other.z);
  }
  substract(other : Vector){
    // if (!(other instanceof Vector)) {
    //     // TODO ExceptionContext
    //     // ExceptionContext.throw(new Exception("Object is not a Vector2D"));
    //     return;
    // }
    return new Vector(this.x-other.x, this.y-other.y, this.z-other.z);
  }
  multiplyByScalar(scalar : number){
    // if (!(scalar instanceof Number)) {
    //     // TODO ExceptionContext
    //     // ExceptionContext.throw(new Exception("Object is not a Vector2D"));
    //     return;
    // }
    return new Vector(this.x*scalar, this.y*scalar, this.z*scalar);
  }

  get x() : number{ return this._x; }
  get y() : number{ return this._y; }
  get z() : number{ return this._z; }


  // Angle Functions
  //TODO z-component for 3D
  static radiansBetweenVectors(vector1 : Vector, vector2 : Vector) : Angle{
    let radiansValue = (Math.atan2(vector1.y,vector1.x) - Math.atan2(vector2.y,vector2.x)); 
    return new Angle(radiansValue, Angle.RADIANS);
  }
  static directionVectorFromAngle(angle : Angle) : Vector{
    return new Vector(Math.cos(angle.radians),Math.sin(angle.radians));
  }
  static angleFromDirectionVector(headingDirection : Vector) : Angle{
    let radiansValue = Math.atan2(headingDirection.y,headingDirection.x);
    return new Angle(radiansValue, Angle.RADIANS);
  }

}

export default Vector;
