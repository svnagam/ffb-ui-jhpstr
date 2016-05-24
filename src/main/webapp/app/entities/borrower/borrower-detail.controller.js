(function() {
    'use strict';

    angular
        .module('ffbUiApp')
        .controller('BorrowerDetailController', BorrowerDetailController);

    BorrowerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Borrower'];

    function BorrowerDetailController($scope, $rootScope, $stateParams, entity, Borrower) {
        var vm = this;
        vm.borrower = entity;
        
        var unsubscribe = $rootScope.$on('ffbUiApp:borrowerUpdate', function(event, result) {
            vm.borrower = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
