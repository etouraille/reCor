app.directive('alert', 
    [ 
        '$log',
        '$rootScope', 
        'settings',
        '$state',
        'NotificationStorage',
        function( $log , $rootScope , settings , $state, storage) {
        return {
            template : '' + 
            '<a ng-show="thereAreNotifications" ui-sref="notification" class="item item-icon-left" href="#">' + 
                '<span class="badge badge-assertive">{{ count }}</span>' +
            '</a>',
            link : function( scope, element, attr ) {
                notifications = storage.get();
                scope.thereAreNotifications = true;
                scope.count = 0;
                if (notifications === false) {
                    scope.thereAreNotifications = false;
                } else {
                    scope.count = notifications.length;
                }
                scope.$on('push', function(event, args ) {
                    // we add notification if we are not on the chat page
                    if(args.type !== 'pneumatique' 
                       && $state.current.name !== 'chat' 
                       && $state.params.to !== args.id
                      ) {
                        scope.$apply(function() {
                            scope.message = args.content;
                            scope.count++;
                            scope.thereAreNotifications = true;
                            storage.add(
                                {type : args.type, id : args.id , content : args.content  }
                            );
                        });
                      }
                });
                scope.$on('removenotification', function(event, args ) {
                    scope.count--;
                    if(scope.count === 0) {
                        scope.thereAreNotifications = false;
                    }
                });
            }
            
        };
}]);
