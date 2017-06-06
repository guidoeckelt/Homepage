var example = (function () {

// private static                   var privateStaticVariable = ...

// Contructor
    var ctor = function () {
        var self = this; // prevents overlaping this-context
//      self.constructor.super.call(this[, params ... ] );

// private                          var privateVariable = ...


// public instance only             self.method = function(...


    (function init() {

    })();
// Getters & Setters                self.getVariable = function(...

    };

// public static                    ctor.method/Variable = ...

// public shared    name : value , ...
    ctor.prototype = {

    };

//  Inheritance
//  inherit(ctor, SuperClass);
    return ctor;
})();