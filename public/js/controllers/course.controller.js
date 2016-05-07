'use strict';

app.controller('courseCtrl', ['$scope', '$http', '$stateParams',
  function ($scope, $http, $stateParams) {
    var courseId = $stateParams.courseId;
    $scope.courseInfo = {};
    $http.get('https://whsatku.github.io/skecourses/'+ courseId +'.json')
    .success(function(data){
      $scope.courseInfo = data;
      console.log(data);
    })
    .error(function(data){
      console.log(data);
    });
}]);
