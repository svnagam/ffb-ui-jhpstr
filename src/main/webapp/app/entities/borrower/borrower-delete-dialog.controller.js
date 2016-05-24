(function() {
    'use strict';

    angular
        .module('ffbUiApp')
        .controller('BorrowerDeleteController',BorrowerDeleteController);

    BorrowerDeleteController.$inject = ['$uibModalInstance', 'entity', 'Borrower'];

    function BorrowerDeleteController($uibModalInstance, entity, Borrower) {
        var vm = this;
        vm.borrower = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Borrower.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
