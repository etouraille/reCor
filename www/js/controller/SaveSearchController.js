app.controller('SaveSearchController', [
    '$http', 
    '$scope', 
    'settings', 
    '$log',
    function($http, $scope, settings, $log) {
        $scope.init = function(){
            $http.get(settings.endpoint + 'logged-area/hashtag')
            .success(function(data){
                $scope.hashtags = data;
                $scope.myHashtags = [];
            });
            $http.get(settings.endpoint + 'logged-area/my/hashtag')
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
            console.log(hashtag);
            index = $scope.myHashtags.indexOf( hashtag );
            if(index > -1 ) {
                 $scope.myHashtags.splice(index,1);
            }
            group();
        };
        function group(){
            $scope.rows = [];
            $scope.rows[0] = [];
            for(var i in $scope.myHashtags) {
                var j=0;
                var k=0;
                if(j<5){
                    j++;
                }else{
                    j = 0;
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
}]);
