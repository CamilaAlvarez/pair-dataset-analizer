/**
 * Created by calvarez on 13-01-17.
 */

angular
    .module('cleanDatasetApp')
    .controller('PairContainerCtrl', PairContainerCtrl);

PairContainerCtrl.$inject = ['$scope', 'pairs', '$mdDialog', 'touchService'];
function PairContainerCtrl($scope, pairs, $mdDialog, touchService) {
    var vm = this;
    vm.loaded = false;
    pairs.loadPairs(1).then(function(valid) {
        if(valid){
            vm.totalPairs = pairs.getTotalPairNumber();
            vm.pairs = pairs.getPairs();
            vm.loaded = true;
        }
    });
    vm.oldPageNumber = 1;
    vm.pairsPerPage = 1;
    vm.rollback = false;
    vm.save = function () {
        pairs.updatePairs().then(function(response){
            var data = response;
            if(angular.isDefined(response.data))
                data = response.data;
            var status = data['status'];
            var alert;
            if(angular.isDefined(status) && status == '1'){
                alert = $mdDialog.alert({
                    title: 'Error',
                    textContent: 'Ha ocurrido un error',
                    ok: 'Cerrar'
                });
            }
            else{
                alert = $mdDialog.alert({
                    title: 'Éxito',
                    textContent: 'Los cambios han sido guardados correctamente',
                    ok: 'Cerrar'
                });
            }
            $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });
        })
    };
    vm.changePage = function () {
        if(vm.rollback) {
            vm.rollback = false;
            return;
        }
        pairs.updatePairs().then(function(response){
            var data = response;
            //Mal manejo de errores, deberia tener dos funciones separadas (parece que viene de como el server manda errores)
            if(angular.isDefined(response.data))
                data = response.data;
            var status = data['status'];
            var alert;
            if(angular.isDefined(status) && status == '1'){
                alert = $mdDialog.alert({
                    title: 'Error',
                    textContent: 'Ha ocurrido un error. No se pudo cambiar la página',
                    ok: 'Cerrar'
                });
                $mdDialog
                .show(alert)
                .finally(function () {
                    alert = undefined;
                });

                vm.pagination.current = vm.oldPageNumber;
                vm.rollback = true;
            }
            else{
                pairs.loadPairs(vm.pagination.current).then(function(valid) {
                    if(valid){
                        vm.totalPairs = pairs.getTotalPairNumber();
                        vm.pairs = pairs.getPairs();
                        vm.loaded = true;
                        vm.oldPageNumber = vm.pagination.current;
                    }
                });
            }
        })
    };


    window.onbeforeunload = function () {
        pairs.updatePairs().then( function () {
        });

        return false;
    };
}


