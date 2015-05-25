app.controller('SearchController', [
    '$http', 
    '$scope', 
    'settings', 
    'localization', 
    '$log',
    '$ionicModal',
    function($http, $scope, settings, localization, $log, $ionicModal) {

    $scope.options = [
        {value : '0.5km' , label : '500m'}, 
        {value : '1km',  label : '1km' },
        {value : '2km' , label : '2km' }
    ];
    $scope.distance = '0.5km';
    $scope.results = [];
    $scope.submit = function(){
        var url = settings.endpoint + 'logged-area/search';
        localization.init(true).then(function(){
            $log.log(localization.lon()); 
            $log.log(localization.lat()); 
            $http.post(url, 
                       {'content': $scope.diese, 
                        'distance' : $scope.distance,
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
                    zoom: 16
                };
            var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
            angular.forEach(results, function(result){
                $log.log(result);
                var marker = new google.maps.Marker({
                          position: new google.maps.LatLng(
                              parseFloat(result._source.geo.lat),
                              parseFloat(result._source.geo.lon)
                          ),
                          map: map,
                          title: result._source.content
                });
                infowindow = new google.maps.InfoWindow({
                          content: result._source.content,
                          maxWidth: 200
                });
                infowindow.open(map,marker);


            });
        }
       initialize(lat,long,results);
       //google.maps.event.addDomListener(window, 'load', initialize);
        
    };

    $ionicModal.fromTemplateUrl('save-search', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });

}]);

