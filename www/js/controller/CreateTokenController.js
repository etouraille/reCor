app.controller('CreateTokenController',[
    'settings', 
    '$http',
    '$scope',
    function(settings, $http, $scope ){
        $scope.createToken = function(email) {
            $http.post(settings.endpoint + 'forgotten/createtoken', {email : email})
            .success(function(data){
                if(data.success) {
                    // todo waiting message
                } else {
                    // display problem , certainly with the email
                }
            });
        };
    
    }]);
