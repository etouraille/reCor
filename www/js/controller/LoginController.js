'use strict';  

app.controller('LoginController', ['$scope','$http', 'Authentication', '$state', function($scope,$http, Auth,$state){

    $scope.user = {username : 'edouard' , password : 'b1otope', logged : 'not'};
    $scope.message = '';

    $scope.login = function (){
        
        Auth.login($scope.user.username,$scope.user.password).then(function(){
            $state.go('home');
        },function(reason){
            $scope.message = 'Login Failed'+reason;
            console.log('login failed'+ reason );
        });
        
    }

}])
