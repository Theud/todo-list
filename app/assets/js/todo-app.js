(function(){
	'use strict';
	
	angular.module('TodoApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize']);
})();
(function(){
	'use strict';
	 
	angular.module('TodoApp')
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'components/todo/todoView.html',
				controller: 'todoController',
				controllerAs: 'todoController',
				authorized: false
			})
			.otherwise({ redirectTo: '/'});
	}]);
})();
(function(angular){
	
	/**
	* Order Controller
	* @param $scope scope
	* @param $orderService Order service
	*/
	function todoController($scope, todoService){
		
		// fetch orders to a given page 
		function getTodos(){
			todoService.getTodos().then(function(response) {
				$scope.todos = response.data;
			});
		}
		
		$scope.deleteTodo = function(id){
			todoService.deleteTodo(id).then(function(response) {
				$scope.todos = response.data;
			});
		};
		
		$scope.addTodo = function(){
			todoService.addTodo($scope.todo).then(function(response) {
				$scope.todos = response.data;
			});
		};
		
		$scope.checkTodo = function(id){
			todoService.checkTodo(id).then(function(response) {
				$scope.todos = response.data;
			});
		};
		 
		// Init orders at the 1st page
		getTodos();
		$scope.todo = {};
		
	}
	
	todoController.$inject = ['$scope', 'todoService'];
	angular.module('TodoApp').controller('todoController', todoController);
})(angular);
(function(angular){

	/**
	* Service to handle orders
	* @param $http HTTP service
	*/
	function todoService($http){
		
		// Get all orders
		this.getTodos = function(page){
			return $http({method: 'GET', url: '/api/todos'});
		};
		
		this.deleteTodo = function(id){
			return $http({method: 'DELETE', url: '/api/todos/delete/' + id});
		};
		
		this.addTodo = function(todo){
			return $http({method: 'POST', url: '/api/todos', data: JSON.stringify(todo) });
		};
		
		this.checkTodo = function(id){
			return $http({method: 'GET', url: '/api/todos/check/' + id});
		};
	
		
	}

	todoService.$inject = ['$http'];
	angular.module('TodoApp').service('todoService', todoService);
})(angular);