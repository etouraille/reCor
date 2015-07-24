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
    '$rootScope',
    function($log, $http, md5, $cookieStore, $q , settings, encryption , storage, $state, $rootScope){
    
    return {

    getSaltFromServer : function (username) {
        var deferred = $q.defer();
        $log.log(username);
        $http.post(settings.endpoint + 'salt', {username : username})
            .success(function(data,err){
                if(data.success) {
                    deferred.resolve({ salt: data.salt, id: data.id });
                } else {
                    deferred.reject(data.error);
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
            .then(function(userData){
                var _wsse_key = encryption.getWsseHeader(username, password, userData.salt );
                var _http_config = {
                    'method': 'GET',
                    'url': settings.endpoint + 'logged-area/ping',
                    'headers': { 
                        'x-wsse': _wsse_key,
                       //'Authorization' : 'WSSE profile="UsernameToken"'
                    }
                };
                $log.log('x-wsse'+_wsse_key);
                //return;
                $http(_http_config)
                    .success(function(data){
                        if(data.success){
                            deferred.resolve( userData );
                        }else{
                            deferred.reject(data);
                        }
                    })
                    .error(function(data){
                        deferred.reject(data);
                    });
            
            },function(reason){
                deferred.reject(reason+'salt not available for this user');
            
            });
        return deferred.promise;
    },

    login : function(username, password) {
        var deferred = $q.defer();
        $log.log('pass login', password);
        this.getSaltAndLogin( username, password).then(function(data){
            $log.log('user logged'); 
                $rootScope.$broadcast('logged');
                $log.log(data);
                storage.persist(username, password, data.salt, data.id );
                deferred.resolve(true);
            }, function (reason) {
            $log.log('failure while login process'+ reason );
            deferred.reject(reason);
            $rootScope.$broadcast('unlogged');
        });
        return deferred.promise;
    },

    redirectToLogin : function (){
        $state.go('login');
    },

    isLogged : function() {
        var userAuthObject = storage.get();
        if(typeof userAuthObject === 'object') { 
            return true;
        } else { 
            return false;
        }
    },
    unlog : function() {
        storage.clean();
        $rootScope.$broadcast('unlogged');
    }

    };
}]);
