app.controller('PlaceController',[
    '$scope',
    '$rootScope',
    '$http',
    'settings',
    function($scope, $rootScope, $http, settings) {
        $scope.$on('left', function(event, geo) { 
            $scope.places = [];
            $scope.myPlace = {};
            $http.post(settings.endpoint + 'place/search', geo)
            .success(function(data) {
                if(typeof data.hits.hits != 'unedefined'){
                    $scope.places = data.hits.hits;
                }
            });
            $http.post(settings.endpoint + 'place/address', geo)
            .success(function(data) {
                $scope.myPlace.address = data.address;
            });
            $scope.select = function (place ) {
                $rootScope.$broadcast('setPlace', place._source );
            };
            $scope.setAndSelect = function () {
                var place = {
                    lat : geo.lat,
                    lng : geo.lng,
                    tag : $scope.myPlace.tag,
                    address : $scope.myPlace.address
                };
                var placeMongoFormat = {
                    geo : {
                        lat : geo.lat,
                        lon : geo.lng
                    },
                    tag : $scope.myPlace.tag,
                    address : $scope.myPlace.address
                };
                $http.post(settings.endpoint + 'logged-area/place/tag',place)
                .success(function(data) {
                    placeMongoFormat['id'] = data.id;
                    $rootScope.$broadcast('setPlace', placeMongoFormat );
                });
            };
        });
    }
]);
