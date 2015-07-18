app.controller('ChangePasswordController', [
    '$stateParams',
    '$http',
    'settings',
    '$state',
    '$scope',
    function($stateParams, $http, settings, $state, $scope ) {
        $scope.changePassword = function(){
            
            $http.post(settings.endpoint + 'forgotten/changepassword', {
                token : $stateParams.token,
                password1 : $scope.password1,
                password2 : $scope.password2
            })
            .success(function(data){
                if(data.success) {
                    $state.go('login');
                } else {
                    // todo : display error message
                }
            });
        
        };
    
    }
]);
