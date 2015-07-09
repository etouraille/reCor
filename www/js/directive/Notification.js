app.directive('notification', 
              [
                  '$rootScope', 
                  '$log', 
                  'settings',
                  function( $rootScope, $log, settings ) {
  return {
    link : function(scope,element){
        element.bind('Notification', function(event){
            $rootScope.$broadcast('Notification', event.detail);
            $log.log('NOTIFICATIIIIIIIIIIIIIIIIIIIIONNNNNNNNNNNNN');
        });
        element.bind('deviceready', function(event){
            $rootScope.$broadcast('deviceready');
            $log.log('DEVIIIIIIIIIIIIIIIIIIIIIIIICEEEE REEAAAAAAAAAAAAAAAAADY : cool isn\'it ?');
        });
    }
  };
}]);

