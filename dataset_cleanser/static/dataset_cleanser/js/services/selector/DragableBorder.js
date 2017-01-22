/**
 * Created by calvarez on 19-01-17.
 */
function DragableBorder(location_in_view){
    var location = {x:0, y:0};
    var started = false;
    var dispositon = location_in_view;

    this.changeState = function () {
        started = !started
    };
    this.getLocation = function () {
        return location;
    };
    this.setLocation = function (x, y) {
        location = {x:x, y:y}
    };
    this.getState = function () {
        return started;
    };
    this.sendAlert = function(text, scope, x, y){
        var moveX = x-location.x;
        var moveY = y-location.y;
        this.setLocation(x,y);
        return scope.$broadcast(text+'-'+dispositon, {moveX:moveX, moveY: moveY});
    }
}

function DragableBorderTopLeft(location_in_view){
    DragableBorder.call(this, location_in_view);
}
function DragableBorderTopRight(location_in_view){
    DragableBorder.call(this, location_in_view);
}
function DragableBorderBottomLeft(location_in_view){
    DragableBorder.call(this, location_in_view);
}
function DragableBorderBottomRight(location_in_view){
    DragableBorder.call(this, location_in_view);
}

DragableBorderTopLeft.prototype = new DragableBorder();
DragableBorderTopRight.prototype = new DragableBorder();
DragableBorderBottomLeft.prototype = new DragableBorder();
DragableBorderBottomRight.prototype = new DragableBorder();

DragableBorderTopLeft.prototype.alert = function (scope, x, y) {
    return this.sendAlert('top-left', scope, x, y);
};
DragableBorderTopRight.prototype.alert = function (scope, x, y) {
    return this.sendAlert('top-right', scope, x, y);
};
DragableBorderBottomLeft.prototype.alert = function (scope, x, y) {
    return this.sendAlert('bottom-left', scope, x, y);
};
DragableBorderBottomRight.prototype.alert = function (scope, x, y) {
    return this.sendAlert('bottom-right', scope, x, y);
};

angular.module('cleanDatasetApp')
    .factory('DragableBorder', function () {
        return function (borderType) {
            switch (borderType){
                case 'top-left':
                    return DragableBorderTopLeft;
                case 'top-right':
                    return DragableBorderTopRight;
                case 'bottom-left':
                    return DragableBorderBottomLeft;
                case 'bottom-right':
                    return DragableBorderBottomRight;

            }
        }
    });