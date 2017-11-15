var Battle = (function () {

// private static                   var privateStaticVariable = ...
    var gameObjects = new Array();
    var fighters = new Array();
    var map;


// Contructor
    var ctor = function (fightersValue,mapValue) {
        var self = this; // prevents overlaping this-context
//      self.constructor.super.call(this[, params ... ] );

// private                          var privateVariable = ...

        //GameLoop Stuff ...

// public instance only             self.method = function(...

//      Game-Interaction
//         self.start = function () {
//
//         };
//         self.pause = function(){
//
//         };
//         self.unpause = function () {
//
//         };
//         self.restart = function () {
//
//         };

        (function init() {
            switch (mapValue){
                case Config.Maps.THESHOWDOWN: map = new TheShowDown(); break;
            }
            for(var type of fightersValue){
                var posY = map.getSize().getHeight()/3;
                var posX = map.getSize().getWidth()/3;
                var fighter;
                switch (type){
                    case Config.Fighters.FIGHTER : fighter =
                        new Fighter(new Vector2D(posX, posY),new Vector2D(1,0));
                }
                BattleArena.addGameObject(fighter);
                fighters.push(fighter);
            }
        })();
// Getters & Setters                self.getVariable = function(...

    };

// public static                    ctor.method/Variable = ...
    ctor.getGameObjects = function(){ return gameObjects; };
    ctor.getFighters = function(){ return fighters; };
    ctor.getMap = function(){ return map; };

// public shared    name : value , ...
    ctor.prototype = {
        add : function (gameObject) {
            gameObjects.push(gameObject);
            console.log(gameObjects.length);
        },
        remove : function (gameObject) {
            gameObjects.splice(gameObjects.indexOf(gameObject),1);
            console.log(gameObjects.length);
        },
        createBindings : function () {

        }
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();