/* import myApp */ var myApp = require('./myApp');
/* import home */ var home = require('./partial/home');

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'js/partial/home.html',
        controller: 'home'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
