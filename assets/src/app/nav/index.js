angular.module( 'investing.nav', [
])

.controller( 'NavCtrl', ['$scope', 'config', function NavController( $scope, config ) {
    $scope.currentUser = config.currentUser;
}]);