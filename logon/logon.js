/**
 * MVC-контроллер для формы Logon.
 */

var colsoleApp = angular.module('AFXNG.Console.Logon', []);

colsoleApp.controller('LogonCtrl', function($scope,	$window, $http) {

	$scope.context = {};
	$scope.context.user = {};

	$scope.submit = function() {
		var req = 'resource/context/logon?login=' + $scope.login + '&password=' + $scope.password;
		req = req + '&theme=material';
		$http.get(req).success(function(data) {
			$scope.context.user = data;

				if ($scope.context.user.id < 0) {
					$scope.result = 'Error: ' + $scope.context.user.id;
				} else {
					$scope.result = 'success';
					// Рефреш страницы
					$window.location.reload();
				}
		});
	};
});
