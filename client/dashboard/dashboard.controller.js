angular.module('ngBlog')
    .controller('dashboardController', function($scope,$stateParams, $http, Flash) {

        var vm = this;

        $http.get('/user/profile')
        .then(function(res){
            vm.user = res.data.user.name;
            console.log( res );
        },
        function(err){
            
        })

    })