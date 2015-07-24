app.controller('ChatController',[ 
        '$scope',
        '$timeout',
        '$ionicScrollDelegate',
        '$stateParams',
        '$http',
        'settings',
        'AuthStorage',
        '$window',
        function($scope, $timeout, $ionicScrollDelegate, $stateParams, $http, settings, auth, $window ) {
       
        // init
        
            $scope.me = $window.localStorage.getItem('id');
        
        $scope.messages = [];
        $scope.$watch(
            function(){
                return $stateParams.to;
            }, function(to){
            if(to){
                $scope.to = to;
                $http.post(settings.endpoint + 'logged-area/conversation', {to : $scope.to})
                .success(function(data) {
                    if(data.success){
                        $scope.messages = data.messages;
                    }
                });
            }
        });

        $scope.$on('push', function(event, args){
            $log.log('push');
            if(args.from){
                var d = new Date();
                d = d.toLocalTimeString().replace(/:\d+ /, ' ');
                $scope.messages.push({
                    from : args.from,
                    content : args.content,
                    timestamp : d
                });
            }
        });
      $scope.hideTime = true;

      var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

      $scope.sendMessage = function() {
         var d = new Date();
         d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
         $scope.messages.push({
             from: $scope.me,
             content: $scope.data.message,
             timestamp: d
         });
         $http.post(settings.endpoint + 'logged-area/send/message',{
             to : $scope.to , 
             content : $scope.data.message
         });
         delete $scope.data.message;
         $ionicScrollDelegate.scrollBottom(true);
      };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};

}]);
