class Asteroid{
  constructor(position, size){
    this.position = position;
    this.size = size;
    this.points = this._generatePoints();
  }
  _generatePoints(){
    let array = new Array();
    let increment = Math.PI/6;
    let min = -this.size/2;
    let max = this.size/3;
    for(let i = -Math.PI;i<Math.PI;i+=increment){
      let x  = this.position.x + (this.size * Math.cos(i));
      let y  = this.position.y + (this.size * Math.sin(i));
      let randomizer = Math.random() * (max - min) + min;
      let vector = Vector.directionVectorFromAngle(i)
                      .multiplyByScalar(randomizer);
      array.push(new Vector(x, y).add(vector));
    }
    return array;
  }

}
