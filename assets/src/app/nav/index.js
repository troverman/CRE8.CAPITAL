angular.module( 'investing.nav', [
])

.controller( 'NavCtrl', ['$rootScope', '$location', '$scope', 'config', function NavController( $rootScope, $location, $scope, config ) {
    $scope.currentUser = config.currentUser;
    $rootScope.$on("$stateChangeSuccess", function() {
        window.scrollTo(0, 0);
    });
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);