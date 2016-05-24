'use strict';

describe('Controller Tests', function() {

    describe('Borrower Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockBorrower;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockBorrower = jasmine.createSpy('MockBorrower');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Borrower': MockBorrower
            };
            createController = function() {
                $injector.get('$controller')("BorrowerDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'ffbUiApp:borrowerUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
