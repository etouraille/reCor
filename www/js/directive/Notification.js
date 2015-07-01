app.directive('notification', 
              [
                  '$rootScope', 
                  '$log', 
                  function( $rootScope, $log) {
  return {
    link : function(scope,element){
        element.bind('Notification', function(event){
            $rootScope.$broadcast('Notification', event.detail);
            $log.log('NOTIFICATIIIIIIIIIIIIIIIIIIIIONNNNNNNNNNNNN');
        });
    }
  };
}]);
