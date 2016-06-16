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