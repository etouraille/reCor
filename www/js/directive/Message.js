app.directive('message', 
    [ '$log','$rootScope', function( $log , $rootScope ) {
        return {
            template : '' + 
            '<a  ng-show="thereIsAMessage" class="item item-icon-left" href="#">' + 
                '<i class="icon ion-email"></i>' +
                '{{ message }}' + 
                '<span class="badge badge-assertive">{{ count }}</span>' +
            '</a>',
            link : function( scope,element, attr ) {
                scope.thereIsAMessage = true;
                scope.count = 1;
                scope.message = 'nothing received';
                scope.$on('push', function(event, args ) {
                    scope.$apply(function() {
                        scope.message = args.content;
                        scope.count ++;
                        scope.thereIsAMessage = true;
                    });
                    $log.log('IN DIRECTIVE' + args.data );
                });
            }
        };
}]);
