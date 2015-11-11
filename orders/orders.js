'use strict';

angular.module('afxConsole.orders', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orders', {
    templateUrl: 'orders/orders.html',
    controller: 'ClientsCtrl'
  });
}])

.controller('OrdersCtrl', function($scope) {

});
