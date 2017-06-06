var BattleMap = (function () {

// private static                   var privateStaticVariable = ...

// Contructor
    var ctor = function (sizeValue) {
        var self = this; // prevents overlaping this-context

// private                          var privateVariable = ...
        var size = sizeValue;

// public instance only             self.method = function(...


// Getters & Setters                self.getVariable = function(...
        self.getSize = function(){ return size; };

    };

// public static                    ctor.method/Variable = ...

// public shared    name : value , ...
    ctor.prototype = {
        draw : function (context) {
            this.drawBackground(context);
            this.drawObstacles(context);
        },
//      BattleMap-Interface
        drawBackground : function (context) {
            context.fillStyle = "#000000";
            var border = 5;
            var blockSize = 2;
            var posX = 0,posY= 0;
            // if(this.getSize().getWidth() < context.canvas.width){
            //     posX = (context.canvas.width/2)-(this.getSize().getWidth()/2);
            // }
            // if(this.getSize().getHeight() < context.canvas.height){
            //     posY = (context.canvas.height/2)-(this.getSize().getHeight()/2);
            // }
            for(var y = posY+border;y < this.getSize().getHeight();y+=10){
                for(var x = posX+border;x < this.getSize().getWidth();x+=10){
                    context.fillRect(x, y, blockSize, blockSize);
                }
            }

        },
        drawObstacles : function (context) {
//      Nothing in here, needs to be overriden
        }
    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();