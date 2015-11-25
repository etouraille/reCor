app.controller('ModalSearchController', [
        '$ionicModal',
        '$scope',
        '$http',
        'settings',
         function($ionicModal, $scope, $http, settings ){
     
      $ionicModal.fromTemplateUrl('save-search', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      //event to open modal
      $scope.location = false;
      $scope.$on('modal', function(event, args ) {
        $scope.modal.show();
        $scope.location = args;
      });
      
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
