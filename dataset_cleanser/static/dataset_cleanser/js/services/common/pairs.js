/**
 * Created by calvarez on 13-01-17.
 */

angular
    .module('cleanDatasetApp')
    .factory('pairs', ['Pair','$http', function(Pair, $http){
        var pairs = [];
        var totalPairs = 0;
        var loadPairs = function (page) {
            var loadPairsUrls = "/rest/page/";
            return $http.get(loadPairsUrls, {params:{page: page}})
                .then(function(response){
                    pairs = [];
                    var data = response.data;
                    totalPairs = data.count;
                    var data_pairs = data.pairs;
                    for (i in data_pairs){
                        var pair = data_pairs[i];
                        var modifyCatalog = true;
                        var modifyOutdoor = true;
                        if(pair.catalog_image.bounding_box != undefined)
                                modifyCatalog = pair.catalog_image.bounding_box.bbx_active;
                        if(pair.outdoor_image.bounding_box != undefined)
                                modifyOutdoor = pair.outdoor_image.bounding_box.bbx_active;
                        pairs.push(new Pair(pair.id, pair.catalog_image,
                            pair.outdoor_image, pair.is_pair, modifyCatalog, modifyOutdoor));
                    }
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
                })
        };
        var getPair = function (index) {
            return pairs[index];
        };
        var getTotalPairNumber = function () {
            return totalPairs;
        };
        var getPairs = function(){
            return pairs;
        };
        var updatePairs = function(){
            var changeStateUrl = "/rest/evaluate/";
            var pairs_data = [];
            for (index in pairs){
                var pair = pairs[index];
                var data = {id: pair.getId(),
                    evaluation: pair.state,
                    catalog_image: pair.getCatalogImage(),
                    outdoor_image: pair.getOutdoorImage()
                };
                pairs_data.push(data);
            }

            return $http.post(changeStateUrl, JSON.stringify(pairs_data))
                .then(function(response){
                    return response.data
                })
                .catch(function(error){
                    return error
                });
        };

        return {
            loadPairs: loadPairs,
            getPair: getPair,
            getTotalPairNumber: getTotalPairNumber,
            getPairs: getPairs,
            updatePairs: updatePairs
        }
    }]);