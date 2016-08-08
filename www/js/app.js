// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova']);

app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

app.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});

app.run(function($ionicPlatform, $httpBackend) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    $httpBackend.whenGET('http://localhost:8100/valid')
      .respond({
        message: 'This is my valid response!'
      });
    $httpBackend.whenGET('http://localhost:8100/notauthenticated')
      .respond(401, {
        message: "Not Authenticated"
      });
    $httpBackend.whenGET('http://localhost:8100/notauthorized')
      .respond(403, {
        message: "Not Authorized"
      });
    $httpBackend.whenGET(/templates\/\w+.*/).passThrough();

  });
});
app.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm'
    })
    .state('main', {
      url: '/',
      abstract: true,
      templateUrl: 'templates/main.html'
    })
    .state('main.dash', {
      url: 'main/dash',
      views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('main.public', {
      url: 'main/public',
      views: {
        'public-tab': {
          templateUrl: 'templates/public.html'
        }
      }
    })
    .state('main.map', {
      url: 'main/map',
      views: {
        'dash-tab': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('main.admin', {
      url: 'main/admin',
      views: {
        'admin-tab': {
          templateUrl: 'templates/admin.html',
          controllerAs: 'vm'
        }
      },
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    });

  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main.dash");
  });
})
