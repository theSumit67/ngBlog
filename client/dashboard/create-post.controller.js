angular.module('ngBlog')
    .controller('createPostController', function( $scope, $stateParams, PostService, toaster, $state) {

        var vm = this;

        vm.save = function(){
            
            if (vm.postForm.$valid ) {
                vm.post.content = vm.mdApi.getContent();
                if( vm.post.content.length < 9 ){
                    toaster.error({body:"Add post content"});
                    return ;
                }
                
                PostService.addPost( vm.post ).then(function(res){
                    if( res.data.success ){
                        toaster.info({body: res.data.msg });   
                        $state.go('dashboard');                 
                    } else{
                        toaster.error({body: res.data.msg });
                    }
                },
                function(res ){
                    console.log( res );
                });
            }
        }
        
        vm.publish = function(){

        };
    })