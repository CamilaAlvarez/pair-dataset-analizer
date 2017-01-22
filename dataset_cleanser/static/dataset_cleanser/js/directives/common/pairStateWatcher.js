/**
 * Created by calvarez on 13-01-17.
 */

angular
    .module('cleanDatasetApp')
    .directive('pairStateWatcher', function () {
        function setState(elem, controller){
            if(angular.isUndefined(controller.pair))
                return;
            
            if(controller.pair.state == 1){
                elem.addClass('is-pair');
                elem.removeClass('is-not-pair');
            }
            else if (controller.pair.state == 0){
                elem.addClass('is-not-pair');
                elem.removeClass('is-pair');
            }
        }
        function link(scope, elem, attributes, controller){
            var deregisterListener = scope.$on('change-state', function () {
                setState(elem,controller);
            });
            scope.$on('$destroy', function () {
               deregisterListener();
            })
        }

        return {
            restrict : 'A',
            controller: 'PairCtrl',
            controllerAs: 'pairCtrl',
            link: link
        }
    });