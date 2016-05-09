'use strict';

app.controller('registCtrl', ['$scope', '$http', '$rootScope', '$localStorage', '$state',
    function($scope, $http, $rootScope, $localStorage, $state) {
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
