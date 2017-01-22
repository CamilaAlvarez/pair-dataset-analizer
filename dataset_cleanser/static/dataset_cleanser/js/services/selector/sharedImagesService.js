/**
 * Created by calvarez on 21-01-17.
 */

angular.module('cleanDatasetApp')
    .factory('sharedImagesService', function(){
        var images= {};
        var setImage = function (key, image_obj) {
            images[key] = image_obj;
        };
        var getImage = function (key) {
            return images[key];
        };

        return {
            setImage: setImage,
            getImage: getImage
        }
    });