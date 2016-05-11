'use strict';

app.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$localStorage', '$state',
    function($scope, $http, $rootScope, $localStorage, $state) {
      if ( $localStorage.studentId !== undefined && $localStorage.studentId !== '' ) {
			     $state.go('regist');
		  }
        $rootScope.studentId = '';
        $scope.id = '';
        $scope.errorMessage = '';
        $scope.password = '';
        $scope.submit = false;

        $scope.login = function() {
          if($scope.id.length !== 10 || $scope.id.substr(2,4) !== '1054'){
            $scope.errorMessage = 'Unautorized user (Not SKE student)';
          }
          else{
            $rootScope.studentIdRoot = $scope.id;
            $localStorage.studentId = $scope.id;
            $state.go('profile');
          }
        };
    }
]);
