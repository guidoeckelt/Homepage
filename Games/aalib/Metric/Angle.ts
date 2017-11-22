
class AngleEnum{
  public static readonly RADIANS : string = "rad";
  public static readonly DEGREE : string = "deg";

  private _name : string;

  constructor(_name : string){
    if(!this._IsNameAvailable(name)) throw Error("BLABLA Angle Name nicht da");
    this._name = _name;
  }

  private _IsNameAvailable(name : string) : boolean{
    return (name != AngleEnum.RADIANS && name != AngleEnum.DEGREE)
  }

}
class Radians
  extends AngleEnum{

  constructor(){
    super(AngleEnum.RADIANS);
  }
}
class Degree
  extends AngleEnum{

  constructor(){
    super(AngleEnum.DEGREE);
  }
}

class Angle{
  public static readonly RADIANS : AngleEnum = new Radians();
  public static readonly DEGREE : AngleEnum = new Degree();


  private _value : number;
  private _type : AngleEnum;

  constructor(_value : number, _type : AngleEnum){
    this._value = _value;
    this._type = _type;
  }

  public get radians() : number{
    let value = this._value;
    if(this._type === Angle.DEGREE){
      value *= (Math.PI/180);
    }
    return value;
  }
  public get degree() : number{
    let value = this._value;
    if(this._type === Angle.DEGREE){
      value *= (180/Math.PI);
    }
    return value;
  }

}

export default Angle;
