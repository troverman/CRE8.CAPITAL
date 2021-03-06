angular.module( 'investing.register', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'register', {
		url: '/register',
		views: {
			"main": {
				controller: 'RegisterCtrl',
				templateUrl: 'register/index.tpl.html'
			}
		}
	});
}])

.controller( 'RegisterCtrl', ['$scope', 'config', 'titleService', function RegisterController( $scope, config, titleService ) {
	titleService.setTitle('Register | CRE8.CAPITAL');
	$scope.currentUser = config.currentUser;
}]);
