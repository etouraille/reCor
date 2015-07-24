"use strict";

app.factory('AuthInterceptor', 
      [ '$q',
        'AuthStorage',
        'Encryption', 
        '$injector',
        '$rootScope',
    function($q, storage, Encryption, $injector, $rootScope) {
  return {
    // optional method
    'request': function(config) {
      // for none logged area return noting
      // we are in logged area/
      if(typeof config !== 'undefined') {
          if(config.url.match(/logged\-area/)) { 
              //When we do the ping on login
              if('x-wsse' in config.headers) {
                return config;
              }
              // If the user authentication data are in storage.
              else if(typeof storage.get() === 'object') {
                var AuthData = storage.get();
                 config.headers['x-wsse'] = Encryption.getWsseHeader(
                     AuthData.login, 
                     AuthData.password,
                     AuthData.salt
                 );
                 return config;
              }
              // is the user is not logged, we redirect to login page
              else {
                $injector.get('Authentication').redirectToLogin();
              }
          } else { // especially in subscribe form, not in a logged area
            return config;
          }
        }
    },

    // optional method
    /*
   'requestError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },
    */

    /*
    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },
    */
    // optional method
   'responseError': function(rejection) {
      if(rejection.status == 401 || rejection.status == 403) {
            //storage.clean();//todo uncomment
            $rootScope.$broadcast('unlogged');
            $injector.get('Authentication').redirectToLogin();
            

      }
      return $q.reject(rejection);
    }
  };
}]);
