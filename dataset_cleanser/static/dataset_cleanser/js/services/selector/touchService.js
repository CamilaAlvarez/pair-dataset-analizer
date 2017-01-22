/**
 * Created by calvarez on 20-01-17.
 */

angular.module('cleanDatasetApp')
    .factory('touchService', touchService);

function touchService(){
    var bodyTouch = false;
    var cornerTouch = false;

    var setBodyTouch = function (state) {
        bodyTouch = state;
    };
    var setCornerTouch = function (state) {
        cornerTouch = state;
    };
    var getBodyTouch = function () {
        return bodyTouch;
    };
    var getCornerTouch = function () {
        return cornerTouch;
    };
    var unsetCurrentTouch = function () {
        bodyTouch = !bodyTouch ? bodyTouch : !bodyTouch;
        cornerTouch = !cornerTouch ? cornerTouch : !cornerTouch;
    };

    return {
        setBodyTouch: setBodyTouch,
        getBodyTouch: getBodyTouch,
        setCornerTouch: setCornerTouch,
        getCornerTouch: getCornerTouch,
        unsetCurrentTouch: unsetCurrentTouch
    }
}
