app.controller('NotificationController',[
    '$rootScope',
    '$scope',
    'NotificationStorage',
    '$state',
    function($rootScope, $scope, storage, $state) {
        $scope.notifications = storage.get();
    
        $scope.go = function(idNotification,notification) {
            $rootScope.$broadcast('removenotification');
            storage.setRead(idNotification);
            if(notification.type ==='message'){
                $state.go('chat', {'to': notification.id})
            }
            if(notification.type === 'around'){
                $state.go('around', {id : notification.id });
            }
        };
    }
])
