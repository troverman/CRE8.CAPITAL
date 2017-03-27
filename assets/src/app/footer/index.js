angular.module( 'investing.footer', [
])

.controller( 'FooterCrtl', ['$scope', 'config', function FooterController( $scope, config ) {
    $scope.currentUser = config.currentUser;
}]);