var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap', 'ngCookies']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			data : { pageTitle: 'Home' }
		})
		.state('course', {
			url: '/course/:courseId',
			templateUrl: 'views/course.html',
			data : { pageTitle: '.....' }
		})
		.state('regist', {
			url: '/regist',
			templateUrl: 'views/regist.html',
			data : { pageTitle: 'Registration' }
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'views/profile.html',
			data : { pageTitle: 'Profile' }
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			data : { pageTitle: 'Login' }
		});
	$urlRouterProvider.otherwise('/');
});

app.run([ '$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

app.directive('navbarView', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/navbar.html'
      };
});
