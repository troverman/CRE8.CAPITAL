angular.module( 'investing.account', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'account', {
		url: '/account',
		views: {
			"main": {
				controller: 'AboutCtrl',
				templateUrl: 'account/index.tpl.html'
			}
		}
	});
})

.controller( 'AboutCtrl', function AboutController( $scope, titleService ) {
	titleService.setTitle('Account - investingfor');
});