import Util from '../aalib/Util';
import Vector from '../aalib/Vector';
import GameObject from '../aalib/GameObject';

import Asteroids from './Asteroids';

class Asteroid extends GameObject{
  constructor(positionP, sizeP, directionP){
    super(positionP, sizeP, sizeP, directionP);
    this._size = sizeP;
    this._pointNumber = Util.randomNumberBetween(10,20);
    this._points = this._generatePoints();
    
    this._speed = 2;
    this._maxHp = 100;
    this._hp = this._maxHp;
  }
  _generatePoints(){
    let array = new Array();
    let increment = Math.PI*2/this._pointNumber;
    let min = -this._size/4;
    let max = this._size/4;
    for(let i = -Math.PI;i<Math.PI;i+=increment){
      let x  = (this._size * Math.cos(i));
      let y  = (this._size * Math.sin(i));
      let randomizer = Util.randomNumberBetween(min, max);
      let direction = Vector.directionVectorFromAngle(i);
      let randomizedVector = direction.multiplyByScalar(randomizer);
      let pointPosition = new Vector(x, y).add(randomizedVector);
      array.push(pointPosition);
    }
    return array;
  }

  move(){
    var oldPosition = this.position;
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    directionVector = directionVector.multiplyByScalar(this._speed);
    this._position = this.position.substract(directionVector);
    // if(this.position.x+(this.width/2) < 0-this.width){
    //   this.position = new Vector(Asteroids.getCanvas().width+this.width, this.position.y);
    //   // console.log('X-axis out of pov');
    // }else if(this.position.x-(this.width/2) > Asteroids.getCanvas().width+this.width){
    //   this.position = new Vector(0-this.width, this.position.y);
    //   // console.log('X-axis out of pov');
    // }else if(this.position.y+(this.height/2) < 0-this.height){
    //   this.position = new Vector(this.position.x, Asteroids.getCanvas().height+this.height);
    //   // console.log('Y-axis out of pov');
    // }else if(this.position.y-(this.height/2) > Asteroids.getCanvas().height+this.height){
    //   this.position = new Vector(this.position.x, 0-this.height);
    //   // console.log('Y-axis out of pov');
    // }
    // console.log('asteroid new position is '+this.position.x+':'+this.position.y);
  }
  hit(dmg){
    // console.dir(this);
    this._takeDamage(dmg);
  }

  _takeDamage(dmg){
    if(this._hp > dmg){
      this._hp -= dmg;
      console.log("shuttle hp "+this._hp+"/"+this._maxHp+" "+dmg+" damage");
    }else{
      this._BOOOM();
    }
  }
  _BOOOM(){
    let amount = Util.randomNumberBetween(2,3);
    let newSize = this._size - (this._size/2);
    if(newSize > 10){
      for(let i=-1; i<=amount-1; i++){
        let x = this.position.x + (i*newSize*2);
        let y = this.position.y + (i*newSize*2);
        Asteroids.add(new Asteroid(new Vector(x, y), newSize));
      }
    }
    Asteroids.remove(this);
  }

  get points(){ return this._points; }
  get size(){ return this._size; }
  get hp(){ return this._hp; }

}

export default Asteroid;