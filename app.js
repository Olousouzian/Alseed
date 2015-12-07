(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', "angularSpinner"])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/forget', {
                controller: 'ForgetController',
                templateUrl: 'forget/forget.view.html',
                controllerAs: 'vm'
            })

            .when('/not-found', {
                controller: 'NotFoundController',
                templateUrl: 'notFound/notFound.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/not-found' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$q'];
    function run($rootScope, $location, $cookieStore, $http) {
        // Keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // Redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/forget']) === -1;
            $rootScope.menuAvalaible = restrictedPage;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();