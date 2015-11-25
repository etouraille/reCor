app.controller('SubscribeController', [
    '$scope',
    '$http', 
    'settings',
    '$log',
    'AuthStorage', 
    '$state', 
    'Authentication',
    function($scope,$http, settings,$log, storage, $state, auth ){

    $scope.user = {username : '', email : '', password1 : '', password2 : '' };
    $scope.error = false;


    $scope.subscribe = function (){
   
        $http.post(settings.endpoint + 'subscribe', $scope.user )
        .success(function(data){
            if(data.success){
                storage.persist(
                    $scope.user.email, 
                    $scope.user.password1, 
                    data.message.salt
                );
                $log.log('User creation OK');
                //auth.login($scope.user.email, $scope.user.password1);
                // todo redirect realy to search
                $state.go('search');
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
