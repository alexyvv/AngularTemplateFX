'use strict';

angular.module('afxConsole.clients', [])

.controller('ClientsCtrl', function($scope, $http) {

  $scope.context = { currentPage: { name: "clients", title: "clients"}};
	$scope.filter = {like: '', limit: 20};
  $scope.clients = [];

  $scope.selectCryptoModel = {
    repeatSelect: '',
    availableOptions: [
      {id: '', name: "no matter"},
      {id: '1', name: "crypto"},
      {id: '0', name: "not crypto"}
    ]
   };

   $scope.selectOnlineModel = {
     repeatSelect: '',
     availableOptions: [
       {id: '', name: "no matter"},
       {id: '1', name: "online"},
       {id: '0', name: "offline"}
     ]
    };

    $scope.selectValidModel = {
      repeatSelect: 1,
      availableOptions: [
        {id: '', name: "no matter"},
        {id: '1', name: "valid"},
        {id: '0', name: "not valid"}
      ]
     };


	/**
	 * Событие при смене параметров фильтра
	 */
	$scope.onFilterChanged = function() {

		console.log('onFilterChanged');
		$scope.reload();
	};

	/**
	 * Инициировать перезагрузку кеша на сервере.
	 * Событие по нажатию на кнопку 'ReloadCache'.
	 */
	$scope.reloadCache = function() {

		console.log('reloadCache');
		var req = 'resource/clients/reload';
		$http.get(req).success(function(data) {
			$scope.reload();
		});
	}

	/**
	 * Перезагрузить данные на страницу из rest-сервиса.
	 */
	$scope.reload = function() {

    $scope.clients = [];

		var req = 'resource/clients?like=' + $scope.filter.like;
		req = req + '&valid=' + $scope.selectValidModel.repeatSelect;
		req = req + '&online=' + $scope.selectOnlineModel.repeatSelect;
		req = req + '&crypto=' + $scope.selectCryptoModel.repeatSelect;
		req = req + '&limit=' + $scope.filter.limit;
		console.log('reload req=' + req);

		$http.get(req).success(function(data) {
			$scope.clients = data;
      console.log('clients.length=' + $scope.clients.length);
		    $scope.renum();
		});

		// $scope.loadContext();
		// $scope.loadPages($scope, $http);
	};

	/**
	 * Загрузить текущий контекст
	 */
	$scope.loadContext = function() {

		var req = 'resource/context/user';
		$http.get(req).success(function(data) {
			$scope.context.user = data;
		});
	};

	 	$scope.loadPages = function(scope, http) {

			var req = 'resource/context/pages';
			http.get(req).success(function(data) {
				scope.context.pages = data;

				// рассчитываем класс текущей страницы
				var pgs = $scope.context.pages;
				var curPage = scope.context.currentPage;
				for (var i=0; i<pgs.length; i++) {

					if (pgs[i].name == curPage.name) {
						pgs[i].class = "active";
						curPage.title = pgs[i].title;
					}
				}
			});
		};

	/**
	 * Пересчитать классы для подсветки строк
	 */
	$scope.renum = function() {

		for (var i=0; i<$scope.clients.length; i++) {
			var c = $scope.clients[i];
			c.url = '?page=client&login=' + c.login;
			if (c.online) {
				c.className = 'online';
			}
			if (!c.valid) {
				c.className = 'unvalid';
			}
		}
	};

	/**
	 * жмакнули на клиента - загружаем данные по нему
	 */
	$scope.onClientSelect = function(login) {

		console.log('clientDetails login=' + login);
		// загрузить список доступных страниц
		var req = 'resource/clients/get?login=' + login;
		$http.get(req).success(function(data) {
			$scope.clientinfo = data;
		});
	}

	$scope.reload();

});
