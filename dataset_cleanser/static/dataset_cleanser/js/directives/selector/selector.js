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
            vm.image = sharedImagesService.getImage(vm.location);
            vm.notifyChange = function(){
                $rootScope.$broadcast('updated-selector-'+vm.location, vm.selector.getLocation());
                vm.image['bounding_box'] = vm.selector.getLocation();
            };

        }],
        controllerAs: 'selectorCtrl',
        link: function (scope, elem, attrs, controller) {
            function checkConditions(newWidth, newHeight, newX, newY, currentLocation){
                var minDimension = 50;
                var width = getImageWidth(elem);
                if(newX+newWidth >= width){
                    newWidth = width - newX;
                }
                var height = getImageHeight(elem);
                if(newY+newHeight >= height){
                    newHeight = height - newY;
                }
                if(newWidth < minDimension){
                    newWidth = minDimension;
                    newX = currentLocation.bbx_x;
                }
                if(newHeight < minDimension){
                    newHeight = minDimension;
                    newY = currentLocation.bbx_y;
                }
                if(newX <= 0 ){
                    newX = 0;
                    newWidth = currentLocation.bbx_width;
                }
                if(newY <= 0){
                    newY = 0;
                    newHeight = currentLocation.bbx_height;
                }
                controller.selector.updateSelector(newX, newY, newWidth, newHeight);
                controller.notifyChange();
            }
            function getImageHeight(elem){
                return elem.parent()[0].querySelector(".modal-image").clientHeight
            }
            function getImageWidth(elem){
                return elem.parent()[0].querySelector(".modal-image").clientWidth
            }
            var l1 = scope.$on('top-left-'+scope.location, function (event,movement) {
                var currentLocation = controller.selector.getLocation();
                var newX = currentLocation.bbx_x + movement.moveX;
                var newWidth = currentLocation.bbx_width - movement.moveX;
                var newY = currentLocation.bbx_y + movement.moveY;
                var newHeight = currentLocation.bbx_height - movement.moveY;
                checkConditions(newWidth, newHeight, newX, newY, currentLocation);
            });
            var l2 = scope.$on('top-right-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newWidth = currentLocation.bbx_width + movement.moveX;
                var newY = currentLocation.bbx_y + movement.moveY;
                var newHeight = currentLocation.bbx_height - movement.moveY;
                checkConditions(newWidth, newHeight, currentLocation.bbx_x, newY, currentLocation);
            });
            var l3 = scope.$on('bottom-left-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newX = currentLocation.bbx_x + movement.moveX;
                var newWidth = currentLocation.bbx_width - movement.moveX;
                var newHeight = currentLocation.bbx_height + movement.moveY;
                checkConditions(newWidth, newHeight, newX, currentLocation.bbx_y, currentLocation);
            });
            var l4 = scope.$on('bottom-right-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newWidth = currentLocation.bbx_width + movement.moveX;
                var newHeight = currentLocation.bbx_height + movement.moveY;
                checkConditions(newWidth, newHeight, currentLocation.bbx_x, currentLocation.bbx_y, currentLocation);
            });
            var l5 = scope.$on('move-rectangle-'+scope.location, function (event, movement) {
                var currentLocation = controller.selector.getLocation();
                var newX = currentLocation.bbx_x + movement.moveX;
                var newY = currentLocation.bbx_y + movement.moveY;
                var width = currentLocation.bbx_width;
                var height = currentLocation.bbx_height;
                if(newX <= 0 ){
                    newX = 0;
                }
                if(newY <= 0){
                    newY = 0;
                }
                var imageWidth = getImageWidth(elem);
                if(newX+width >= imageWidth){
                    newX = imageWidth - width;
                }
                var imageHeight = getImageHeight(elem);
                if(newY+height >= imageHeight){
                    newY = imageHeight - height;
                }
                controller.selector.updateSelector(newX, newY, width, height);
                controller.notifyChange();
            });

            scope.$on('destroy', function () {
                l1();
                l2();
                l3();
                l4();
                l5();
            })
        }
    }
}