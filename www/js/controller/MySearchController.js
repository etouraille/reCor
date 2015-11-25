app.controller('MySearchController', [
    '$scope',
    '$http',
    'settings',
    '$log',
    function($scope, $http , settings, $log ) {
       
        $scope.distances = settings.distances;
        $scope.distance = $scope.distances[0];
        $scope.creationMode = true;
        $scope.search = {};
        $scope.localization = false;
        $scope.lat = '';
        $scope.lon = '';
        $scope.address = '';

        $http.post(settings.endpoint + 'logged-area/search/mine')
        .success(function(data) {
            if(data.success) {
                $scope.creationMode = false;
                $scope.search = data.search;
                $scope.address = data.search.address;
                $scope.lat = data.search.geo.lat;
                $scope.lon = data.search.geo.lon;
                for(var i in $scope.distances ){
                    if( $scope.distances[i].value === data.search.distance ) {
                        $scope.distance = $scope.distances[i];
                    }
                }
            } else if(data.success == false ) {
                $scope.localization = true;
            }
        }).error(function(error) {
            $log.log('log error : ' + error );
        });

        $scope.update = function() {
            $http.post( settings.endpoint + 'logged-area/search/update',
                       { 
                           lat : $scope.lat, 
                           lon : $scope.lon,
                           address : $scope.address,
                           distance : $scope.distance.value,
                           hashtags : [ settings.tag ]
                       }
                      ).success(function(data) {
                        if($scope.creationMode) {
                            $scope.creationMode = false;
                            // subscribe to notification.
                            // todo write unsubscribe : delete percolation, and unsubscribe 
                            // to notifications ...
                            window.localStorage.setItem('subscribed', true); 
                        }
                    });
                 
        };
    }
]);
