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