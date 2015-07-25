app.factory('NotificationStorage', [
    '$window', 
    function ($window){
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
                notification['read'] = false;
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
                notifications[id]['read'] = true;
                this.set(notifications);
            }
    };
}]);
