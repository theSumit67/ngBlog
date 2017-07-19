angular.module('ngBlog')

    .factory('AuthService', function($http, $window) {
        let login = function(data) {
            return $http.post('/user/login', data);
        };
        let saveToken = function(token) {
            $window.localStorage['mean-token'] = token;
        };

        let getToken = function() {
            return $window.localStorage['mean-token'];
        };

        let logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

        return {
            login: login,
            saveToken: saveToken,
            getToken: getToken,
            logout: logout
        };
    })