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

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at 
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.post  = {'Content-Type' : 'application/json' };
    $httpProvider.interceptors.push('AuthInterceptor');
}]);

app.config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider ){
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home',{
            url : '/home',
            templateUrl : 'view/home.html'
        })
        .state('login',{
            url : '/login',
            templateUrl : 'view/login.html'
        })
        .state('subscribe',{
            url : '/subscribe',
            templateUrl : 'view/subscribe.html'
        });
}]);

