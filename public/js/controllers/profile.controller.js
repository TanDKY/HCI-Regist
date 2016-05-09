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
