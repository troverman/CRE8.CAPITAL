angular.module( 'investing.member', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'member', {
		url: '/member/:id',
		views: {
			"main": {
				controller: 'MemberCtrl',
				templateUrl: 'member/index.tpl.html'
			}
		}
	});
}])

.controller( 'MemberCtrl', ['$scope', 'config', 'titleService', function MemberController( $scope, config, titleService ) {
	titleService.setTitle('Member | collaborative.capital');
}]);