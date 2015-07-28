app.factory('NotificationStorage', [
    '$window',
    'settings',
    function ($window, settings ){
    return {
            get : function() {
                /*
                * notification : [{ type : 'message', id : 'idFrom'}, { type : 'around' : id : 'id Document' }]
                * */
                var notifications = $window.localStorage.getItem('notifications');
                if(typeof notification === 'undefined' || notifications === null){ 
                    return false;
                } else { 
                    return JSON.parse($window.localStorage.getItem('notifications'));
                }
            },
            add : function( notification ) {
                var notifications = this.get();
                notification.read = false;
                if(notifications !== false){
                    notifications.push(notification);
                } else {
                    notifications = [ notification ];
                }
                $window.localStorage.setItem('notifications',JSON.stringify(notifications));
            },
            clean : function() {
                $window.localStorage.removeItem('notifications');
            },
            set : function(notifications) {
                $window.localStorage.setItem('notifications', JSON.stringify(notifications));
            },
            setRead : function(id){
                notifications = this.get();
                notifications[id].read = true;
                this.set(notifications);
            },
            getFormated : function () {
                notifications = this.get();
                var ret = [];
                if(notifications !== false ) {
                    notifications = notifications.reverse();
                    groupedMessage = this.groupSameMessageKeys(notifications);

                    angular.forEach( notifications , function(notification, id) {
                        if(notifications.type === settings.messageType ) {
                            if(id === Object.keys(
                                groupedMessage[notification.id]
                                )[0]) {
                                    ret.push(notification);
                              }
                        } else {
                            ret.push(notification);
                        }  
                    });
                }
                return ret;
            },
            groupSameMessageKeys : function (notifications ) {
                var keys = [];
                /*
                 *  keys = idNotif=>[id1, id2, id3] 
                 */
                angular.forEach(notifications, function(notification, id ) {
                    if( notification.type === settings.messageType) {
                        if(typeof keys[notification.id] === 'undefined' || keys[notification.id] === null) {
                            keys[notification.id] = [id];
                        }else if(keys[notification.id].indexOf(id) === -1 ){
                            keys[notification.id].push(id)
                        }
                    }
                });
                return keys;
            }
            
    };
}]);
