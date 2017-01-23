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
    
    var originalBBCatalog = pair.getCatalogImage().bounding_box;
    var originalBBOutdoor = pair.getOutdoorImage().bounding_box;

    sharedImagesService.setImage('left', pair.getCatalogImage());
    sharedImagesService.setImage('right', pair.getOutdoorImage());
    vm.catalogImage = catalogImage;
    vm.outdoorImage = outdoorImage;
    vm.modifyCatalog = vm.pair.modifyCatalog;
    vm.modifyOutdoor = vm.pair.modifyOutdoor;
    vm.close = function () {
        vm.pair.getCatalogImage().bounding_box = originalBBCatalog;
        vm.pair.getOutdoorImage().bounding_box = originalBBOutdoor;
        $mdDialog.cancel();
    };
    vm.save = function(){
        vm.pair.changeState(true);
        vm.pair.modifyCatalog = vm.modifyCatalog;
        vm.pair.modifyOutdoor = vm.modifyOutdoor;
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