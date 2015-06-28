app.controller('ReservedController',[
    '$scope',
    'settings',
    '$http',
    function($scope, settings, $http ) {
        $scope.resources = [];
        $http.get(settings.endpoint + 'logged-area/reserved')
        .success(function(data) {
            if(data.success) {
                $scope.resources = data.resources;
                console.log('resources', $scope.resources);
            }
        });

        $scope.release = function(resourceId) {
            $http.post(settings.endpoint + 'resource/release',
                       {resourceId : resourceId })
            .success(function(data){
                if(data.success) {
                    delete $scope.resources[resourceId];                    
                }
            });
        }
    }
]);
