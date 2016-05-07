app.controller('homeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.courses = [];
    $http.get('https://whsatku.github.io/skecourses/list.json')
    .success(function (data) {
        $scope.courses = data;
      })
      .error(function (data) {
        console.log(data);
      });
}]);
