'use strict';

var app = angular.module('afxConsole.сonversion', ['ngMaterial']);

app.controller('ConversionCtrl', function($scope, $rootScope, $http, $mdDialog, $mdMedia) {

  ////////////////////////// Модель данных

  $scope.loginLike = '';


  ($scope.getToDay = function() {

    return new Date();
  });

  ($scope.getTomorrow = function() {

    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  /**
  * Получить дату в формате: yyyy-mm-dd
  */
  ($scope.getFormattedDate = function(date) {

    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  });

  // Временной интервал поиска
  $scope.fromDate = $scope.getToDay();
  $scope.toDate = $scope.getToDay();

  // Валюта спискания.
  $scope.currencyFrom = 'ALL';
  // Валюта зачисления.
  $scope.currencyTo = 'ALL';

 // Список доступных валют.
 $scope.currencyList = [];

 // Список заявок на конвертация он-лайн.
 $scope.conversionList = [];

 $scope.customFullscreen = $mdMedia('sm');
 //////////////////////////////////////////////////////////////

 /**
 * Показать диалог с детальной информацией о заявке на конвертацию.
 */
 ($scope.showDetailsDialog = function(ev, conv) {
   $mdDialog.show({
     controller: 'DialogController',
     templateUrl: 'themes/material/conversion/detailsDialog.html',
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

    var resource = "resource/conversion/foruser"
    resource += '?login=' + $scope.loginLike;
    resource += '&currFrom=' + $scope.currencyFrom;
    resource += '&currTo=' + $scope.currencyTo;
    resource += '&dateFrom=' + $scope.getFormattedDate($scope.fromDate) + ' 0:0:0.000';//'2015-11-9 13:12:58.452';
    resource += '&dateTo=' + $scope.getFormattedDate($scope.toDate) + ' 23:59:59.999';///'2015-11-19 18:12:58.452';

    $scope.loadData(resource, function(data) {
        $scope.conversionList = data;
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
