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
