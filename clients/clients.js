'use strict';

angular.module('afxConsole.clients', [])

.controller('ClientsCtrl', function($scope, $rootScope, $http) {

  //////////////////////////////////// МОДЕЛЬ ДАННЫХ:
	$scope.filter = {like: '', limit: 20};
  $scope.clients = [];

  $scope.selectCryptoModel = {
    repeatSelect: '',
    availableOptions: [
      {id: '', name: "все"},
      {id: '1', name: "да"},
      {id: '0', name: "нет"}
    ]
   };

   $scope.selectOnlineModel = {
     repeatSelect: '',
     availableOptions: [
       {id: '', name: "все"},
       {id: '1', name: "подключен"},
       {id: '0', name: "отключен"}
     ]
    };

    $scope.selectValidModel = {
      repeatSelect: 1,
      availableOptions: [
        {id: '', name: "все"},
        {id: '1', name: "разрешен"},
        {id: '0', name: "заблокирован"}
      ]
     };

   /////////////////////////////////////////////////////////////////////////////

	/**
	 * Событие при смене параметров фильтра
	 */
	($scope.onFilterChanged = function() {

		console.log('onFilterChanged');
		$scope.reload();
	});

	/**
	 * Перезагрузить данные на страницу из rest-сервиса.
	 */
	($scope.reload = function() {

    $scope.clients = [];

		var req = 'resource/clients?like=' + $scope.filter.like;
		req = req + '&valid=' + $scope.selectValidModel.repeatSelect;
		req = req + '&online=' + $scope.selectOnlineModel.repeatSelect;
		req = req + '&crypto=' + $scope.selectCryptoModel.repeatSelect;
		req = req + '&limit=' + $scope.filter.limit;
		console.log('reload req=' + req);

    $scope.loadData(req, function(data) {
      $scope.clients = data;
	    $scope.renum();
    });
	});

	/**
	 * Пересчитать классы для подсветки строк
	 */
	($scope.renum = function() {

		for (var i=0; i<$scope.clients.length; i++) {
			var c = $scope.clients[i];
			if (c.online) {
				c.className = 'online';
			}
			if (!c.valid) {
				c.className = 'unvalid';
			}
		}
	});

	/**
	 * Загрузка данных по клиентыу.
	 */
	($scope.onClientSelect = function(login) {

		console.log('clientDetails login=' + login);
		// загрузить список доступных страниц
		var req = 'resource/clients/get?login=' + login;
		$http.get(req).success(function(data) {
			$scope.clientinfo = data;
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

  // Начальныя загрузка данных (при старте страницы).
	// $scope.reload();
});
