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
