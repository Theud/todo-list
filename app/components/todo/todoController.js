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