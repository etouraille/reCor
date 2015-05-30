app.controller('AddController', ['$http', '$scope', 'settings', 'localization', '$log', function($http, $scope, settings, localization, $log){

    $scope.addPicture = function(){
        $scope.disabled = true;
        $scope.picture = false;
        navigator.camera.getPicture(function(imageData){
            $scope.disabled = true;
            $http.post('http://fanny.objetspartages.org/put/', {content : imageData })
            .success(function(data){
                $scope.picture = data.id;
                $scope.disabled = false;
            })
            .error(function(data){
                $log.log('Error Uploading file : '+data );
                $scope.disabled = false;
            });
        }, function(message){
            $log.log('Failed camera because: '+message)
        }, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

    }
    
    $scope.submit = function(){
        var url = settings.endpoint + 'logged-area/add';
        
        localization.init().then(function(){
            var data =  {'content': $scope.diese, 
                        'lat': localization.lat(), 
                        'lon' : localization.lon(),
                       };
            if($scope.picture){
                data['picture'] = $scope.picture;
            }

            $http.post(url, data
                                  )
            .success(function(data){
                if(data.success){
                    $scope.picture = false;
                    $log.log('#@T written');
                }else{
                    // todo warning the fail for user.
                }
            })
          .error(function(data){
            $log.log(data);
           });

        }, function(erro){
            $log.log('localization error',error);
        });
    };

}]);
