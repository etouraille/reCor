app.controller('ionSideMenus',[
    '$scope',
    '$ionicSideMenuDelegate',
    '$log',
    function($scope, $ionicSideMenuDelegate, $log) {
        $scope.$on('left', function(event, args) {
            $log.log(args);
            $ionicSideMenuDelegate.toggleLeft();
            
        });
    }
]);
