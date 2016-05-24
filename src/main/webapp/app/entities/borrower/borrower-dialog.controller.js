(function() {
    'use strict';

    angular
        .module('ffbUiApp')
        .controller('BorrowerDialogController', BorrowerDialogController);

    BorrowerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Borrower'];

    function BorrowerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Borrower) {
        var vm = this;
        vm.borrower = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('ffbUiApp:borrowerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.borrower.id !== null) {
                Borrower.update(vm.borrower, onSaveSuccess, onSaveError);
            } else {
                Borrower.save(vm.borrower, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
