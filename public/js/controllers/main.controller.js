'use strict';

app.controller('mainCtrl', ['$scope', '$http', '$rootScope', '$localStorage',
    function($scope, $http, $rootScope, $localStorage) {
        $scope.courses = [];
        $rootScope.studentIdRoot = $localStorage.studentId || '';

        $http.get('https://whsatku.github.io/skecourses/list.json')
            .success(function(data) {
                $scope.courses = data;
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
