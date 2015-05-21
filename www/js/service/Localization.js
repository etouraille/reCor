app.factory('localization', ['$q','$cookieStore', function ($q, $cookieStore){
    return {
        lat : function(){ 
            return window.localStorage.getItem('lat');
        },
        lon : function(){
            return window.localStorage.getItem('lon');
        },
        getLat : function () {
           var deferredLat = $q.defer();
           this.init().then(function(position){
                deferredLat.resolve(position.coords.latitude);
           }, function(error){
                deferredLat.reject(error);
           });

           return deferredLat.promise;
        },
        getLon: function () {
            var deferredLon = $q.defer();
            this.ini().then(function(position){
                deferredLon.resolve(position.coords.longitude);
            }, function(error){
                deferredLon.reject(error);
            });
            return deferredLon.promise;
        },
        init : function(mocked){
            if(typeof mocked === 'undefined') {
                mocked = false; 
            }
            var deferred = $q.defer();
            if(!mocked) {
                navigator.geolocation.getCurrentPosition(function(position){
                    window.localStorage.setItem('lat', position.coords.latitude);
                    window.localStorage.setItem('lon', position.coords.longitude);
                    deferred.resolve(position);
                }, function(error){
                    deferred.reject(error.message);
                });
            
            return deferred.promise;
            } else {
                window.localStorage.setItem('lat', 45.7678077);
                window.localStorage.setItem('lon',4.8731515);
                return $q.when();
            }
        }
    };
}]);
