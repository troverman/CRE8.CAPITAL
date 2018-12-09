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
		},
        resolve:{
            member: ['$stateParams', 'UserModel', function($stateParams, UserModel) {
                return UserModel.getSome('username', $stateParams.id, 1, 0, 'createdAt DESC');
            }]
        }
	});
}])

.controller( 'MemberCtrl', ['$scope', 'config', 'member', 'titleService', function MemberController( $scope, config, member, titleService ) {
	$scope.currentUser = config.currentUser;
	$scope.member = member;
	titleService.setTitle($scope.member.username + ' | collaborative.capital');
}]);