
class Dimension{
  private _width : number;
  private _height : number;
  private _depth : number;

  constructor(_width : number, _height : number, _depth : number = 0){
    this._width = _width;
    this._height = _height;
    this._depth = _depth;
  }

  get width(){ return this._width; }
  get height(){ return this._height; }
  get depth(){ return this._depth; }
}

export default Dimension;
