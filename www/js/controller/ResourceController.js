app.controller('ResourceController', [ 
        '$scope',
        '$http',
        'settings',
        '$stateParams',
        '$log',
        '$state',
        '$ionicSideMenuDelegate',
        '$timeout',
        function($scope, $http, settings, $stateParams, $log, $state, $menu, $timeout ) {
             //resource detail, for instance hashtag, description.
            $scope.data = '';
            $scope.$on('left', function(event, args) {
                $scope.hashtag = args.content;
                $scope.newspaper = args.category;
                $scope.message = args.message;
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
                    
                    $menu.toggleLeft();
                    $timeout(function(){
                        $state.go('chat' , { to : $scope.to });
                    }, 1000 );
                }

            })
        }
    ]);
