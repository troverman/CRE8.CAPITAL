angular.module( 'investing.footer', [
])

.controller( 'FooterCrtl', function FooterController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;
});