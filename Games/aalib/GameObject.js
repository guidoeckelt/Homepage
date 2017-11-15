import Util from '../aalib/Util';
import Vector from '../aalib/Vector';

class GameObject{
  
  constructor(positionP, widthP, heightP, directionP){
    this._position = positionP;
    this._width = widthP;
    this._height = heightP;
    this._direction = directionP;//heading angle in radians
  }

  get position(){ return this._position;  }
  get width(){ return this._width;  }
  get height(){ return this._height;  }
  get direction(){ return this._direction;  }
  set direction(newValue){ this._direction = newValue; }

}

export default GameObject;