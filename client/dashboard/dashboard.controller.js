'use strict';
angular.module('ngBlog')
    .controller('dashboardController', function( $scope, $stateParams, $http, Flash, toaster) {

        var vm = this;

        $http.get('/user/profile')
        .then(function(res){
            vm.user = res.data.user.name;
        },
        function(err){ })
        
        function loadAll(){
            $http.get('/post/listPost')
            .then(function(res){
                vm.postList = res.data;
            },
            function(err){ })
        }
        loadAll();

        vm.deletePost = function(id){
            $http.get('/post/delete-post/' + id)
            .then(function(res){
                toaster.info( res.data );  
                loadAll();
            },
            function(err){ })
    
        }


    })