app.factory('Notification',
            [
            '$http',
            'settings', 
            '$log',
            '$rootScope',
            function ($http, settings, $log, $rootScope ){
    return {
            successHandler : function ( result ) {
                $log.log(result);
                // toda call api to store the token for user
            },

            errorHandler : function ( result )  {
                $log.log('error while registering push : '+ error );
            },
            
            onNotification : function ( e ) {
                $rootScope.$broadcast('notification', {'event' : e.event });
                switch( e.event )
                {
                case 'registered':
                    if ( e.regid.length > 0 )
                    {
                        $log.log("regID = " + e.regid);
                        $http.post(settings.endoint + 'logged-area/notification/register/',
                                   { device : 'android', regId : e.regid});
                    }
                break;

                case 'message':
                    // if this flag is set, this notification happened while we were in the foreground.
                    // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    if ( e.foreground )
                    {

                        // on Android soundname is outside the payload.
                        // On Amazon FireOS all custom attributes are contained within payload
                        //var soundfile = e.soundname || e.payload.sound;
                        // if the notification contains a soundname, play it.
                        //var my_media = new Media("/android_asset/www/"+ soundfile);
                        //my_media.play();
                    }
                    else
                    {  // otherwise we were launched because the user touched a notification in the notification tray.
                        if ( e.coldstart )
                        {
                            //todo coldstart notification.
                        }
                        else
                        {
                            //todo background notification
                        }
                    }
                    $rootScope.$broadcast('push', {type : 'classic', content : e.payload.message});
                    //Only works for GCM
                    $rootScope.$broadcast('push', {type : 'gcm' , content : e.payload.msgcnt});
                    //
                   //Only works on Amazon Fire OS
                   //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
                break;

                case 'error':
                    $log.log('push error', e.msg );
                break;

                default:
                    $log.log('curious un-authentified message');
                break;
              }
            } 
    };
}]);
