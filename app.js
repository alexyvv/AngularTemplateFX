'use strict';

/** Корневой модуль системы.
  * Декларируем модули приложения с зависимостями от view, и компонент.
  */
angular.module('afxConsole', [
  'ngRoute',
  'afxConsole.clients',
  'afxConsole.orders'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: 'clients'});
}])

.controller('MainCtrl', function($scope) {

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
