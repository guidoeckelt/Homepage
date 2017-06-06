var game;
var BattleArena = (function () {

// private static var
    var currentBattle;
    var gameObjects = new Array();
    var fighters = new Array();
    var currentMap;

// Contructor
    var ctor = function (domPlaceHolder) {
        game = this;
        var self = this; // prevents overlaping this-context

// private              var privateVariable
        var config = new Config();
        var view = new View();
        var keyContext = new KeyContext();

        var delay = 20;
        var shouldInterupt = false;

// public instance only
//      Game
        self.start = function () {
            var chosenPlatform = Start.choosePlatform();
            var chosenFighters = Start.chooseFighters();
            var chosenMap = Start.chooseMap();
            Start.initBattle(chosenPlatform,chosenFighters,chosenMap);
        };
//      Start Battle
        var Start = {
            choosePlatform : function () {
                var chosenPlatform = Config.Platforms.LOCALBATTLE;
                return chosenPlatform;
            },
            chooseFighters : function () {
                var chosenFighters = new Array();
                chosenFighters.push(Config.Fighters.FIGHTER);
                return chosenFighters;
            },
            chooseMap : function (){
                var chosenMap = Config.Maps.THESHOWDOWN;
                return chosenMap;
            },
            initBattle : function (chosenPlatform, chosenFighters, chosenMap) {
                switch (chosenMap){
                    case Config.Maps.THESHOWDOWN: currentMap = new TheShowDown(); break;

                }
                for(var type of chosenFighters){
                    var posY = currentMap.getSize().getHeight()/3;
                    var posX = currentMap.getSize().getWidth()/3;
                    var fighter;
                    switch (type){
                        case Config.Fighters.FIGHTER : fighter =
                            new Fighter(new Vector2D(posX, posY),new Vector2D(1,0));
                    }
                    BattleArena.addGameObject(fighter);
                    fighters.push(fighter);
                }
                switch(chosenPlatform){
                    case Config.Platforms.LOCALBATTLE : currentBattle =
                        new LocalBattle(chosenFighters,chosenMap); break;
                }
                var bindings = currentBattle.createBindings();
                self.getKeyContext().applyBindings(bindings);
                // currentBattle.start();

                shouldInterupt = false;
                gameLoop();
                view.startRender();
            }
        };
        self.pause = function () {
            self.getKeyContext().screwBindings();
            // currentBattle.pause();
            shouldInterupt = true;
            view.stopRender();
        };
        self.unpause = function(){

        };
        self.restart = function () {

        };

//      GameLoop
        var gameLoop = function (timeStamp) {
            if(self.getKeyContext().actionsTriggered[Config.shoot] == true){
                BattleArena.getFighters()[0].shoots();
            }
            moveGameObjects();
            gravity();

            if(self.shouldInterupt()){
                return;
            }
            window.setTimeout(function () { gameLoop(); },delay);
            //window.requestAnimationFrame(function(){ self.gameLoop(); });
        };
        var gravity = function(){
            var gameObjects = BattleArena.getGameObjects();
            for(var i = 0;i < gameObjects.length;i++){
                var gameObject = gameObjects[i];
                //gameObject.fall();
            }
        };
        var moveGameObjects = function () {
            var gameObjects = BattleArena.getGameObjects();
            for(var i = 0;i < gameObjects.length;i++){
                var gameObject = gameObjects[i];
                if (GameObject.Type.FIGHTER == gameObject.getType()) {
                    if (self.getKeyContext().actionsTriggered[Config.moveLeft[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveLeft[1]] == true) {
                        gameObject.move(new Vector2D(-1, 0));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveTop[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveTop[1]] == true) {
                        gameObject.jump();
                        // gameObject.move(new Vector2D(0, -1));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveRight[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveRight[1]] == true) {
                        gameObject.move(new Vector2D(1, 0));
                    }
                    if (self.getKeyContext().actionsTriggered[Config.moveBottom[0]] == true
                        || self.getKeyContext().actionsTriggered[Config.moveBottom[1]] == true) {
                        gameObject.move(new Vector2D(0, 1));
                    }
                } else if (GameObject.Type.Projectile == gameObject.getType()) {
                    if (GameObject.State.OUTOFBOUNDS == gameObject.move()) {
                        BattleArena.removeGameObject(gameObject);
                    }
                }
            }
        };

        (function init() {
            view.loadDOM(domPlaceHolder);
        })();
// Getters & Setters
        self.getConfig = function(){ return config; };
        self.getView = function(){ return view; };
        self.getKeyContext = function(){ return keyContext; };
        self.shouldInterupt = function(){ return shouldInterupt; };
    };

// public static
    ctor.getCurrentBattle = function () { return currentBattle; };
    ctor.getGameObjects = function () { /*return currentBattle.getGameObjects()*/return gameObjects; };
    ctor.getCurrentMap = function () { /*return currentBattle.getMap()*/ return currentMap; };
    ctor.getFighters= function () { /*return currentBattle.getFighters()*/return fighters; };

    ctor.addGameObject = function (gameObject) {
        if (GameObject != gameObject.constructor.super) {
            // TODO ExceptionContext
            ExceptionContext.throw(new Exception("Object is not a GameObject"));
            //return;
        }
        if(null != currentBattle){
            currentBattle.add(gameObject);
        }
        gameObjects.push(gameObject);
        console.log(gameObjects.length);
    };
    ctor.removeGameObject = function(gameObject){
        if (GameObject != gameObject.constructor.super) {
            // TODO ExceptionContext
            ExceptionContext.throw(new Exception("Object is not a GameObject"));
            // return;
        }
        if(null != currentBattle){
            currentBattle.remove(gameObject);
        }
        gameObjects.splice(gameObjects.indexOf(gameObject),1);
        console.log(gameObjects.length);
    };

// public shared
    ctor.prototype = {
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();