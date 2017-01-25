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
            bbx_width: width,
            bbx_active: true
        };
        
        obj.updateSelector = function(x,y, width, height){
            location = {bbx_x: x, bbx_y:y, bbx_width: width, bbx_height:height, bbx_active:true}
        };

        obj.getLocation = function(){return location};
    }
    return {
        getSelector: function () {
            return new Selector(0,0,100,100);
        }
    }
}
