angular.module('app.controllers', [])
.controller('RegisterController',function($scope, $http){
	$scope.user = {};
	$scope.showrole = false;
	$scope.show = true;
	$scope.required = true;
	$scope.roles = ['ROLE_USER', 'ROLE_ADMIN'];
	$scope.registerUser = function(){
		if($scope.user.password != $scope.user.confirmpassword)
			$scope.error = 'Password Not Matching';
		else
			$http.post('register', $scope.user).success(function(res) {
				$scope.success = 'Registration successfull!';
				$scope.user = {};
			}).error(function(error) {
				$scope.error = error.message;
			});
	}
})
.controller('UserListController', function($scope, $state, popupService, $window, User, AuthService) {
	$scope.users = User.query();
	$scope.cancreate = false;
	if(!AuthService.user)
		$scope.message = 'Войдите в систему';
	else
		$scope.cancreate =  AuthService.user.principal.role == 'ROLE_ADMIN';
		
	$scope.deleteUser = function(user) {
		if (popupService.showPopup('Подтвердите удаление пользователя')) {
			user.$delete(function() {
		        $scope.users = User.query(); 
		        $state.go('users');
			});
	    }
	};

})
.controller('UserViewController', function($scope, $stateParams, User) {
	$scope.user = User.get({ id: $stateParams.id });
})
.controller('UserCreateController', function($scope, $state, $stateParams, User) {
	$scope.roles = ['ROLE_USER', 'ROLE_ADMIN'];
	$scope.showrole = true;
	$scope.show = true;
	$scope.required = true;
	$scope.user = new User();
	
	$scope.addUser = function() {
		$scope.user.$save(function() {
		$scope.success = 'Пользователь создан';
    	$state.go('users');
    });
  };
})
.controller('UserEditController', function($scope, $state, $stateParams, User, AuthService) {
	$scope.userid = AuthService.user.principal.id;
	$scope.show = $state.current.name == 'editUser' && $state.params.id == $scope.userid;
	$scope.required = $state.params.id == $scope.userid;
	$scope.showrole = AuthService.user.principal.role == 'ROLE_ADMIN';
	$scope.roles = ['ROLE_USER', 'ROLE_ADMIN'];
	$scope.$state = $state;
	$scope.updateUser = function() {
	    $scope.user.$update(function() {
	    	$state.go('users');
	    });
	};

	$scope.loadUser = function() {
		$scope.user = User.get({ id: $stateParams.id });
	};
	
	$scope.loadUser();
})
.controller('TaskListController', function($scope, $state, popupService, $window, Task, AuthService) {
	$scope.tasks = Task.query();

	if(!AuthService.user)
		$scope.message = 'Войдите в систему';
	
	$scope.deleteTask = function(task) {
		if (popupService.showPopup('Подтвердите удаление заявки')) {
			task.$delete(function() {
		        $scope.tasks = Task.query();
		        $state.go('tasks');
			});
	    }
	};
})
.controller('TaskViewController', function($scope, $stateParams, Task) {
	$scope.task = Task.get({ id: $stateParams.id });
})
.controller('TaskCreateController', function($scope, $state, $stateParams, Task) {
	$scope.task = new Task();
	$scope.addTask = function() {
    $scope.task.$save(function() {
    	$state.go('tasks');
    });
  };
})
.controller('TaskEditController', function($scope, $state, $stateParams, Task) {
	$scope.updateTask = function() {
	    $scope.task.$update(function() {
	    	$state.go('tasks');
	    });
	};

	$scope.loadTask = function() {
		$scope.task = Task.get({ id: $stateParams.id });
	};
	
	$scope.loadTask();
})



