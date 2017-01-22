/**
 * Created by calvarez on 19-01-17.
 */



angular.module('cleanDatasetApp')
    .factory('Selector', Selector);


function Selector() {
    function Selector(x, y, width, height) {
        var obj = this;
        var location = {
            bbx_x: x,
            bbx_y: y,
            bbx_height: height,
            bbx_width: width
        };
        
        obj.updateSelector = function(x,y, width, height){
            location = {bbx_x: x, bbx_y:y, bbx_width: width, bbx_height:height}
        };

        obj.getLocation = function(){return location};
    }
    return {
        getSelector: function () {
            return new Selector(100,100,100,100);
        }
    }
}
