app.directive('compareTo', [ '$log', function( $log) {
  return {
    require: 'ngModel',
    scope : {
        password1 : '=compareTo'
    },
    link: function(scope, elm, attrs, ctrl) {
      
      ctrl.$validators.compareTo = function(modelValue) {
            return scope.password1 === modelValue; 
      };
      scope.$watch('password1', function(){
        ctrl.$validate();
      });
    }
  };
}]);
