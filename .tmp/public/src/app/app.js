angular.module( 'investing', [
    'ui.router',
    'sails.io',
    'angularMoment',
    'chart.js',
    'duScroll',
    'lodash',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'templates-app',
    'services',
    'models',
    'nvd3',
    'ngMaterial',
    'highcharts-ng',
    'ngCytoscape',
    'investing.about',
    'investing.account',
    'investing.footer',
    'investing.home',
    'investing.login',
    'investing.market',
    'investing.markets',
    'investing.marketPair',
    'investing.member',
    'investing.nav',
    'investing.register',
    'investing.search',
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path();
        var hasTrailingSlash = path[path.length-1] === '/';
        if(hasTrailingSlash) {
            var newPath = path.substr(0, path.length - 1); 
            return newPath; 
        } 
    });
    $urlRouterProvider.otherwise(function ($injector, $location) {
        if ($location.$$url === '/') {window.location = '/';}
        else {window.location = $location.$$absUrl;}
    });
    $locationProvider.html5Mode(true);
}])
.run( function run () {
    moment.locale('en');
})
.controller( 'AppCtrl', ['$rootScope', '$scope', 'config', function AppCtrl ( $rootScope, $scope, config) {
    config.currentUser = window.currentUser;
    $rootScope.$on('$stateChangeStart',function(){
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess',function(){
        $rootScope.stateIsLoading = false;
    });
}]);
