angular.module( 'investing.account', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'account', {
		url: '/account',
		views: {
			"main": {
				controller: 'AccountCtrl',
				templateUrl: 'account/index.tpl.html'
			}
		}
	});
}])

.controller( 'AccountCtrl', ['$scope', 'config', 'titleService', function AccountController( $scope, config, titleService ) {
	titleService.setTitle('Account - investingfor');
	$scope.currentUser = config.currentUser;
}]);