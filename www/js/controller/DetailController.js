app.controller('DetailController',[
    '$scope',
    '$http',
    '$stateParams',
    'settings',
    function($scope, $http , $stateParams, settings ) {
        $scope.id = $stateParams.id;
    
        var height = ( screen.height - 44 ) / 2 + 'px';
        $('#map-canvas').css({ 'height' : height });

        $http.post(settings.endpoint + 'resource/get', { id : $scope.id } )
        .success(function(data) {
            if( data.success ) {
                $scope.resource = data.content;
                $scope.time = moment(data.content.startDate, 'YYYYMMDD\THHiiss\ZZ').fromNow();
                initializeMap(
                    data.content.geo.lat, 
                    data.content.geo.lon, 
                    data.content.picture 
                );
            }
        });

        function initializeMap(lat, lon, picture ) {
            var mapOptions = {
                    center: { lat: parseFloat(lat), lng: parseFloat(lon) },
                    zoom: 15
                };
            var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
                var marker = {
                          position: new google.maps.LatLng(
                              parseFloat( lat ),
                              parseFloat( lon )
                          ),
                          map: map,
                          title: 'Some Paper there !',
                          optimized : false // enable clicking on the webView
                };
                var image = {};
                var shape = {};
                if(picture){
                    image = {
                            url: 'http://fanny.objetspartages.org/get/thumbnail/' + result._source.picture,
                            size: new google.maps.Size(100, 50),
                            //         // The origin for this image is 0,0.
                            origin: new google.maps.Point(0,0),
                            // The anchor for this image is the base of the flagpole at 0,32.
                            anchor: new google.maps.Point(0, 0),

                     };
                     shape = {
                        coords: [1, 1, 1, 20, 18, 20, 18 , 1],
                            type: 'poly'
                    };
                    marker.icon = image;
                }
                
                marker = new google.maps.Marker(marker);
                infowindow = new google.maps.InfoWindow({
                          content: result._source.content,
                          maxWidth: 200
                });

            }
    }
]);
