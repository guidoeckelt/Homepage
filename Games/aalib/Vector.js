class Vector{
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  length(){
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
  }
  normalize(){
    var length = this.length();
    return new Vector2D(this.x/length, this.y/length, this.z/length);
  }
// Operator Functions
  add(other){
    if (!other instanceof Vector) {
        // TODO ExceptionContext
        // ExceptionContext.throw(new Exception("Object is not a Vector2D"));
        return;
    }
    return new Vector(this.x+other.x, this.y+other.y, this.z+other.z);
  }
  substract(other){
    if (!other instanceof Vector) {
        // TODO ExceptionContext
        // ExceptionContext.throw(new Exception("Object is not a Vector2D"));
        return;
    }
    return new Vector(this.x-other.x, this.y-other.y, this.z-other.z);
  }
  multiplyByScalar(scalar){
    if (!scalar instanceof Number) {
        // TODO ExceptionContext
        // ExceptionContext.throw(new Exception("Object is not a Vector2D"));
        return;
    }
    return new Vector(this.x*scalar, this.y*scalar, this.z*scalar);
  }

// Angle Functions
//TODO z-component for 3D
static radiansBetweenVectors(vector1,vector2){
  return (Math.atan2(vector1.y,vector1.x) - Math.atan2(vector2.y,vector2.x));
}
static directionVectorFromAngle(angle){
  return new Vector(Math.cos(angle),Math.sin(angle));
}
static angleFromDirectionVector(headingDirection){
  return Math.atan2(headingDirection.y,headingDirection.x);
}

}
