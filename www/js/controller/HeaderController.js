app.controller('HeaderController',
[
   '$rootScope',
   '$scope',
   'Authentication',
   '$ionicSideMenuDelegate',
   function($rootScope, $scope, Authentication, $ionicSideMenuDelegate ) {
        //after registration, the button are not available
        $scope.isLogged = Authentication.isLogged();
        $rootScope.isLogged = $scope.isLogged;
        $scope.$on('unlogged', function(event){
            $scope.isLogged = false;
            $rootScope.isLogged = false;
        });
         $scope.$on('logged', function(event){
            $scope.isLogged = true;
            $rootScope.isLogged = true;
        });
        $scope.rightMenu = function(){
            $ionicSideMenuDelegate.toggleRight();
        };
}]);
