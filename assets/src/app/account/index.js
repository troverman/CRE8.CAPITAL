angular.module( 'investing.account', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'account', {
		url: '/account',
		views: {
			"main": {
				controller: 'AccountCtrl',
				templateUrl: 'account/index.tpl.html'
			}
		}
	});
})

.controller( 'AccoutCtrl', function AccoutController( $scope, titleService ) {
	titleService.setTitle('Account - investingfor');
});