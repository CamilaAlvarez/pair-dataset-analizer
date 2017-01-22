/**
 * Created by calvarez on 13-01-17.
 */

angular
    .module('cleanDatasetApp')
    .controller('PairCtrl', PairCtrl);

PairCtrl.$inject = ['$scope','pairs','$mdDialog'];

function PairCtrl($scope, pairs, $mdDialog) {
    var vm = this;
    vm.setIsPair = function () {
        vm.pair.changeState(true);
        $scope.$broadcast('change-state');
    };
    vm.setIsNotPair = function () {
        vm.pair.changeState(false);
        $scope.$broadcast('change-state');
    };
    vm.showDialog = function(ev){
        $mdDialog.show({
            controller: BoundingBoxDialogCtrl,
            controllerAs: 'dialogCtrl',
            templateUrl: '/static/dataset_cleanser/angular-templates/createBoundingBoxDialog.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals:{
                pair: vm.pair,
                catalogImage: vm.pair.getCatalogImageSrc(),
                outdoorImage: vm.pair.getOutdoorImageSrc()
            },
            fullscreen: true
        }).then(function (boundingBoxes) {

        }, function () {
            console.log("Closed Dialog");
        })
    };
    $scope.$watch(vm.pairIndex, function(new_value){
        if(angular.isUndefined(vm.pairIndex))
            return;
        vm.pair = pairs.getPair(vm.pairIndex);
        $scope.$broadcast('change-state');
    });
}