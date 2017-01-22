/**
 * Created by calvarez on 19-01-17.
 */
angular.module('cleanDatasetApp')
    .directive('pairIndex', pairIndex);


pairIndex.$inject = ['pairs'];

function pairIndex(pairs) {
        function link(scope, elem, attributes, controller){
            var pairIndex = parseInt(attributes['pairIndex'],10);
            controller.pairIndex = pairIndex;
            controller.pair = pairs.getPair(pairIndex);
        }

        return {
            restrict: 'A',
            controller: 'PairCtrl',
            controllerAs: 'pairCtrl',
            link: link,
            scope:true
        }
    }