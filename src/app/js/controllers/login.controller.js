app.controller('LoginCtrl', function(AuthService, $ionicPopup, $state) {

  var vm = this;
  vm.data = {};

  vm.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {
        reload: true
      });
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

});
