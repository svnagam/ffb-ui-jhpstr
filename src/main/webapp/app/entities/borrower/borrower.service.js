(function() {
    'use strict';
    angular
        .module('ffbUiApp')
        .factory('Borrower', Borrower);

    Borrower.$inject = ['$resource'];

    function Borrower ($resource) {
        var resourceUrl =  'ffbrw/' + 'api/borrowers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
