app.controller('ResourceController', [ 
        '$scope',
        '$http',
        'settings',
        '$stateParams',
        '$log',
        '$state',
        function($scope, $http, settings, $stateParams, $log, $state ) {
             //resource detail, for instance hashtag, description.
            $scope.data = '';
            $scope.$on('left', function(event, args) {
                $log.log(args);
                $log.log(args);
                $scope.hashtag = args.content;
                $scope.to = args.userid;
                $http.get(settings.cdn + 'get/'+args.picture)
                .success(function(data) {
                    $scope.data = data.content;
                })
                .error(function(data) {
                    $log.error(data);
                });

                $scope.reserve = function() {
                    $http.post(
                        settings.endpoint + 'logged-area/resource/reserve', 
                        {resourceId : args.id})
                        .success(function(date) {
                            $log.log(data);
                        })
                        .error(function(data) {
                            $log.error(data);
                        })
                };

                $scope.message = function() {
                    $log.log('userId', $scope.to);
                    $state.go('chat' , { to : $scope.to });
                }

            })
        }
    ]);
