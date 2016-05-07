'use strict';

app.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$localStorage', '$state',
    function($scope, $http, $rootScope, $localStorage, $state) {
      if ( $localStorage.studentId !== '') {
			     $state.go('home');
		  }
        $rootScope.studentId = '';
        $scope.id = '';

        $scope.login = function() {
          $rootScope.studentIdRoot = $scope.id;
          $localStorage.studentId = $scope.id;
        };
    }
]);
