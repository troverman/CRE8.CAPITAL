angular.module( 'investing.search', [
])

.config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state( 'search', {
        url: '/search/:path',
        views: {
            "main": {
                controller: 'SearchController',
                templateUrl: 'search/index.tpl.html'
            }
        },
        resolve:{
            marketData: ['DataModel', function(DataModel) {
                return DataModel.getData(100, 0, 'createdAt DESC', 'BTC', 'LTC', 30000);
            }],
            members: ['DataModel', function(DataModel) {
                return DataModel.getData(100, 0, 'createdAt DESC', 'BTC', 'LTC', 30000);
            }],
        }
    });
}])

.controller( 'SearchController', ['$sailsSocket', '$scope', '$stateParams', 'titleService', 'config', 'DataModel', 'marketData', 'PortfolioModel', function SearchController($sailsSocket, $scope, $stateParams, titleService, config, DataModel, marketData, PortfolioModel) {
    titleService.setTitle('collaborative.capital');
    $scope.currentUser = config.currentUser;
    $scope.marketData = marketData;
    $scope.stateParams = $stateParams.path

}]);
