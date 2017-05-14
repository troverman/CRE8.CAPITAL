angular.module( 'investing.market', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'market', {
		url: '/market/:path',
		views: {
			"main": {
				controller: 'MarketCtrl',
				templateUrl: 'market/index.tpl.html'
			}
		}
	});
}])

.controller( 'MarketCtrl', ['$scope', 'config', 'titleService', function MarketController( $scope, config, titleService ) {
	titleService.setTitle('Market - investingfor');
}]);