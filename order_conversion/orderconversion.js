'use strict';

var app = angular.module('afxConsole.orderConversion', []);

app.controller('OrderConversionCtrl', function($scope, $rootScope, $http, $mdDialog, $mdMedia) {

  ($scope.getToDay = function() {

    return new Date();
  });

  /**
  * Получить дату в формате: yyyy-mm-dd
  */
  ($scope.getFormattedDate = function(date) {

    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  });

  ////////////////////////// Модель данных

  $rootScope.loginLike = '';

  // Интервал регистрации заявки:
  $scope.fromDateCreate = $scope.getToDay();
  $scope.toDateCreate = $scope.getToDay();

  // Интервал регистрации заявки:
  $scope.fromDateReg = $scope.getToDay();
  $scope.toDateReg = $scope.getToDay();

  // Валюта спискания.
  $scope.currencyFrom = 'ALL';
  // Валюта зачисления.
  $scope.currencyTo = 'ALL';
  // Статут ордера.
  $scope.crrentStatus = '0';
  // Список доступных валют.
  $scope.currencyList = [];

/// Перенести на получение данных из кеша (не успел сделать по-нормальному)
 $scope.statusList = [
   {name: 'ALL', value: '0'},
   {name: 'WAIT', value: '-1'},
   {name: 'ACTIVE', value: '1'},
   {name: 'DONE_DEAL', value: '2'},
   {name: 'CANCELED', value: '3'},
   {name: 'DEAL_WAIT', value: '5'},
   {name: 'SET_WAIT', value: '6'},
   {name: 'STOPOUT', value: '11'},
   {name: 'DONE_SO', value: '13'},
   {name: 'CANCEL_WAIT', value: '21'}
 ];

 // Список заявок на конвертация он-лайн.
 $scope.conversionOrderList = [];

 $scope.customFullscreen = $mdMedia('sm');
 //////////////////////////////////////////////////////////////


 /**
 * Показать диалог с детальной информацией о заявке на конвертацию.
 */
 ($scope.showDetailsDialog = function(ev, conv) {
   $mdDialog.show({
     controller: 'DialogController',
     templateUrl: 'themes/material/order_conversion/detailDialog.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true,
     convData: conv,
     fullscreen: $mdMedia('sm') && $scope.customFullscreen
   })
   .then(function(answer) {
     $scope.status = 'You said the information was "' + answer + '".';
   }, function() {
     $scope.status = 'You cancelled the dialog.';
   });
   $scope.$watch(function() {
     return $mdMedia('sm');
   }, function(sm) {
     $scope.customFullscreen = (sm === true);
   });
 });

	/**
	 * Событие при смене параметров фильтра
	 */
	($scope.onFilterChanged = function() {

		console.log('onFilterChanged');

    var resource = "resource/orderconvirsion/foruser"
    resource += '?login=' + $scope.loginLike;
    resource += '&status=' + $scope.crrentStatus;
    resource += '&currFrom=' + $scope.currencyFrom;
    resource += '&currTo=' + $scope.currencyTo;
    resource += '&dateConvFrom=' + $scope.getFormattedDate($scope.fromDateCreate) + ' 0:0:0.000';
    resource += '&dateConvTo=' + $scope.getFormattedDate($scope.toDateCreate) + ' 23:59:59.999';
    resource += '&dateRegFrom=' + $scope.getFormattedDate($scope.fromDateReg) + ' 0:0:0.000';
    resource += '&dateRegTo=' + $scope.getFormattedDate($scope.toDateReg) + ' 23:59:59.999';
    $scope.loadData(resource, function(data) {
        $scope.conversionOrderList = data;
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

	//Загрузка списка валют из кеша серера:
	$scope.loadData('resource/currency/list', function(data) {

    var allCurrencyElement = {"currencyCode": '',"desc": '',"currencyName": "ALL","currencyId": ''};
    data.unshift(allCurrencyElement);
		$scope.currencyList = data;
	});

  $scope.onFilterChanged();
});

app.controller('DialogController', function($scope, $mdDialog, convData) {

  $scope.conv = convData;

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
});
