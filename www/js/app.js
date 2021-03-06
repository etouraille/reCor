// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('resourceApp', [
    'ionic',
    'angular-md5', 
    'ngCookies', 
    'ui.router',
    'ngCordova',
    'ngMaterial',
    'ngAria',
])
.run([
    '$ionicPlatform',
    '$rootScope',
     function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
}]);
app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.commons  = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Methods':'GET,OPTIONS,PUT,DELETE',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credential':'true'
    };
    $httpProvider.interceptors.push('AuthInterceptor');
}]);
app.config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider ){
    $urlRouterProvider.otherwise('/search');

    $stateProvider
        .state('add',{
            url : '/add',
            views : {
                'center' : { templateUrl : 'view/home.html' },
                'left' : { templateUrl : 'view/place.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('reserved',{
           url : '/reserved',
            views : {
                'center' : { templateUrl : 'view/reserved.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })

        .state('search',{
            url : '/search',
            views :{ 
                'center' : { templateUrl : 'view/search.html' },
                'left' : { templateUrl :   'view/resource.html' },   
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('login',{
            url : '/login',
            views : {
                'center' : { templateUrl : 'view/login.html'},
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('subscribe',{
            url : '/subscribe',
            views : {
                'center' : { templateUrl : 'view/subscribe.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('subscribeWithEmail',{
            url : '/subscribe-with-email',
            views : {
                'center' : { templateUrl : 'view/subscribe-with-email.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })

        .state('around',{
            url : '/around?id',
            views : {
                'center' : { templateUrl : 'view/detail.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('notification',{
            url : '/notification',
            views : {
                'center' : { templateUrl : 'view/notification.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('mySearch',{
            url : '/my-search',
            views : {
                'center' : { templateUrl : 'view/mySearch.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('chat',{
            url : '/chat?to',
            views : {
                'center' : { templateUrl : 'view/chat.html' },
                'footer' : { templateUrl : 'view/chatFooter.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('conversation',{
            url : '/conversation',
            views : {
                'center' : { templateUrl : 'view/conversation.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })

        .state('createToken',{
            url : '/forgotten',
            views : {
                'center' : { templateUrl : 'view/createToken.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        })
        .state('changePassword',{
            url : '/change-password?token',
            views : {
                'center' : { templateUrl : 'view/changePassword.html' },
                'right' : { templateUrl : 'view/menu.html' }
            }
        });
}]);

