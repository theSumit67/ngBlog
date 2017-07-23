angular.module('ngBlog')

    .factory('AuthService', function($http, $window) {
        
        let login = function(data) {
            return $http.post('/user/login', data);
        };
        let storeUserData = function(token, user) {
            $window.localStorage['mean-token'] = token;
            $window.localStorage['mean-user'] = user;
        };

        let getToken = function() {
            return $window.localStorage['mean-token'];
        };

        let logout = function() {
            $window.localStorage.removeItem('mean-token');
            $window.localStorage.removeItem('mean-user');
        };

        return {
            login: login,
            storeUserData: storeUserData,
            getToken: getToken,
            logout: logout
        };
    })