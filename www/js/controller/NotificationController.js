app.controller('NotificationController',[
    '$rootScope',
    '$scope',
    'NotificationStorage',
    '$state',
    'settings',
    function($rootScope, $scope, storage, $state, settings) {
        $scope.notifications = storage.get();
    
        $scope.go = function(idNotification,notification) {
            $rootScope.$broadcast('removenotification');
            storage.setRead(idNotification);
            if(notification.type === settings.messageType ){
                $state.go('chat', {'to': notification.id})
            }
            if(notification.type === 'around'){
                $state.go('around', {id : notification.id });
            }
        };
    }
])
