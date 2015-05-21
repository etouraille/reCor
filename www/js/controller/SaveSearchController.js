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
            });
            $http.get(settings.endpoint + 'logged-area/my/hashtag')
            .success(function(data){
                $scope.myHashtags = data;
            });
        };
        $scope.init();

        $scope.showAdd = function(hashtag){
            for(var i in $scope.myHashtags){
                if($scope.myHashtags[i]['content']=== hashtag){
                return false;
                }
            }
            return true;
        };
        $scope.add = function(hashtag){
            $scope.myHashtags.push({'content': hashtag});
        };
        $scope.remove = function(hashtag){
            angular.forEach($scope.myHastags, function(data){
                if(data.content == hashtag){
                  var index = currentIndex;
                }
            });
            if(index){
                $scope.myHashtags.splice(index,1);
            }
        };
        function group(){
            $scope.rows = [];
            for(var i in $scope.myHashtags) {
                var j=0;
                var k=0;
                $scope.grouped[0] = [];
                if(j<5){
                    j++;
                }else{
                    j = 0;
                    k++;
                    $scope.rows[k]=[];
                }
                $scope.rows[k].push($scope.myHashtags[i]['content']);
            }
        }
        $scope.$watch('myHashtags', function(){
            group();
        });
}]);
