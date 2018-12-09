angular.module( 'investing.nav', [
])

.controller( 'NavCtrl', ['$mdSidenav','$rootScope', '$location', '$scope', 'config', function NavController( $mdSidenav, $rootScope, $location, $scope, config ) {
    
    $scope.currentUser = config.currentUser;

    $rootScope.$on("$stateChangeSuccess", function() {
        window.scrollTo(0, 0);
    });

    $rootScope.$on("$stateChangeStart", function() {
        $mdSidenav('login').close();
        $mdSidenav('markets').close();
        $mdSidenav('nav').close();
        $mdSidenav('subNav').close();
    });
    
    $rootScope.loginToggle = function(){$mdSidenav('login').toggle()};
    $rootScope.marketsToggle = function(){$mdSidenav('markets').toggle()};
    $rootScope.navToggle = function(){$mdSidenav('nav').toggle()};
    $rootScope.subNavToggle = function(){$mdSidenav('subNav').toggle()};
    $scope.isActive = function (viewLocation) { return viewLocation === $location.path()};

}]);