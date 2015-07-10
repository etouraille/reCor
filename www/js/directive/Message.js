app.directive('message', 
    [ 
        '$log',
        '$rootScope', 
        'Notification', 
        'settings',
        function( $log , $rootScope , Notification, settings ) {
        return {
            template : '' + 
            '<a  ng-show="thereIsAMessage" class="item item-icon-left" href="#">' + 
                '<i class="icon ion-email"></i>' +
                '{{ message }}' + 
                '<span class="badge badge-assertive">{{ count }}</span>' +
                '<button class="button" ng-disabled="registered" ng-click="register()">' +
                'register</button>' + 
            '</a>',
            link : function( scope, element, attr ) {
                scope.thereIsAMessage = false;
                scope.count = 0;
                scope.message = 'nothing received';
                scope.register = true;
                scope.$on('push', function(event, args ) {
                    $log.log('push event :  ' + JSON.stringify( args ) );
                    scope.$apply(function() {
                        scope.message = args.content;
                        scope.count ++;
                        scope.thereIsAMessage = true;
                    });
                });
                scope.$on('deviceready', function() {
                    scope.$apply(function() {
                        $log.log('IN APPPPPLLLLLYYYYYYYYYYYYYYYYY');
                        scope.register = function() {
                            $rootScope.bar = 'call reg';
                            
                        };
                    });
                });
                scope.$on('registered', function(){
                        scope.registered = true;
                });
            
            onNotification = Notification.onNotification;
            }
        };
}]);
