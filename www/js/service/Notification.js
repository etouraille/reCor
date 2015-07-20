app.factory('Notification',
            [
            '$http',
            'settings', 
            '$log',
            '$rootScope',
            '$state',
            function ($http, settings, $log, $rootScope, $state ){
    return {
            successHandler : function ( result ) {
                $log.log(result);
                $rootScope.bar = 'success'+result;
                // toda call api to store the token for user
            },

            errorHandler : function ( result )  {
                $log.log('error while registering push : '+ result );
                $rootScope.bar = 'error' + result;
            },
            
            onNotification : function ( e ) {
                $rootScope.$broadcast('notification', {'event' : e.event });
                $rootScope.bar = 'event' + e.event;
                $log.log('notification : '+ JSON.stringify(e));
                switch( e.event )
                {
                case 'registered':
                    if ( e.regid.length > 0 )
                    {
                        $log.log("regID = " + e.regid);
                        //the registration process can be done only if the user is logged 
                        //it is done on each launch 
                        //check if the user is authentified and if the registration token 
                        //changes on each registration.
                        // pb : the app might be fourgroud, but still on the screen, 
                        // while screen is lock for exemple : the notification, fires
                        // and nothing display on the messaging screen.
                        $http.post(settings.endpoint + 'logged-area/notification/register',
                                   { device : 'android', regId : e.regid})
                                   .success(function(data){
                                        $log.log('success' + data);
                                        if(data.success) {    
                                            $rootScope.$broadcast('registered');
                                        }
                                   })
                                   .error(function(data){
                                        $log.log('error ' + data);
                                   });
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
                            //the message displays when we hit notification
                            //todo check if we can send some custom contents to display logics.
                        }
                        else
                        {
                            $log.log('background');
                        }
                        $state.go('detail' , { id : e.payload.id  });
                    }
                    $rootScope.$broadcast('push', {
                        type : 'classic', 
                        content : e.payload.message, 
                        id : e.payload.id
                    });
                    //Only works for GCM
                    //$rootScope.$broadcast('push', {type : 'gcm' , content : e.payload.msgcnt});
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
