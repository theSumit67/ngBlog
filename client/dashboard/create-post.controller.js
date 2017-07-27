angular.module('ngBlog')
    .controller('createPostController', function( $scope, $stateParams, Flash) {

        var vm = this;

        vm.save = function(){
            console.log( $scope.postContent )
        }
        
        vm.publish = function(){

        }


    })