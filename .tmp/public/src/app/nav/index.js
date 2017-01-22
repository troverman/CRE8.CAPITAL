angular.module( 'investing.nav', [
])

.controller( 'NavCtrl', function NavController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;
});