app.directive('emailexists', ['$q', 'settings','$log','$http', function($q, config, $log, $http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.emailexists = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
          // check the meaning of $q.when()=> a promise that is allways resolved.
        }

        var def = $q.defer();

        $http.post(config.endpoint + 'exists', {email : viewValue}).success(
            function(data){
                if( data.success ) { 
                    def.reject();
                }
                else { 
                    def.resolve();
                }
            }
        ).error(function(data){
            def.reject();
        });
        return def.promise;
      };
    }
  };
}]);
