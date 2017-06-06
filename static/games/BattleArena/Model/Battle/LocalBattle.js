var LocalBattle = (function () {

// private static                   var privateStaticVariable = ...
    var playerOne;
    var playerTwo;

// Contructor
    var ctor = function (fightersValue, mapValue) {
        var self = this; // prevents overlaping this-context
        self.constructor.super.call(this,fightersValue,mapValue);

// private                          var privateVariable = ...
        var delay = 20;
        var shouldPause = false;

        var gameLoop = function (timeStamp) {
            if(game.getKeyContext().actionsTriggered[Config.shoot] == true){
                playerOne.shoots();
            }
            moveGameObjects();
            gravity();

            if(shouldPause){
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
            var currentGameObjects = Array.from(gameObjects);
            for(var i = 0;i < currentGameObjects.length;i++){
                var gameObject = currentGameObjects[i];
                if (GameObject.Type.FIGHTER == gameObject.getType()) {
                    if (game.getKeyContext().actionsTriggered[Config.moveLeft[0]] == true
                        || game.getKeyContext().actionsTriggered[Config.moveLeft[1]] == true) {
                        gameObject.move(new Vector2D(-1, 0));
                    }
                    if (game.getKeyContext().actionsTriggered[Config.moveTop[0]] == true
                        || game.getKeyContext().actionsTriggered[Config.moveTop[1]] == true) {
                        gameObject.jump();
                        // gameObject.move(new Vector2D(0, -1));
                    }
                    if (game.getKeyContext().actionsTriggered[Config.moveRight[0]] == true
                        || game.getKeyContext().actionsTriggered[Config.moveRight[1]] == true) {
                        gameObject.move(new Vector2D(1, 0));
                    }
                    if (game.getKeyContext().actionsTriggered[Config.moveBottom[0]] == true
                        || game.getKeyContext().actionsTriggered[Config.moveBottom[1]] == true) {
                        gameObject.move(new Vector2D(0, 1));
                    }
                } else if (GameObject.Type.Projectile == gameObject.getType()) {
                    if (GameObject.State.OUTOFBOUNDS == gameObject.move()) {
                        self.remove(gameObject);
                    }
                }
            }
        };
// public instance only             self.method = function(...
//      Game-Interaction
        self.start = function () {
            for(var fighter of self.getFighters()){
                if(self.getFighters().indexOf(fighter) == 0){
                    playerOne = fighter;
                }else{
                    playerTwo = fighter;
                }
            }
            shouldPause = false;
            gameLoop();
        };
        self.pause = function(){
            shouldPause = true;
        };
        self.unpause = function () {

        };
        self.restart = function () {

        };


        (function init() {
        })();
// Getters & Setters                self.getVariable = function(...

    };

// public static                    ctor.method/Variable = ...
    ctor.getPlayerOne = function(){ return playerOne; };
    ctor.getPlayerTwo = function(){ return playerTwo; };

// public shared    name : value , ...
    ctor.prototype = {

    };

//  Inheritance
    inherit(ctor, Battle);
    return ctor;
})();