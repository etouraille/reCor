app.controller('SubscribeWithEmail',
            [
                'settings',
                '$http',
                'AuthStorage',
                '$rootScope',
                '$scope',
                '$state'
                ,function(settings,$http, authstorage,$rootScope, $scope, $state){
       
            $scope.email = '';
            $scope.username = 'Anonymous';
            
            $scope.subscribe = function() {
                $http.post(
                    settings.endpoint + 'subscribe-with-email-only',
                    {email : $scope.email, username : $scope.username })
                    .success(function(data){
                        if(data.success) {
                            authstorage.persist(
                                data.email,
                                data.password,
                                data.salt,
                                data.id
                            );
                            $rootScope.$broadcast('logged');
                            $state.go('search');
                            //todo implement success message
                        } else {
                            $rootScope.$broadcast('unlogged');
                            //todo implement message
                        }                 
                    })
                    .error(function(data) {
                        $rootScope.$broadcast('unlogged');
                        //todo implement message and loggs
                    });
           
            };
    
}]);
