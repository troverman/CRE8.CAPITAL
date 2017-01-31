angular.module( 'investing', [
    'ui.router',
    'sails.io',
    'angularMoment',
    'duScroll',
    'lodash',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'templates-app',
    'services',
    'models',
    'nvd3',
    'investing.about',
    'investing.account',
    'investing.footer',
    'investing.home',
    'investing.intro',
    'investing.login',
    'investing.member',
    'investing.nav',
    'investing.register',

])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {


    $urlRouterProvider.otherwise(function ($injector, $location) {
        if ($location.$$url === '/') {
            window.location = '/';
        }
        else {
            // pass through to let the web server handle this request
            window.location = $location.$$absUrl;
        }
    });

    $locationProvider.html5Mode(true);

})

.run( function run () {
    moment.locale('en');
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
    config.currentUser = window.currentUser;
});