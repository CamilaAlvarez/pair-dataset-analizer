/**
 * Created by calvarez on 20-01-17.
 */

angular.module('cleanDatasetApp')
    .directive('adaptableSize', adaptableSize);

adaptableSize.$inject = ['$compile'];

function adaptableSize($compile) {
    return{
        require: '^^selector',
        restrict: 'A',
        //Como no quiero exponer esta api a otra directiva, todo esto deberia pasar a la link
        controller: ['$scope','$rootScope','touchService', function ($scope, $rootScope, touchService) {
            var vm = this;
            vm.location = {startX:0, startY:0};
            vm.pressing = false;
            vm.disposition = $scope.location;
            vm.mouseDown = function(event){
                if(touchService.getCornerTouch())
                    return;
                vm.location.startX = event.x;
                vm.location.startY = event.y;
                vm.pressing = true;
                touchService.setBodyTouch(true);
                console.log(event)
            };
            vm.mouseUp = function(event){
                vm.pressing = false;
                touchService.setBodyTouch(false);
            };
            vm.mouseLeave = function (event){
                vm.pressing = false;
                touchService.setBodyTouch(false);
            };
            vm.mouseMove = function(event){
                if (vm.pressing){
                    var moveX = event.x-vm.location.startX;
                    var moveY = event.y-vm.location.startY;
                    $rootScope.$broadcast('move-rectangle-'+vm.disposition, {moveX:moveX, moveY:moveY});
                    vm.location.startX = event.x;
                    vm.location.startY = event.y;
                }
            };

        }],
        controllerAs: 'rectangleCtrl',
        link: function (scope, elem, attrs, controller) {
            elem.attr("ng-mousedown","rectangleCtrl.mouseDown($event)");
            elem.attr('ng-mouseup',"rectangleCtrl.mouseUp($event)");
            elem.attr('ng-mouseleave',"rectangleCtrl.mouseLeave($event)");
            elem.attr('ng-mousemove',"rectangleCtrl.mouseMove($event)");

            if(angular.isDefined(attrs.notReady)){
                elem.removeAttr('not-ready');
                $compile(elem)(scope);
            }
            scope.$on('updated-selector-'+controller.location, function (event, dimensions) {
                var e = elem[0];
                e.style.top = dimensions.bbx_y +'px';
                e.style.left = dimensions.bbx_x +'px';
                e.style.width = dimensions.bbx_width +'px';
                e.style.height = dimensions.bbx_height +'px';
            })
        }
    }
}