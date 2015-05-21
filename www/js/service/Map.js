app.factory('localization', ['$q','$cookieStore', function ($q, $cookieStore){
    return {
        lat : function(){ return $cookieStore.get('lat') },
        lon : function(){
            return $cookieStore.get('lon');
        },
        getLat : function () {
           var deferredLat = $q.defer();
           this.init().then(function(position){
                deferredLat.resolve(position.coords.latitude)
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
        init : function(){
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function(position){
                $cookieStore.put('lat', position.coords.latitude);
                $cookieStore.put('lon', position.coords.longitude);
                deferred.resolve(position);
            }, function(error){
                deferred.reject(error.message);
            });
            return deferred.promise;
        }
    };
}]);
