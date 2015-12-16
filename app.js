'use strict';

/** Корневой модуль системы.
  * Декларируем модули приложения с зависимостями от view, и компонент.
  */
var app = angular.module('afxConsole', [
  'ngMaterial',
  'ngRoute',
  'afxConsole.clients',
  'afxConsole.сonversion',
  'afxConsole.orderConversion',
  'afxConsole.clietninfo'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/clients'});
}])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/clients', {
    templateUrl: 'themes/material/clients/clients.html',
    controller: 'ClientsCtrl'
  })
  .when('/conversion', {
    templateUrl: 'themes/material/conversion/conversion.html',
    controller: 'ConversionCtrl'
  })
  .when('/orderconversion', {
    templateUrl: 'themes/material/order_conversion/orderconversion.html',
    controller: 'OrderConversionCtrl'
  })
  .when('/clientinfo/:userLogin', {
    templateUrl: 'themes/material/clientinfo/clientinfo.html',
    controller: 'ClientInfoCtrl'
  });
})
.controller('MainCtrl', function($scope, $rootScope, $window, $http) {

  ($scope.exitFromApp = function() {
    var req = 'resource/context/logout';
		$http.get(req).success(function() {
      $window.location.reload();
		});
  });

  ($scope.getContext = function() {

    var req = 'resource/context/user'
    $scope.loadData(req, function(data) {
      $rootScope.user = data;
    });
  });

  //////////////////////////// ЗАГРУЗКА ДАННЫХ/////////////////////////////

	/** Получить данные из REST(method POST) сервиса.
		*
		* req - пусть к ресурсу.
		* f - замыкание (лямбда), реализует сохарнение получаенных данных.
	 	*/
	($scope.loadData = function(req, f) {

		console.log("loadData req=" + req);
		$http.post(req).success(f);
	});

  ///////////////////////////////////////////////

  $scope.getContext();

});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

// app.directive('datetimez', function() {
//     return {
//         restrict: 'A',
//         require : 'ngModel',
//         link: function(scope, element, attrs, ngModelCtrl) {
//           element.datetimepicker({
//             dateFormat:'dd/MM/yyyy hh:mm:ss',
//             language: 'pt-BR'
//           }).on('changeDate', function(e) {
//             ngModelCtrl.$setViewValue(e.date);
//             scope.$apply();
//           });
//         }
//     };
// });

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
        componentHandler.upgradeAllRegistered();
      })
    })
});
