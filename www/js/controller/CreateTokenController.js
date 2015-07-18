app.controller('CreateTokenController',
        ['settings', 
            '$http',
            function(settings,$http){
                $scope.createToken = function(email) {
                    $http.post(settings.endpoint + 'forgotten/createtoken', {email : email})
                    .success(function(data){
                        if(data.success) {
                            // todo waiting message
                        } else {
                            // display problem , certainly with the email
                        }
                    })
                }
            
            }]);
