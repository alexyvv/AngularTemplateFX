'use strict';

/** Корневой модуль системы.
  * Декларируем модули приложения с зависимостями от view, и компонент.
  */
var app = angular.module('afxConsole', [
  'ngMaterial',
  'ngRoute',
  'afxConsole.clients',
  'afxConsole.orders'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/orders', {
    templateUrl: 'orders/orders.html',
    controller: 'ClientsCtrl'
  })
  .when('/clients', {
    templateUrl: 'clients/clients.html',
    controller: 'ClientsCtrl'
  })
  .when('/help', {
    templateUrl: 'help.html',
    controller: 'ClientsCtrl'
  })
  .otherwise({redirectTo: 'clients'});
}])

.controller('MainCtrl', function($scope, $rootScope) {

  $scope.menu = {};
  $scope.menu.pages = [
    {"url": "/clietns", "discription":"Клиенты"},
    {"url": "/orders", "discription":"Активные ордера"}
  ];

  $scope.menu.isPageSelected = function(page) {
    return ($scope.menu.currentPage === page);
  };

  $scope.menu.toggleSelectPage = function(page) {
    $scope.menu.currentPage = page;
  };

});
app.run(function ($rootScope,$timeout) {
        $rootScope.$on('$viewContentLoaded', function(){
          $timeout(function() {
            componentHandler.upgradeAllRegistered();
          })
        })
      });
