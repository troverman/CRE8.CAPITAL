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
}])
.directive('navCollapse', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var visible = false;
            element.on('show.bs.collapse', function () {
                visible = true;
            });
            element.on("hide.bs.collapse", function () {
                visible = false;
            });
            element.on('click', function(event) {
                if (visible && 'auto' == element.css('overflow-y')) {
                    element.collapse('hide');
                }
            });
        }
    };
});