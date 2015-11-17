'use strict';

/** Корневой модуль системы.
  * Декларируем модули приложения с зависимостями от view, и компонент.
  */
var app = angular.module('afxConsole', [
  'ngMaterial',
  'ngRoute',
  'afxConsole.clients',
  'afxConsole.orderConversion',
  'afxConsole.orders'
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
  .when('/orderconversion', {
    templateUrl: 'themes/material/order_conversion/conversion.html',
    controller: 'OrderConversionCtrl'
  })
  .when('/clientinfo', {
    templateUrl: 'themes/material/clietninfo/clientinfo.html',
    controller: 'ClientInfoCtrl'
  })
  .when('/orders', {
    templateUrl: 'themes/material/orders/orders.html',
    controller: 'ClientsCtrl'
  });
})
.controller('MainCtrl', function($scope) {

  $scope.menu = {};
  $scope.menu.pages = [
    {"url": "themes/material/clients/clients", "discription":"Клиенты"},
    {"url": "themes/material/orders/orders", "discription":"Активные ордера"}
  ];

  $scope.menu.isPageSelected = function(page) {
    return ($scope.menu.currentPage === page);
  };

  $scope.menu.toggleSelectPage = function(page) {
    $scope.menu.currentPage = page;
  };
});

app.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          element.datetimepicker({
            dateFormat:'dd/MM/yyyy hh:mm:ss',
            language: 'pt-BR'
          }).on('changeDate', function(e) {
            ngModelCtrl.$setViewValue(e.date);
            scope.$apply();
          });
        }
    };
});

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
        componentHandler.upgradeAllRegistered();
      })
    })
});
