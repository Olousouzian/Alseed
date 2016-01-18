'use strict';

describe('app.home.home-controller', function() {
    beforeEach(module('app'));
    var $controller,
        $rootScope,
        $scope,
        controller;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();
        controller = $controller('HomeController', {
            $scope: $scope
        });
    });

    describe('init function', function() {
        it('should initialize', function() {
            expect(controller).toBeDefined();
        });
    });
});
