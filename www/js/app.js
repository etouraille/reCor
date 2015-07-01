// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('resourceApp', [
    'ionic',
    'angular-md5', 
    'ngCookies', 
    'ui.router'
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
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home',{
            url : '/home',
            views : {
                'center' : { templateUrl : 'view/home.html' },
                'left' : { templateUrl : 'view/place.html' }
            }
        })
        .state('reserved',{
            url : '/reserved',
            views : {
                'center' : { templateUrl : 'view/reserved.html' }
            }
        })

        .state('search',{
            url : '/search',
            views :{ 
                'center' : { templateUrl : 'view/search.html' },
                'left' : { templateUrl :   'view/resource.html' }    
            }
        })
        .state('login',{
            url : '/login',
            views : {
                'center' : { templateUrl : 'view/login.html'}
            }
        })
        .state('subscribe',{
            url : '/subscribe',
            views : {
                'center' : { templateUrl : 'view/subscribe.html' }
            }
        });
       
}]);

