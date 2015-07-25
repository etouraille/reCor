app.controller('MenuController', [
    '$scope',
    '$rootScope',
    'settings',
    '$state',
    '$timeout',
    'Authentication',
    '$ionicSideMenuDelegate',
    function($scope, $rootScope, settings, $state, $timeout , auth,  $sideMenu) {
        $scope.connected = $rootScope.isLogged;
        
        $scope.$on('unlogged', function(){
            $scope.connected = false;
        });
        $scope.$on('logged', function(){
            $scope.connected = true;
        })
        


        $scope.disconnect = function() {
            auth.unlog();
            $sideMenu.toggleRight();
            $state.go('login');
        };

        $scope.conversation = function() {
            $sideMenu.toggleRight();
            $state.go('conversation');
        };

        $scope.search = function() {
            $sideMenu.toggleRight();
            $state.go('mySearch');
            
        }

    
    }
]);
