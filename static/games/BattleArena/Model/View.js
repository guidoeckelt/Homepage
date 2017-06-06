var View = (function () {

// private static                   var privateStaticVariable = ...

// Contructor
    var ctor = function () {
        var self = this; // prevents overlaping this-context
//      self.constructor.super.call(this[, params ... ] );

// private                          var privateVariable = ...
        var size;
        var canvas;
        var context;
        var delay = 1;
        var shouldInterupt = false;

// public instance only             self.method = function(...
//      Game-Interface
        self.loadDOM = function (placeholder) {
            size = View.calculateSize();
            canvas = document.createElement("canvas");
            canvas.width  = size.width;
            canvas.height = size.height;
            canvas.classList.add("scene");

            context = canvas.getContext("2d");

            var placeholderDOM = document.getElementById(placeholder);
            var parent = placeholderDOM.parentNode;
            parent.removeChild(placeholderDOM);
            parent.appendChild(canvas);
        };
//      Interaction
        self.startRender = function(){
            shouldInterupt = false;
            self.render();
        };
        self.stopRender = function () {
            shouldInterupt = true;
        };

        self.render = function () {
            context.clearRect(0,0,canvas.width, canvas.height);
            BattleArena.getCurrentMap().draw(context);
            self.drawObjects(BattleArena.getGameObjects());

            if(shouldInterupt){
                return;
            }
            window.setTimeout(function () { self.render(); }, delay);
        };

        self.drawObjects = function(gameObjects){
            for(var gameObject of gameObjects){
                if (GameObject.Type.FIGHTER == gameObject.getType()) {
                    self.drawFighter(gameObject);
                } else if (GameObject.Type.Projectile == gameObject.getType()) {
                    self.drawProjectile(gameObject);
                }
            }
        };
        self.drawFighter = function(fighter){
            var x = fighter.getPosition().getX();
            var y = fighter.getPosition().getY();
            var width = fighter.getWidth();
            var height = fighter.getHeight();
            context.fillStyle = "#ff0000";
            context.fillRect(x, y, width, height);
        };
        self.drawProjectile = function(projectile){
            var x = projectile.getPosition().getX();
            var y = projectile.getPosition().getY();
            var width = projectile.getWidth();
            var height = projectile.getHeight();
            context.fillStyle = "#0000ff";
            context.fillRect(x, y, width, height);
        };

// Getters & Setters                self.getVariable = function(...
        self.getSize = function(){ return size; };
        self.getCanvas = function(){ return canvas; };
        self.getContext = function(){ return context; };
    };

// public static                    ctor.method/Variable = ...
    ctor.calculateSize = function () {
        var border = 30;
        var menu = 100;
        var browserSize = { width : document.body.clientWidth, height: document.body.clientHeight};
        var usableSize = { width : browserSize.width-(border*2)-menu, height: browserSize.height-(border*2)};
        var screenFactor = 16/9;
        var calculatedSize = { width : usableSize.height*screenFactor, height: usableSize.height};
        if(calculatedSize.width> usableSize.width){
            calculatedSize.width = usableSize.width;
        }
        console.log("calculated Scene Size: "+calculatedSize.width+" "+calculatedSize.height);
        var staticSize = { width : 1000, height: 600};
        return calculatedSize;
    };


// public shared    name : value , ...
    ctor.prototype = {

    };

//  Inheritance
//  inherit(ctor, SUperCLass);
    return ctor;
})();