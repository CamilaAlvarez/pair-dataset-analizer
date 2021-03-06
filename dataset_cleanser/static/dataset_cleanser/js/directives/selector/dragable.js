/**
 * Created by calvarez on 19-01-17.
 */
angular.module('cleanDatasetApp')
    .directive('dragable', dragable);

dragable.$inject = ['$compile'];

function dragable($compile){
    function link(scope, elem, attrs, controller){
        var trueElem  = elem[0];
        trueElem.setAttribute("ng-mousedown", "dragCtrl.mouseDown($event)");
        trueElem.setAttribute("ng-mousemove", "dragCtrl.mouseMove($event)");
        trueElem.setAttribute("ng-mouseup", "dragCtrl.mouseUp($event)");
        if(angular.isDefined(attrs.notReady)){
            trueElem.removeAttribute('not-ready');
            $compile(trueElem)(scope);
        }

    }

    return{
        requiere:'^^selector',
        restrict: 'A',
        scope:{
            bordertype: '@'
        },
        controller: ['$scope', 'DragableBorder','$rootScope', 'touchService',
            function($scope, DragableBorder, $rootScope, touchService){
            var vm = this;
            vm.compiled = false;
            if(angular.isDefined($scope.bordertype)) {
                var borderType = DragableBorder($scope.bordertype);
                //Se necesita el $parent porque scope:{bordertype} ya define un $scope, y el del selector queda como padre
                vm.border = new borderType($scope.$parent.location);
            }

            vm.mouseDown = function(event){
                if(touchService.getBodyTouch())
                    return;
                var newX = event.x;
                var newY = event.y;
                vm.border.setLocation(newX, newY);
                touchService.setCornerTouch(true);
            };
            vm.mouseUp = function(event){
                touchService.setCornerTouch(false);
            };
            vm.mouseLeave = function (event) {
                if(vm.border.getState()) {
                    touchService.setCornerTouch(false);
                }
            };
            vm.mouseMove = function(event){
                if(touchService.getCornerTouch()){
                    vm.border.alert($rootScope, event.x, event.y);
                }
            };
            $(this).on('mouse-move', function (event, clickEvent) {
                vm.mouseMove(clickEvent);
            });
        }] ,
        controllerAs: 'dragCtrl',
        link: link
    }
}