/**
 * Created by calvarez on 19-01-17.
 */

angular.module('cleanDatasetApp')
    .directive('selector', selector);


function selector(){
    return{
        scope:{
            location: '@'
        },
        restrict: 'E',
        templateUrl: "/static/dataset_cleanser/angular-templates/selector-template.html",
        controller: ['$scope','Selector','$rootScope','sharedImagesService',
            function($scope, Selector, $rootScope, sharedImagesService){
            var vm = this;
            vm.selector = Selector.getSelector();
            vm.location = $scope.location;
            vm.notifyChange = function(){
                $rootScope.$broadcast('updated-selector-'+vm.location, vm.selector.getLocation());
                var image = sharedImagesService.getImage(vm.location);
                image['bounding_box'] = vm.selector.getLocation();
            };

        }],
        controllerAs: 'selectorCtrl',
        link: function (scope, elem, attrs, controller) {
            function checkConditions(newWidth, newHeight, newX, newY, currentLocation){
                if(newWidth < 36){
                    newWidth = 36;
                    newX = currentLocation.bbx_x;
                }
                if(newHeight < 36){
                    newHeight = 36;
                    newY = currentLocation.bbx_y;
                }
                if(newX <= 0 ){
                    newX = 0;
                }
                if(newY <= 0){
                    newY = 0;
                }
                controller.selector.updateSelector(newX, newY, newWidth, newHeight);
                controller.notifyChange();
            }
            scope.$on('top-left-'+scope.location, function (event,movement) {
                var currentLocation = controller.selector.getLocation();
                var newX = currentLocation.bbx_x + movement.moveX;
                var newWidth = currentLocation.bbx_width - movement.moveX;
                var newY = currentLocation.bbx_y + movement.moveY;
                var newHeight = currentLocation.bbx_height - movement.moveY;
                checkConditions(newWidth, newHeight, newX, newY, currentLocation);
            });
            scope.$on('top-right-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newWidth = currentLocation.bbx_width + movement.moveX;
                var newY = currentLocation.bbx_y + movement.moveY;
                var newHeight = currentLocation.bbx_height - movement.moveY;
                checkConditions(newWidth, newHeight, currentLocation.bbx_x, newY, currentLocation);
            });
            scope.$on('bottom-left-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newX = currentLocation.bbx_x + movement.moveX;
                var newWidth = currentLocation.bbx_width - movement.moveX;
                var newHeight = currentLocation.bbx_height + movement.moveY;
                checkConditions(newWidth, newHeight, newX, currentLocation.bbx_y, currentLocation);
            });
            scope.$on('bottom-right-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newWidth = currentLocation.bbx_width + movement.moveX;
                var newHeight = currentLocation.bbx_height + movement.moveY;
                checkConditions(newWidth, newHeight, currentLocation.bbx_x, currentLocation.bbx_y, currentLocation);
            });
            scope.$on('move-rectangle-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newX = currentLocation.x + movement.moveX;
                var newY = currentLocation.y + movement.moveY;
                if(newX <= 0 ){
                    newX = 0;
                }
                if(newY <= 0){
                    newY = 0;
                }
                controller.selector.updateSelector(newX, newY, currentLocation.bbx_width, currentLocation.bbx_height);
                controller.notifyChange();
            })
        }
    }
}