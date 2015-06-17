app.controller('SaveSearchController', [
    '$http', 
    '$scope',
    '$rootScope',
    'settings',
    '$ionicPopup',
    '$log',
    function($http, $scope, $rootScope, settings,$ionicPopup, $log) {
        $scope.init = function(){
            $http.get(settings.endpoint + 'logged-area/hashtag')
            .success(function(data){
                $scope.hashtags = data;
                $scope.myHashtags = [];
            });
            $http.get(settings.endpoint + 'logged-area/hashtag/mine')
            .success(function(data){
                $scope.myHashtags = data;
            });
        };
        $scope.init();

        $scope.showAdd = function(hashtag){
            if($scope.myHashtags.indexOf( hashtag ) > -1) {
                return false;
            }
            return true;
        };
        $scope.add = function(hashtag){
            $scope.myHashtags.push( hashtag );
            group();
        };
        $scope.remove = function(hashtag){
            $log.log(hashtag);
            index = $scope.myHashtags.indexOf( hashtag );
            if(index > -1 ) {
                 $scope.myHashtags.splice(index,1);
            }
            group();
        };
        function group(){
            $scope.rows = [];
            $scope.rows[0] = [];
            var k=0;
            var j=0;
            for(var i in $scope.myHashtags) {
                if(j<4){
                    j++;
                }else{
                    j = 0;
                    j++;
                    k++;
                    $scope.rows[k]=[];
                }
                var content = angular.copy( $scope.myHashtags[i]);
                $scope.rows[k].push(content);
            }
        }
        $scope.$watch('myHashtags', function(){
            group();
        });

        $scope.saveSearch = function() {
            $http.post(settings.endpoint + 'logged-area/hashtag/update', { hashtags : $scope.myHashtags})
            .success(function(data){
                $log.log('success saving my hashtags');
                var ionicPopup = $ionicPopup.alert({
                    title : 'Your Search have been saved',
                    template : 'Your Search Have been Saved<br />'
                    + 'You will be notified when'
                    + ' a resource is around you'
                });
                ionicPopup.then(function() {
                    $scope.closeModal();
                });
            })
            .error(function(data){
                $log.log('Error while saving data');
            });
        }
}]);
