app.controller('ResourceController', [ 
        '$scope',
        '$http',
        'settings',
        '$stateParams',
        '$log',
        function($scope, $http, settings, $stateParams, $log ) {
             //resource detail, for instance hashtag, description.
            $scope.data = '';
            $scope.$on('left', function(event, args){
                $log.log(args);
                $log.log(args);
                $scope.hashtag = args.content;
                $http.get(settings.cdn + 'get/'+args.picture)
                .success(function(data) {
                    $scope.data = data.content;
                })
                .error(function(data) {
                    $log.error(data);
                });


            })
        }
    ]);
