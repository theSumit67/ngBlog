angular.module('ngBlog')

    .controller('loginController', function ($scope, $state, AuthService, Flash) {

        var vm = this;

        $scope.Login = function () {

            AuthService.login($scope.user)
                .then((res) => {
                        console.log(res.data);
                        if (res.data.success) {
                            AuthService.storeUserData(res.data.token, res.data.user.name);
                            $state.go('dashboard', {
                                param1: res.data.user.name
                            })
                            Flash.create('success', 'Login successfull');
                        } else{
                            Flash.create('danger', res.data.msg );
                        }
                    },
                    (err) => {
                        console.log('XX')
                    });
        }
    })