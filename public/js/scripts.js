var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap', 'ngCookies']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
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
	$urlRouterProvider.otherwise('/regist');
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

'use strict';

app.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$localStorage', '$state',
    function($scope, $http, $rootScope, $localStorage, $state) {
      if ( $localStorage.studentId !== undefined && $localStorage.studentId !== '' ) {
			     $state.go('regist');
		  }
        $rootScope.studentId = '';
        $scope.id = '';

        $scope.login = function() {
          $rootScope.studentIdRoot = $scope.id;
          $localStorage.studentId = $scope.id;
        };
    }
]);

'use strict';

app.controller('mainCtrl', ['$scope', '$http', '$rootScope', '$localStorage',
    function($scope, $http, $rootScope, $localStorage) {
        $scope.courses = [];
        $scope.coursesId = [];
        $rootScope.studentIdRoot = $localStorage.studentId || '';

        $http.get('https://whsatku.github.io/skecourses/list.json')
            .success(function(data) {
                $scope.courses = data;
                for(var i = 0; i < $scope.courses.length; i++){
                  $scope.coursesId.push($scope.courses[i].id);
                }
            })
            .error(function(data) {
                console.log(data);
            });

        $scope.logout = function(){
          $rootScope.studentIdRoot = '';
          $localStorage.studentId = '';
        };

    }
]);

'use strict';

app.controller('navCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $scope.courses = [];
        $scope.studentId = '';
        $scope.id = '';
        
        $scope.login = function() {
          $scope.studentId = $scope.id;
        };
    }
]);

'use strict';

app.controller('profileCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    //$scope.profile = {};
    var loginId = $rootScope.studentIdRoot;

    $http.get('http://52.37.98.127:3000/v1/5610545749/'+ loginId +'?pin=5647')
    .success(function(data){
      $scope.profile = data;
      console.log(data);
    })
    .error(function(data){
      $scope.profile = null;
    });

    $scope.drop = function(c){
      var index = $scope.profile.enrolls[0].courses.indexOf(c);
      $scope.profile.enrolls[0].courses.splice(index, 1);
      var jsonVar = {};
      jsonVar[loginId] = $scope.profile;
      $http.post('http://52.37.98.127:3000/v1/5610545749/?pin=5647', jsonVar)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log(data);
          });

    };

    $scope.selectDrop = function(c){
      $scope.dropCourse = c;
    };

    $scope.export = function(enroll){
      $scope.exportEnroll = enroll;
    };
}]);

'use strict';

app.controller('registCtrl', ['$scope', '$http', '$rootScope', '$localStorage', '$state', '$location', '$anchorScroll',
    function($scope, $http, $rootScope, $localStorage, $state, $location, $anchorScroll) {
        $scope.selected = [];
        $scope.search = false;
        $scope.course = {};
        $scope.courseCredit = 0;
        $scope.rType = '';
        $scope.checkEnroll = {};
        $scope.totalCredits = 0;

        var loginId = $rootScope.studentIdRoot;

        $scope.updateChecker = function(){
          $scope.totalCredits = 0;
          $http.get('http://52.37.98.127:3000/v1/5610545749/' + loginId + '?pin=5647')
              .success(function(data) {
                var totalEnroll = data.enrolls[0].courses;

                for(var i = 0; i < totalEnroll.length; i++){
                  var en = totalEnroll[i];
                  $scope.checkEnroll[en.courseId] = en.section.lecture || en.section.lab;
                  $scope.totalCredits += en.credit;
                }

                console.log($scope.checkEnroll);
                console.log($scope.totalCredits);
              });
        };


        if( $localStorage.studentId && $localStorage.studentId !== ''){
          $scope.updateChecker();
        }


        $scope.selectCourse = function(course) {
            $scope.course = course;
            $http.get('https://whsatku.github.io/skecourses/' + course.id + '.json')
                .success(function(data) {
                    $scope.courseA = data;
                    $scope.courseCredit = data.credit.total;
                    console.log(data);
                });

            $http.get('https://whsatku.github.io/skecourses/sections/' + course.id + '.json')
                .success(function(data) {
                    $scope.selected = data;
                    //console.log(data);
                })
                .error(function(data) {
                    $scope.selected = [];
                    //console.log(data);
                });
            $scope.search = true;
            $location.hash('top');
            $anchorScroll();
        };

        $scope.selectSec = function(section){
          $scope.section = section;
          $scope.rType = 'C';
        };

        $scope.enroll = function() {
            //prepare enroll
            var name = $scope.course.name.en;
            var courseId = $scope.course.id;
            var lecSec = 0;
            var labSec = 0;
            var credit = $scope.courseCredit;
            if ($scope.section.type === 'Lecture') {
                lecSec = $scope.section.id;
            } else if ($scope.section.type === 'Lab') {
                labSec = $scope.section.id;
            }

            var enrollInfo = {
                'name': name,
                'courseId': courseId,
                'section': {
                    'lecture': lecSec,
                    'lab': labSec
                },
                'credit': credit,
                'rType': $scope.rType
            };

            var user = {};
            $http.get('http://52.37.98.127:3000/v1/5610545749/' + loginId + '?pin=5647')
                .success(function(data) {
                    user = data;
                    user.enrolls[0].courses.push(enrollInfo);
                    var jsonVar = {};
                    jsonVar[loginId] = user;
                    $http.post('http://52.37.98.127:3000/v1/5610545749/?pin=5647', jsonVar)
                        .success(function(data) {
                            console.log(data);
                            $scope.updateChecker();
                        })
                        .error(function(date) {
                            console.log(data);
                        });
                })
                .error(function(data) {
                    user = {
                        'stdId': loginId,
                        'enrolls': [{
                            'year': 2015,
                            'semester': 'Second',
                            'courses': [enrollInfo]
                        }]
                    };
                    var jsonVar = {};
                    jsonVar[loginId] = user;
                    $http.post('http://52.37.98.127:3000/v1/5610545749/?pin=5647', jsonVar)
                        .success(function(data) {
                            console.log(data);
                            $scope.updateChecker();
                        })
                        .error(function(data) {
                            console.log(data);
                        });
                });
        };
    }
]);
