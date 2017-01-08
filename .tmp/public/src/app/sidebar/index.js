angular.module( 'investing.sidebar', [
])

.controller( 'SidebarCtrl', function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [
        {title: 'About', translationKey: 'navigation:about', url:'/about',cssClass: 'fa fa-info-circle'},
        {title: 'Blog', translationKey: 'navigation:messages', url: '/blog', cssClass: 'fa fa-comments'},
        {title: 'Contact', translationKey: 'navigation:about', url:'/contact',cssClass: 'fa fa-info-circle'},
        {title: 'Portfolio', translationKey: 'navigation:about', url:'/portfolio',cssClass: 'fa fa-picture-o'},
    ];

    if (!$scope.currentUser) {
        navItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', cssClass: 'fa fa-sign-in'});
    }

    $scope.navItems = navItems;
});