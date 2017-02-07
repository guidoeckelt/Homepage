class Asteroid{
  constructor(position, size){
    this.position = position;
    this.size = size;
    this.width = size;
    this.height = size;
    this.pointNumber = randomNumberBetween(10,20);
    this.points = this._generatePoints();

    // this.direction = Math.PI*3/2;//heading angle in radians
    this.direction = randomNumberBetween(0,Math.PI*2);//heading angle in radians
    this.speed = 2;
  }
  _generatePoints(){
    let array = new Array();
    let increment = Math.PI*2/this.pointNumber;
    let min = -this.size/4;
    let max = this.size/4;
    for(let i = -Math.PI;i<Math.PI;i+=increment){
      let x  = (this.size * Math.cos(i));
      let y  = (this.size * Math.sin(i));
      let randomizer = randomNumberBetween(min, max);
      let vector = Vector.directionVectorFromAngle(i);
      vector = vector.multiplyByScalar(randomizer);
      array.push(new Vector(x, y).add(vector));
    }
    return array;
  }

  move(){
    var oldPosition = this.postion;
    var directionVector = Vector.directionVectorFromAngle(this.direction);
    directionVector = directionVector.multiplyByScalar(this.speed);
    this.position = this.position.substract(directionVector);

    if(this.position.x+(this.width/2) < 0-this.width){
      this.position = new Vector(Asteroids.getCanvas().width+this.width, this.position.y);
      // console.log('X-axis out of pov');
    }else if(this.position.x-(this.width/2) > Asteroids.getCanvas().width+this.width){
      this.position = new Vector(0-this.width, this.position.y);
      // console.log('X-axis out of pov');
    }else if(this.position.y+(this.height/2) < 0-this.height){
      this.position = new Vector(this.position.x, Asteroids.getCanvas().height+this.height);
      // console.log('Y-axis out of pov');
    }else if(this.position.y-(this.height/2) > Asteroids.getCanvas().height+this.height){
      this.position = new Vector(this.position.x, 0-this.height);
      // console.log('Y-axis out of pov');
    }
    // console.log('asteroid new position is '+this.position.x+':'+this.position.y);
  }

  hit(){
    // console.dir(this);

  }
}
