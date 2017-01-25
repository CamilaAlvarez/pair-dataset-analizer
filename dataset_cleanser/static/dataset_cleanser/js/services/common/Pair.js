/**
 * Created by calvarez on 13-01-17.
 */


function Pair(pairId, pairCatalogImage, pairOutdoorImage, is_pair, modifyCatalog, modifyOutdoor){
    var pair = this;
    pair.state = is_pair;
    var id = pairId;
    pair.catalogImage = pairCatalogImage;
    pair.outdoorImage = pairOutdoorImage;
    pair.modifyCatalog = modifyCatalog;
    pair.modifyOutdoor = modifyOutdoor;

    pair.getId = function () {
       return id;
    };
    pair.getCatalogImage = function () {
        console.log(pair.modifyCatalog)
        if (pair.catalogImage.bounding_box == null || !pair.modifyCatalog){
            var auxiliarImage = pair.catalogImage;
            auxiliarImage.bounding_box = undefined;
            return auxiliarImage;
        }
        return pair.catalogImage;
    };
    pair.getCatalogImageSrc = function () {
        return pair.catalogImage.image.image_location;
    };
    pair.getOutdoorImage = function () {
        if (pair.outdoorImage.bounding_box == null || !pair.modifyOutdoor){
            var auxiliarImage = pair.outdoorImage;
            auxiliarImage.bounding_box = undefined;
            return auxiliarImage;
        }
        return pair.outdoorImage;
    };
    pair.getOutdoorImageSrc = function () {
        return pair.outdoorImage.image.image_location;
    };
    pair.changeState = function (new_state) {
        pair.state = new_state
    };

    pair.setBBoxCatalog = function (bbox) {
        if(pair.modifyCatalog)
            pair.catalogImage.bounding_box = bbox;
    };
    pair.setBBoxOutdoor = function (bbox) {
        if(pair.modifyOutdoor)
            pair.outdoorImage.bounding_box = bbox;
    };
}

angular
    .module('cleanDatasetApp')
    .factory('Pair',  function () {
        return Pair;
    });