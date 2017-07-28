angular.module('ngBlog')
    .controller('createPostController', function( $scope, $stateParams, Flash) {

        var vm = this;

        vm.mdApi = null;

        vm.save = function(){
            console.log( vm.mdApi.getContent() );
        }
        
        vm.publish = function(){

        }


    })