app.controller('AddController', [
    '$http', 
    '$scope',
    '$rootScope',
    '$ionicSideMenuDelegate',
    'settings', 
    'localization', 
    '$log', 
    function($http, $scope, $rootScope, $ionicSideMenuDelegate, settings, localization, $log){

    $scope.disabled = false;
    $scope.geo = false;
    localization.init().then(function(){
        $scope.geo = { 
            lat : localization.lat(),
            lng : localization.lon()
        };
    });
    $scope.endIntervalDatas = [
        { label : 'never', value : 0  },
        { label : '10min', value : 10  },
        { label : '1h'   , value : 60  },
        { label : '1day' , value : 1440 }

    ];

    //autocompletion of newspapers: 
    
    $scope.types  = settings.types.map(function(type) {
        return {
            value : type.toLowerCase(),
            display : type
        };
    });

    $scope.querySearch = function(query) {
        return $scope.types.filter(createFilter(query));
    };

    $scope.item = {};

    $scope.text = '';

    function createFilter(query ) {
        lowerCaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowerCaseQuery) === 0);
        };
    }


    //end of autocompletion newspapers:

    $scope.place = {};

    $scope.$on('setPlace', function(event, data){
        $scope.place = data;
        $ionicSideMenuDelegate.toggleLeft();
    });

    $scope.endIntervalData = $scope.endIntervalDatas[0];
    
    $scope.addPicture = function(){
        $scope.disabled = true;
        $scope.picture = false;
        navigator.camera.getPicture(function(imageData){
            $scope.disabled = true;
            $http.post(settings.cdn + 'put', {content : imageData })
            .success( function(data) {
                $log.log('success uploading the picture with data' + JSON.stringify(data));
                $scope.picture = data.id;
                $scope.disabled = false;

            })
            .error(function(data) {
                $log.log('Error Uploading file : '+ JSON.stringify(data) );
                $scope.disabled = false;
            });
        }, function(message) {
            $log.log('Failed camera because: '+ message );
            $scope.error = 'Failed Camera' + message;
            $scope.$apply( function() {
                $scope.disabled = false;
            });
        }, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    };

    $scope.tag = function(){
        $rootScope.$broadcast('left',$scope.geo);
    };
    
    $scope.submit = function(){
        var url = settings.endpoint + 'logged-area/add';
        var category = '';
        if( $scope.item ) {
            category = $scope.item.value;
        } else {
            category = $scope.text;
        }
        var data =  {
                        'tag': settings.tag,
                        'message' : $scope.message,
                        'category' : category,
                        'lat': $scope.geo.lat, 
                        'lon' : $scope.geo.lng,
                        'endInterval' : $scope.endIntervalData.value,
                        'place' : $scope.place
        };
        if($scope.picture){
                data.picture = $scope.picture;
            }

            $http.post(url, data
                                  )
            .success(function(data){
                if(data.success){
                    $scope.picture = false;
                    $log.log('#@T written');
                }else{
                    // todo warning the fail for user.
                }
            })
          .error(function(data){
            $log.log(data);
           });

        };

}]);
