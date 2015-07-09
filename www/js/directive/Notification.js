app.directive('notification', 
              [
                  '$rootScope', 
                  '$log', 
                  'settings',
                  'Notification',
                  function( $rootScope, $log, settings, Notification ) {
  return {
    link : function(scope,element){
        element.bind('Notification', function(event){
            $rootScope.$broadcast('Notification', event.detail);
            $log.log('NOTIFICATIIIIIIIIIIIIIIIIIIIIONNNNNNNNNNNNN');
        });
        element.bind('deviceready', function(event){
            $rootScope.$broadcast('deviceready');
            $rootScope.pushNotification = window.plugins.pushNotification;
            $rootScope.pushNotification.register(
                Notification.successHandler,
                Notification.errorHandler,
                {
                    'senderId' : settings.androidProjectNumeber,
                    'ecb' : "Notification.onNotification",
                }
            );
        });
    }
  };
}]);

