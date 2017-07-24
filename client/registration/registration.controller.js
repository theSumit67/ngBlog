angular.module('ngBlog')

  .controller('registrationController', function($scope, $http, $state, Flash){
    var vm = this;
    $scope.register = function(){
      console.info(' register called ');

      // move to service
      $http.post('/user/register', $scope.user)
      .then(function( res ){
        if( res.data.success ){
          $state.go('login');
          Flash.create('success', 'Register Successfull! Login to continue');
        } else{
          Flash.create('danger', res.data.msg );
        }
      },
      function( err ){
        console.log(err)
      });
    }
  })