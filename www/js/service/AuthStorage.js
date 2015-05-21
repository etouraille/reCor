
'use strict';

app.factory('AuthStorage', ['$cookieStore', function ($cookieStore){
    return {
        
        persist : function (login, password, salt ){
            window.localStorage.setItem('login', login );
            window.localStorage.setItem('password', password );
            window.localStorage.setItem('salt', salt );
        },
        clean : function (){
            window.localStorage.removeItem('login');
            window.localStorage.removeItem('password');
            window.localStorage.removeItem('salt');
        }, 
        get : function () {
            var login = window.localStorage.getItem('login');
            var password = window.localStorage.getItem('password');
            var salt = window.localStorage.getItem('salt');
            if( login !== null && password !== null && salt !== null ) {
            return {login : login, password : password, salt : salt};
            } else {
                return false;
            }
        }
    }
}]);
