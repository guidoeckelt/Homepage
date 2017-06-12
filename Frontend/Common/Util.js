/**
 * Created by Guido on 21.05.2017.
 */

export const Util = {

    isUrlValid: function (myVar) {
        if (this.isNull(myVar)) {
            return false;
        }
        if (this.isString(myVar)) {
            return false;
        }
        return typeof myVar === 'string' || myVar instanceof String;
    },
    isString: function (myVar) {
        if (this.isNull(myVar)) {
            return false;
        }
        return typeof myVar === 'string' || myVar instanceof String;
    },
    isNull: function (myVar) {
        if (this.link.url === null) {
            return false;
        }
        if (this.link.url === undefined) {
            return false;
        }
        return true;
    }

};





