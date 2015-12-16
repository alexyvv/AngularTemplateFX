'use strict';

angular.module('afxConsole.clietninfo', [])

.controller('ClientInfoCtrl', function($rootScope, $scope, $http, $routeParams, $route) {

  //////////////////////////////////////////////////////МОДЕЛЬ ДАННЫХ:

  // Список сертификатов.
  $scope.certificates = [];
  // Список счетов пользователя.
  $scope.accountList = [];
  // Список подразделений (филиалов).
  $scope.branchesList = [];
  // Выбранный филиал (для счетов).
  $scope.currentFilial = 'ALL';

  ///////////////////////////////////////////////////////////////////////

  $rootScope.$on('$routeChangeSuccess', function () {
    $scope.selectedUser = $routeParams.userLogin;
  });

  ($scope.loadCertListByLogin = function(login) {

    var req = 'resource/certificates/listByLogin?login=' + login;

    $scope.loadData(req, function(data) {
      $scope.certificates = data;
    });
  });

  /**
  * Загрузить счета клиента по логину.
  * login логин клиента в системе.
  */
  ($scope.loadAccountListByLogin = function(login){

    var req = 'resource/account/foruser?login=' + login;
    req += '&filial=' + $scope.currentFilial;
    $scope.loadData(req, function(data) {
      $scope.accountList = data;
    });
  });

  /**
  * Загрузить список филиалов.
  */
  ($scope.loadFilialList = function() {

    var req = 'resource/branch/filials';
    $scope.loadData(req, function(data) {
      var allFilialsElement = {branchId: '', name: 'ALL'};
      data.unshift(allFilialsElement);
      $scope.branchesList = data;
    });
  });

  ($scope.refreshCertList = function(){
      $scope.selectedUser = $routeParams.userLogin;
      $scope.loadCertListByLogin($routeParams.userLogin);
  });

  ($scope.refreshAccList = function(){

    $scope.loadAccountListByLogin($routeParams.userLogin);
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
  $scope.loadFilialList();
  $scope.refreshCertList();
  $scope.refreshAccList();

});
