angular.module('navController', [])
	.controller('nav', function($rootScope, $scope, $state, $http, AuthService, localStorageService) {
		$scope.title = 'Task System';
		$scope.isUrl = function(url) {
			if (url === '#') return false;
			return ('#' + $state.$current.url.source + '/').indexOf(url + '/') === 0;
		};

		$scope.login = function() {
			var base64Credential = btoa($scope.user.username + ':' + $scope.user.password);
			AuthService.authorization = 'Basic ' + base64Credential;
			$http.get('login', {}).success(function(res) {
				if (res.authenticated) {
					$scope.message = null;
					AuthService.user = res;
					$rootScope.user = AuthService.user;
					localStorageService.set('AuthService',{'user':AuthService.user,'authorization':AuthService.authorization})
					$state.go('home');
				} else {
					$scope.message = 'Данные введены неверно';
				}
			}).error(function(error) {
				$scope.message = 'Данные введены неверно';
			});
		};	
		
		$scope.logout = function(){
			$rootScope.user = null;
			AuthService.user = null;
			AuthService.authorization = null;	
			localStorageService.remove('AuthService');
			$state.go('login');
		};

		$scope.pages = [
		    {
			   name: 'Пользователи',
			   url: '#/users'
		    },
			{
				name: 'Заявки',
				url: '#/tasks'
			}]
	});