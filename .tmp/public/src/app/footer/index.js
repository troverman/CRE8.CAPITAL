angular.module( 'investing.footer', [
])

.controller( 'FooterCtrl', ['$scope', 'config', function FooterController( $scope, config ) {
    $scope.currentUser = config.currentUser;
   	$scope.date = new Date();
}]);