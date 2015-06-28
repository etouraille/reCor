app.controller('SearchController', [
    '$http', 
    '$scope',
    '$rootScope',
    'settings', 
    'localization', 
    '$log',
    '$ionicModal',
    '$state',
    function($http, $scope, $rootScope, settings, localization, $log, $ionicModal, $state) {

    $scope.options = [
        {value : '0.5km' , label : '500m'}, 
        {value : '1km',  label : '1km' },
        {value : '2km' , label : '2km'},
        { value : '10km', label : '10km'}
    ];
    $scope.distance = $scope.options[3];
    $scope.results = [];
    $scope.submit = function(){
        var url = settings.endpoint + 'logged-area/search';
        localization.init().then(function(){
            $log.log(localization.lon()); 
            $log.log(localization.lat()); 
            $http.post(url, 
                       {
                        'content': $scope.diese, 
                        'distance' : $scope.distance.value,
                        'lat': localization.lat(), 
                        'lon' : localization.lon()
                       }
            )
            .success(function(data){
                    $log.log(data);
                    $scope.map(localization.lat(),localization.lon(), data.hits.hits);
                    $scope.results = data.hits.hits;
                
            })
          .error(function(data){
            $log.log(JSON.stringify(data)); 
          });
        

        }, function(error){
            $log.log('localization error'+error);
        });
    };
    $scope.map =function(lat, long, results){
       $log.log('lat'+lat+'long'+long);
       lat = parseFloat(lat);
       long = parseFloat(long);
        function initialize(lat,long,results){
            var mapOptions = {
                    center: { lat: lat, lng: long},
                    zoom: 15
                };
            var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
            angular.forEach(results, function(result){
                $log.log('picture',result._source);
                var marker = {
                          position: new google.maps.LatLng(
                              parseFloat(result._source.geo.lat),
                              parseFloat(result._source.geo.lon)
                          ),
                          map: map,
                          title: result._source.content,
                          optimized : false // enable clicking on the webView
                };
                var image = {};
                var shape = {};
                if(result._source.picture){
                    console.log('image');
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

                google.maps.event.addListener(marker,'click', function() {
                    $rootScope.$broadcast('left', result._source );
                });
            });
        }
       initialize(lat,long,results);
    };

}]);

