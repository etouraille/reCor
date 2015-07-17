app.controller('HeaderController',
               [
               '$scope',
               'Authentication',
               '$ionicSideMenuDelegate',
               function($scope, Authentication, $ionicSideMenuDelegate ) {
    $scope.isLogged = Authentication.isLogged();
    $scope.$on('unlogged', function(event){
        $scope.isLogged = false;
    });
     $scope.$on('logged', function(event){
        $scope.isLogged = true;
    });
    $scope.rightMenu = function(){
        $ionicSideMenuDelegate.toggleRight();
    };
}]);
