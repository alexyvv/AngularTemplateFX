'use strict';

angular.module('afxConsole.orderConversion', [])

.controller('OrderConversionCtrl', function($scope, $http) {

  ////////////////////////// Модель данных

  $scope.loginLike = '';

  // Временной интервал поиска
  $scope.fromDate = '';
  $scope.toDate = '';

  // Валюта списания
  $scope.selectCurrencyFrom = {
    repeatSelect: '',
    availableOptions: [
      {id: '0', name: "EUR"},
      {id: '1', name: "USD"},
      {id: '2', name: "JPY"},
      {id: '3', name: "RUR"}
    ]
   };

   // Валюта зачисления
   $scope.selectCurrencyTo = {
     repeatSelect: '',
     availableOptions: [
       {id: '0', name: "EUR"},
       {id: '1', name: "USD"},
       {id: '2', name: "JPY"},
       {id: '3', name: "RUR"}
     ]
    };

	/**
	 * Событие при смене параметров фильтра
	 */
	$scope.onFilterChanged = function() {

		console.log('onFilterChanged');
		// $scope.reload();
	};

});
