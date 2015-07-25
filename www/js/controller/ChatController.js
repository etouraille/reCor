app.controller('ChatController',[ 
        '$scope',
        '$timeout',
        '$ionicScrollDelegate',
        '$stateParams',
        '$state',
        '$http',
        'settings',
        'AuthStorage',
        '$window',
        '$log',
        function($scope, $timeout, $ionicScrollDelegate, $stateParams, $state,  $http, settings, auth, $window, $log ) {
       
        // init
        // todo edit AuthStorage with $window
        $scope.me = $window.localStorage.getItem('id');
        
        $scope.messages = [];
        $scope.$watch(
            function(){
                $log.log('stateParams', $state);
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
            $log.log('push', args );
            $log.log( $scope.to );
            if(args.id === $scope.to && args.type === 'message' ){
                $log.log('add message');
                $scope.$apply(function() {
                    $scope.messages.push({
                        from : args.from,
                        content : args.content
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                });
            }
        });
      $scope.hideTime = true;

      var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

      $scope.sendMessage = function() {
         //var d = new Date();
         //d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
         $scope.messages.push({
             from: $scope.me,
             content: $scope.data.message
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
