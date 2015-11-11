'use strict';

angular.module('afxConsole.clients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clients', {
    templateUrl: 'clients/clients.html',
    controller: 'ClientsCtrl'
  });
}])

.controller('ClientsCtrl', function($scope) {

});
