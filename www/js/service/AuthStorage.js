
'use strict';

app.factory('AuthStorage', ['$cookieStore', function ($cookieStore){
    return {
        
        persist : function (login, password, salt, id ){
            window.localStorage.setItem('login', login );
            window.localStorage.setItem('password', password );
            window.localStorage.setItem('salt', salt );
            window.localStorage.setItem('id', id );
        },
        clean : function (){
            window.localStorage.removeItem('login');
            window.localStorage.removeItem('password');
            window.localStorage.removeItem('salt');
            window.localStorage.removeItem('id');
        }, 
        get : function () {
            var login = window.localStorage.getItem('login');
            var password = window.localStorage.getItem('password');
            var salt = window.localStorage.getItem('salt');
            var id = window.localStorage.getItem('id');
            if( login !== null && password !== null && salt !== null ) {
            return {login : login, password : password, salt : salt, id : id };
            } else {
                return false;
            }
        },
        getUserId : function() {
            return window.localStorage.getItem('id');
        }
    }
}]);
