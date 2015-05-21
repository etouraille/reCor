app.controller('HeaderController',['$scope','Authentication', function($scope,Authentication){
    $scope.isLogged = Authentication.isLogged();
    $scope.$on('unlogged', function(event){
        $scope.isLogged = false;
    });
     $scope.$on('logged', function(event){
        $scope.isLogged = true;
    });
}]);
