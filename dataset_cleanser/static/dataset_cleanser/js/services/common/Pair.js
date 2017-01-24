/**
 * Created by calvarez on 13-01-17.
 */


function Pair(pairId, pairCatalogImage, pairOutdoorImage, is_pair, modifyCatalog, modifyOutdoor){
    var pair = this;
    this.state = is_pair;
    var id = pairId;
    var catalogImage = pairCatalogImage;
    var outdoorImage = pairOutdoorImage;
    this.modifyCatalog = modifyCatalog;
    this.modifyOutdoor = modifyOutdoor;

    this.getId = function () {
       return id;
    };
    this.getCatalogImage = function () {
        if (catalogImage.bounding_box == null || !pair.modifyCatalog){
            var auxiliarImage = catalogImage;
            auxiliarImage.bounding_box = undefined;
            return auxiliarImage;
        }
        return catalogImage;
    };
    this.getCatalogImageSrc = function () {
        return catalogImage.image.image_location;
    };
    this.getOutdoorImage = function () {
        if (outdoorImage.bounding_box == null || !pair.modifyOutdoor){
            var auxiliarImage = outdoorImage;
            auxiliarImage.bounding_box = undefined;
            return auxiliarImage;
        }
        return outdoorImage;
    };
    this.getOutdoorImageSrc = function () {
        return outdoorImage.image.image_location;
    };
    this.changeState = function (new_state) {
        pair.state = new_state
    };
}

angular
    .module('cleanDatasetApp')
    .factory('Pair',  function () {
        return Pair;
    });