angular.module( 'investing.member', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'member', {
		url: '/member/:id',
		views: {
			"main": {
				controller: 'MemberCtrl',
				templateUrl: 'member/index.tpl.html'
			}
		}
	});
})

.controller( 'MemberCtrl', function MemberController( $scope, titleService ) {
	titleService.setTitle('Member - investingfor');
});