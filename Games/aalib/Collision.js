class Collision{
  constructor(){

  }

  static doesObjectsInterfere(object1, object2){
    if(object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width){
        if(object1.position.y + object1.height >= object2.position.y &&
            object1.position.y <= object2.position.y + object2.height){
              return true;
        }
    }
    return false;
  }
}
