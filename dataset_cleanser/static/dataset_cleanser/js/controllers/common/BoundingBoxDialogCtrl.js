/**
 * Created by calvarez on 18-01-17.
 */
angular.module('cleanDatasetApp')
    .controller('BoundingBoxDialogCtrl', BoundingBoxDialogCtrl);

BoundingBoxDialogCtrl.$inject = ['$rootScope', '$mdDialog', 'sharedImagesService','pair', 'catalogImage', 'outdoorImage',
'touchService'];

function BoundingBoxDialogCtrl($rootScope, $mdDialog, sharedImagesService, pair, catalogImage, outdoorImage, touchService){
    var vm = this;
    vm.pair = pair;
    
    var originalBBCatalog = pair.catalogImage.bounding_box;
    var originalBBOutdoor = pair.outdoorImage.bounding_box;

    sharedImagesService.setImage('left', pair.catalogImage);
    sharedImagesService.setImage('right', pair.outdoorImage);
    vm.catalogImage = catalogImage;
    vm.outdoorImage = outdoorImage;
    vm.modifyCatalog = vm.pair.modifyCatalog;
    vm.modifyOutdoor = vm.pair.modifyOutdoor;
    vm.close = function () {
        vm.pair.setBBoxCatalog(originalBBCatalog);
        vm.pair.setBBoxOutdoor(originalBBOutdoor);
        $mdDialog.cancel();
    };
    vm.save = function(){
        vm.pair.changeState(true);
        vm.pair.modifyCatalog = vm.modifyCatalog;
        vm.pair.modifyOutdoor = vm.modifyOutdoor;
        vm.pair.setBBoxCatalog(sharedImagesService.getImage('left').bounding_box);
        vm.pair.setBBoxOutdoor(sharedImagesService.getImage('right').bounding_box);
        $rootScope.$broadcast('change-state');
        $mdDialog.cancel();
    };
    vm.mouseUp = function(event){
        touchService.unsetCurrentTouch();
    };
    vm.mouseMove = function(event){
        if(touchService.getBodyTouch() || touchService.getCornerTouch())
            $rootScope.$broadcast('mouse-move', {clickEvent: event});
    }
}