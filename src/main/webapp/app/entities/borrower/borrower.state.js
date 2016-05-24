(function() {
    'use strict';

    angular
        .module('ffbUiApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('borrower', {
            parent: 'entity',
            url: '/borrower?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Borrowers'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/borrower/borrowers.html',
                    controller: 'BorrowerController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }]
            }
        })
        .state('borrower-detail', {
            parent: 'entity',
            url: '/borrower/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Borrower'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/borrower/borrower-detail.html',
                    controller: 'BorrowerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Borrower', function($stateParams, Borrower) {
                    return Borrower.get({id : $stateParams.id});
                }]
            }
        })
        .state('borrower.new', {
            parent: 'borrower',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/borrower/borrower-dialog.html',
                    controller: 'BorrowerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                borrowerId: null,
                                borrowerFirstName: null,
                                borrowerLastName: null,
                                borrowerMiddleName: null,
                                borrowerSuffix: null,
                                borrowerSsn: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('borrower', null, { reload: true });
                }, function() {
                    $state.go('borrower');
                });
            }]
        })
        .state('borrower.edit', {
            parent: 'borrower',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/borrower/borrower-dialog.html',
                    controller: 'BorrowerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Borrower', function(Borrower) {
                            return Borrower.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('borrower', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('borrower.delete', {
            parent: 'borrower',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/borrower/borrower-delete-dialog.html',
                    controller: 'BorrowerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Borrower', function(Borrower) {
                            return Borrower.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('borrower', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
