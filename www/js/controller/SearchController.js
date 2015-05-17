app.controller('SearchController', ['$http', '$scope', 'settings', 'localization', '$log', function($http, $scope, settings, localization, $log){

    $scope.options = [
        {value : '0.5km' , label : '500m'}, 
        {value : '1km',  label : '1km' },
        {value : '2km' , label : '2km' }
    ];
    $scope.distance = '0.5km';
    $scope.results = [];
    $scope.submit = function(){
        var url = settings.endpoint + 'logged-area/search';
        localization.init().then(function(){
             $http.post(url, 
                       {'content': $scope.diese, 
                        'distance' : $scope.distance,
                        'lat': localization.lat(), 
                        'lon' : localization.lon()
                       }
            )
            .success(function(data){
                if(data){
                    $log.log(data);
                    $scope.results = data.hits.hits;
                }else{
                
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
