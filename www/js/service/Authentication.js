'use strict';

app.factory('Authentication', [
    '$log', 
    '$http', 
    'md5', 
    '$cookieStore', 
    '$q', 
    'settings',
    'Encryption',
    'AuthStorage',
    '$state',
    function($log, $http, md5, $cookieStore, $q , settings, encryption , storage, $state){
    
    return {

    getSaltFromServer : function (username) {
        var deferred = $q.defer();
        console.log(username);
        $http.post(settings.endpoint+'salt', {username : username})
            .success(function(data,err){
                if(data.success) {
                    deferred.resolve(data.salt);
                } else {
                    deferred.reject(data.error)
                }
             }).error(function(data){
                deferred.reject(data);
             });
        return deferred.promise;
    },

    getSaltAndLogin : function (username, password) {
        // test login first before putting identifiant.
        // if not correct redirect to login page with error message.
        var deferred = $q.defer();
        var self = this;
        $log.log('pass',password);

        self.getSaltFromServer(username)
            .then(function(salt){
                var _wsse_key = encryption.getWsseHeader(username, password, salt);
                var _http_config = {
                    'method': 'GET',
                    'url': settings.endpoint + 'logged-area/ping',
                    'headers': { 
                        'x-wsse': _wsse_key,
                        'Authorization' : 'WSSE profile="UsernameToken"'
                        }
                }
                $log.log('x-wsse',_wsse_key);
                //return;
                $http(_http_config)
                    .success(function(data){
                        if(data.success){
                            deferred.resolve(salt);
                        }else{
                            deferred.reject(data.message);
                        }
                    })
                    .error(function(data){
                        deferred.reject(data.message)
                    });
            
            },function(reason){
                deferred.reject(reason+'salt not available for this user');
            
            });
        return deferred.promise;
    },

    login : function(username, password) {
        $log.log('pass login', password);
        this.getSaltAndLogin( username, password).then(function(salt){
            $log.log('user logged'); 
                storage.persist(username, password, salt );
            }, function (reason) {
            $log.log('failure while login process', reason );        
        })
    },

    redirectToLogin : function (){
        $state.go('login');
    },

    unlog : function () {
       $cookies.remove('auth'); 
    }

    }
}]);
