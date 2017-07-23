angular.module('ngBlog', ['ui.router','ngFlash', 'ngAnimate'])

  .config(function config($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('registration', {
        url: '/registration',
        templateUrl: 'registration/registration.html',
        controller: 'registrationController',
        resolve: {
          skipIfAuthenticated: _skipIfAuthenticated
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'loginController',
        resolve: {
          skipIfAuthenticated: _skipIfAuthenticated
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'dashboardController as dC',
        resolve: {
          redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        } 
      })
      .state('logout', {
        resolve: {
          user: function (AuthService, $state) {
            AuthService.logout();
            $state.go('login');
          }
        }
      })
      .state('home', {
        url: '/',
      });

      function _skipIfAuthenticated($rootScope,AuthService, $q, $state, Flash) {
        var defer = $q.defer();
        if (AuthService.getToken()) {
          //$state.go('dashboard');
          defer.reject();
          Flash.create('info', ' Already LoggedIn ');
        } else {
          //$timeout(function () {
          $state.go('login');
          //});
          defer.resolve();
        }
        return defer.promise;
      }

      function _redirectIfNotAuthenticated($rootScope,AuthService, $q, $state, Flash) {

        var defer = $q.defer();

        if (AuthService.getToken()) {
          defer.resolve();
        } else {
          //$timeout(function () {
          $state.go('login');
          Flash.create('danger', ' LogIn Required');
          //});
          defer.reject();
        }
        return defer.promise;
      }

    $httpProvider.interceptors.push(['$window', function interceptors($window) {
      return {
        'request': function (config) {
          config.headers = config.headers || {};
          if ($window.localStorage['mean-token']) {
            config.headers.Authorization = $window.localStorage['mean-token'];
          }
          return config;
        }
      };
    }]);
  });


  