app.controller('AddController', ['$http', '$scope', 'settings', 'localization', '$log', function($http, $scope, settings, localization, $log){

    $scope.submit = function(){
        var url = settings.endpoint + 'logged-area/add';
        $log.log(url);
        $http.post(url, 
                   {'content': $scope.diese, 
                    'lat': localization.getLat(), 
                    'lon' : localization.getLon()}
        )
        .success(function(data){
            if(data.success){
                $log.log('#@T written');
            }else{
            
            }
        })
      .error(function(data){
        $log.log(data);
      })
    };

}]);
