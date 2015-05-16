"use strict";

app.factory('Encryption', ['md5','settings','$log', function( md5 , settings, $log ){
    return {
        
        encryptPassword : function (password,salt) {
            var _encrypted = password;
            for(var i = 0; i < settings.encryption.cycleNumber;i++){
                _encrypted = md5.createHash(salt + _encrypted );
            }
            return _encrypted;
        },
 // The strategy of wsse key is not valid since the encryption mechanism is available in th e client, exposed to every one, and the secret must be store in the cookie, wrong strategie, prefer an OAUTH With encrypted connexion to the server. 
        // any one can hack the client, and get the mechanisme to autenticate.
        // the strategy is more suitable in mobile app, where the secret is not exposed : find a better solution for the website api.
 
        generateNonce : function (username, salt) {
            var _nonce = salt + username;
            for(var i = 0;i<5;i++){
                _nonce = btoa(md5.createHash(atob(_nonce)+new Date().getTime()+salt+username));
            }
            return _nonce;
        },

        // todo remove using proper library
        getDate : function (date){
            if(typeof date !== 'undefined'){
                date = new Date(date);
            }
            else{
                date = new Date();
            }
            function addZero(integer){
                if(integer < 10){
                    return'0'+integer;
                }
                return ''+integer;
            }
            return addZero(date.getFullYear())+'-'+addZero(date.getMonth()+1)+'-'+addZero(date.getDate())+' '+addZero(date.getHours())+':'+addZero(date.getMinutes())+':'+addZero(date.getSeconds());
        },

        getDigest : function(nonce, created,secret){
         return  btoa(
                md5.createHash(
                    atob(nonce) + ''+ created + '' + secret
                )
            );
 
        },
    
        getDigestWithAll: function ( raw, salt , nonce, created ) {
           //salt = '9320d97bc80eec01f366083a2bce5ef8'; 
           //raw = 'b1otope';
           var _digest;
            var _secret = this.encryptPassword(raw, salt );
            var _digest = this.getDigest(nonce,created,_secret);            
            return _digest;
        },

        getWsseHeader : function(username, password, salt) {
            var _created = this.getDate();
            var _nonce = this.generateNonce();
            var _digest = this.getDigestWithAll(password, salt, _nonce, _created);
            var _wsse_header =  'UsernameToken Username="'+username+'", PasswordDigest="'+_digest+'", Nonce="'+ _nonce+'", Created="'+ _created+'"';
            return _wsse_header;
        }
    }
}])
