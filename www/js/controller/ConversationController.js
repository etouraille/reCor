app.controller('ConversationController', [
    '$scope',
    'settings',
    '$http',
    'AuthStorage', 
    function($scope, settings, $http, storage){
        //todo refacto store for once my user id in the app.
        $scope.me = storage.getUserId();
        $http.get(settings.endpoint + 'logged-area/conversations')
        .success(function(data) {
            if(data.success) {
                $scope.conversations = data.conversations;
                angular.forEach($scope.conversations , function(conversation, id ){
                    if(conversation.to == $scope.me) {
                        $scope.conversations[id]['refTo'] = conversation.from;
                    }
                    if(conversation.from == $scope.me) {
                        $scope.conversations[id]['refTo'] = conversation.to;
                    }
                });
            }
        });
    }
]);
