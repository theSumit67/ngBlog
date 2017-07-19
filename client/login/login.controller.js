angular.module('ngBlog')

    .controller('loginController', function($scope, AuthService) {

        var vm = this;
        
        $scope.Login = function() {

            console.log('login');

            AuthService.login($scope.user).
            then((res) => {
                console.log('SS')
                console.log(res)
            }).
            then(() => {
                console.log('XX')
            });
        }
    })