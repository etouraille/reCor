app.directive('location', 
    [ 
        '$log',
        '$rootScope',
        'settings',
        '$http',
        'localization',
        function( $log , $rootScope , settings, $http, localization ) {
        return {
             scope : {
                lat : '=',
                lon : '=',
                address : '=',
                localization : '='
             },
             link : function( scope, element, attr ) {
                //autocomplete function.
                autocomplete = new google.maps.places.Autocomplete(
                    element[0],
                    { types: ['geocode'] }
                );
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    place = autocomplete.getPlace();
                    $log.log(place);
                    if(place.geometry) {
                        scope.$apply(function(){
                            scope.lat = place.geometry.location.A;
                            scope.lon = place.geometry.location.F;
                        })
                    }
                    if(place.formatted_address) {
                        scope.$apply(function(){
                            scope.address = place.formatted_address;
                        })
                    }
                });
                //get address from application localization
                scope.$watch(function() {
                    return scope.localization;
                }, function(newValue, oldValue ) {
                    if(newValue === true) {
                         localization.init().then(function(){
                                 var geo = { lat : localization.lat(), lon : localization.lon() };
                                 scope.lat = geo.lat;
                                 scope.lon = geo.lon;
                                 $http.post(settings.endpoint + 'place/address', geo)
                                 .success(function(data) {
                                    scope.address = data.address;
                                    element.attr('value', scope.address);
                                 });

                        }, function (error) {
                                $log.log('error localization', error );
                        });
                    }
                });
             }
        };
}]);
