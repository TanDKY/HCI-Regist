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
