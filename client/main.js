angular.module('ngBlog', ['ui.router','ngFlash', 'ngAnimate', 'toaster'])

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
          user: function (AuthService, $state, Flash) {
            AuthService.logout();
            $state.go('login');
            Flash.create('success', 'Logged Out');
          }
        }
      })
      .state('home', {
        url: '/',
      });

      function _skipIfAuthenticated($rootScope,AuthService, $q, $state, Flash,toaster) {
        var defer = $q.defer();
        if (AuthService.getToken()) {
          defer.reject();
          toaster.pop('note', "", "Already LoggedIn");
        } else {
          defer.resolve();
        }
        return defer.promise;
      }

      function _redirectIfNotAuthenticated($rootScope,AuthService, $q, $state, Flash,toaster) {
        var defer = $q.defer();

        if (AuthService.getToken()) {
          defer.resolve();
        } else {
          $state.go('login');
          toaster.error({body:"Login Required"});
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


  