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
                'register</button>' + '{{ bar }}' +
            '</a>',
            link : function( scope, element, attr ) {
                scope.thereIsAMessage = true;
                scope.count = 1;
                scope.message = 'nothing received';
                scope.register = true;
                scope.$on('push', function(event, args ) {
                    scope.$apply(function() {
                        scope.message = args.content;
                        scope.count ++;
                        scope.thereIsAMessage = true;
                    });
                    $log.log('IN DIRECTIVE' + args.data );
                });
                $rootScope.bar = 'foo';

                scope.register = function () {
                    $log.log('>>>>>>>>>>>>>>>>>>>>>>>>>','<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                }
                scope.$on('deviceready', function() {
                    scope.$apply(function() {
                        $log.log('IN APPPPPLLLLLYYYYYYYYYYYYYYYYY');
                        scope.register = function() {
                            $rootScope.bar = 'call reg';
                            window.plugins.pushNotification.register(
                                Notification.successHandler,
                                Notification.errorHandler,
                                {
                                    'senderId' : settings.androidProjectNumber,
                                    'ecb' : "Notification.onNotification",
                                }
                            );
                        };
                    });
                });
                scope.$on('registered', function(){
                    scope.$apply(function() {
                        scope.registered = true;
                    });
                });
            }
        };
}]);
