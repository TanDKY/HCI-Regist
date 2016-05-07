'use strict';

app.controller('profileCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.profile = {};
    var loginId = $rootScope.studentIdRoot;

    $http.get('http://52.37.98.127:3000/v1/5610545749/'+ loginId +'?pin=5647')
    .success(function(data){
      $scope.profile = data;
      console.log(data);
    })
    .error(function(data){
      console.log(data);
    });
}]);
