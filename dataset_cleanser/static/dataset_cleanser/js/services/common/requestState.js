/**
 * Created by calvarez on 24-01-17.
 */
angular.module('cleanDatasetApp')
    .factory('requestState', requestState);

requestState.$inject = ['$mdDialog', '$rootScope'];
function requestState($mdDialog, $rootScope){
    var loading = false;
    function showWait() {
        $mdDialog.show({
            controller: ['$rootScope','$mdDialog',function($rootScope, $mdDialog){
                $rootScope.$on('hide-wait', function () {
                    $mdDialog.cancel();
                })
            }],
            template: '<md-dialog id="wait" style="background-color:transparent;box-shadow:none; height: 100px"><md-dialog-content style="height: inherit">' +
            '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait"></md-dialog-content>' +
            '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
            '</div>' +
            '</md-dialog>',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            fullscreen: false
        }).then(function (answer) {

        });
    }
    function hideWait() {
        $rootScope.$emit('hide-wait');
    }

    return{
        setLoading: function () {
            loading = true;
            showWait();

        },
        setLoaded: function () {
            loading = false;
            hideWait();
        },
        getState: function () {
            return loading;
        }
    }
    }