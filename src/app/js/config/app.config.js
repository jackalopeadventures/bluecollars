app.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: '../templates/login.html',
    controller: 'LoginCtrl',
    controllerAs:'vm'
  })
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: '../templates/main.html'
  })
  .state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: '../templates/dashboard.html',
          controller: 'DashCtrl',
          controllerAs:'vm'
        }
    }
  })
  .state('main.public', {
    url: 'main/public',
    views: {
        'public-tab': {
          templateUrl: '../templates/public.html'
        }
    }
  })
  .state('main.map', {
    url: 'main/map',
    views: {
        'map-tab': {
          templateUrl: '../templates/map.html',
          controller: 'MapCtrl',
          controllerAs:'vm'


        }
    }
  })
  .state('main.admin', {
    url: 'main/admin',
    views: {
        'admin-tab': {
          templateUrl: '../templates/admin.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  });

  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main.dash");
  });
})
