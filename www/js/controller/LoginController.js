'use strict';  

app.controller('LoginController', ['$scope','$http', 'Authentication', function($scope,$http, Auth){

    $scope.user = {username : 'edouard' , password : 'b1otope', logged : 'not'};

    $scope.login = function (){
        
        if(Auth.login($scope.user.username,$scope.user.password)){
            $scope.user.logged = 'logged';
        }
    }

}])
