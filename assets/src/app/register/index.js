angular.module( 'investing.register', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'register', {
		url: '/register',
		views: {
			"main": {
				controller: 'RegisterCtrl',
				templateUrl: 'register/index.tpl.html'
			}
		}
	});
})

.controller( 'RegisterCtrl', function RegisterController( $scope, titleService, config ) {
	titleService.setTitle('NOVO');
	$scope.currentUser = config.currentUser;

});
