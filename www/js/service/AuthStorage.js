'use strict';

app.factory('AuthStorage', ['$cookieStore', function ($cookieStore){
    return {
        
        persist : function (login, password, salt ){
            $cookieStore.put('auth',{
                login : login,
                password : password,
                salt : salt
            });
        },
        clean : function (){
            $cookieStore.remove('auth');
        }, 
        get : function () {
            var object = $cookieStore.get('auth');
            return object;
        }
    }
}]);
