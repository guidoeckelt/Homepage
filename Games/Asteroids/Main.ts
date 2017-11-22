import Util from '../aalib/Util';
import Vector from '../aalib/Metric/Vector';
import Angle from '../aalib/Metric/Angle';
import Dimension from '../aalib/Metric/Dimension';
import Projectile from './Projectile';

let number = Util.randomNumberBetween(1,10);
let vector = new Vector(10, 10);
let angle = new Angle(Math.PI, Angle.RADIANS);
let size = new Dimension(10,10);
let gameObject = new Projectile(vector, angle);
console.dir(gameObject);