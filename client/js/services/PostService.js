'use strict';
angular.module('ngBlog')

    .factory('PostService', function($http, $window) {
        
        let addPost = function(data) {
            return $http.post('/post/addPost', data);
        };

        let listPost = function() {
            return $http.get('/post/listPost');
        }
        let listAllPost = function(data) {}
        

        return {
            addPost: addPost,
            listPost: listPost,
            listAllPost: listAllPost
        };
    })