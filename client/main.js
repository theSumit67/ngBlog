
	
	angular.module('ngBlog', ['ui.router'])

	.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('registration', {
      url: '/registration', // to show
      templateUrl: 'registration/registration.html',
      controller: 'registrationController',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'loginController',
    })
    .state('home', {
      url: '/',
    })
  });


