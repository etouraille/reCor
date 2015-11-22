'use strict';  

app.controller('SubscribeController', [
    '$scope',
    '$http', 
    'settings',
    '$log',
    'AuthStorage', 
    '$state', function($scope,$http, settings,$log, storage, $state){

    $scope.user = {username : '', email : '', password1 : '', password2 : '' };
    $scope.error = false;


    $scope.subscribe = function (){
   
        $http.post(settings.endpoint + 'subscribe', $scope.user )
        .success(function(data){
            if(data.success){
                $log.log('User creation OK');
                $log.log('salt after login', JSON.stringify(data));
                storage.persist(
                    $scope.user.email, 
                    $scope.user.password1, 
                    data.message.salt
                );
                $state.go('home');
            }else{
                $log.log('problème while user creation');
                $scope.error = true;
            }
        }).error(function(data){
            $log.log('erro'+data+'message');
            $scope.error = true; // Substitute with event
        });
    };

}]);
