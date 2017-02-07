class Collision{
  constructor(){

  }

  static doesObjectsInterfere(object1, object2){
    let position1 = this._getStartAndEnd(object1);
    let position2 = this._getStartAndEnd(object2);
    if(position1.end.x >= position2.start.x &&
        position1.start.x <= position2.end.x){
        if(position1.end.y >= position2.start.y &&
            position1.start.y <= position2.end.y){
              return true;
        }
    }
    return false;
  }
  static _getStartAndEnd(object){
    let start = null;
    let end = null;
    if(object instanceof Projectile){
      start = new Vector(object.position.x, object.position.y);
      end = new Vector(object.position.x+object.width, object.position.y+object.height);
    }else if(object instanceof Asteroid){
      start = new Vector(object.position.x- (object.width/2), object.position.y- (object.height/2));
      end = new Vector(object.position.x+ (object.width/2), object.position.y+ (object.height/2));
    }else if(object instanceof Shuttle){
      start = new Vector(object.position.x- (object.width/2), object.position.y- (object.height/2));
      end = new Vector(object.position.x+ (object.width/2), object.position.y+ (object.height/2));
    }
    return {start : start, end : end};
  }
}
