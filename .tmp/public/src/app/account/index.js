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
		},
        resolve:{
            member: ['UserModel', function(UserModel) {
                return UserModel.getMine();
            }]
        }
	});
}])

.controller( 'AccountCtrl', ['$location', '$rootScope', '$scope', 'config', 'member', 'titleService', 'UserModel', function AccountController( $location, $rootScope, $scope, config, member, titleService, UserModel ) {
	titleService.setTitle('Account | collaborative.capital');
	if (!config.currentUser){$location.path('/login')}
	$scope.currentUser = config.currentUser;
	$scope.member = member[0];
	$scope.update = function(){
        $rootScope.stateIsLoading = true;
		UserModel.update($scope.member).then(function(member){
			$rootScope.stateIsLoading = false;
			$scope.member = member[0];
		});
	};
}]);