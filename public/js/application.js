var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap', 'ngCookies']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'public/views/home.html',
			data : { pageTitle: 'Home' }
		})
		.state('course', {
			url: '/course/:courseId',
			templateUrl: 'public/views/course.html',
			data : { pageTitle: '.....' }
		})
		.state('regist', {
			url: '/regist',
			templateUrl: 'public/views/regist.html',
			data : { pageTitle: 'Registration' }
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'public/views/profile.html',
			data : { pageTitle: 'Profile' }
		})
		.state('login', {
			url: '/login',
			templateUrl: 'public/views/login.html',
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
        templateUrl: 'public/views/navbar.html'
      };
});
