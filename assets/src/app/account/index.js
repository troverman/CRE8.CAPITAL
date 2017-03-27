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

.controller( 'AccoutCtrl', ['$scope', 'titleService', function AccoutController( $scope, titleService ) {
	titleService.setTitle('Account - investingfor');
}]);