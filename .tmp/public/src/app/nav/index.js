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
        //$mdSidenav('subNav').close();
    });

    $rootScope.tradingPairs = [
        'XRP/BTC',
        'ETH/BTC',
        'BTC/USDT',
        'LTC/BTC',
        'BCH/BTC',
        'STR/BTC',
        'XRP/USDT',
        'ETH/USDT',
        'BCH/USDT',
        'XMR/BTC',
        'ZEC/BTC',
        'LTC/USDT',
        'DASH/BTC',
        'ETC/BTC',
        'XEM/BTC',
        'ZEC/USDT',
        'FCT/BTC',
        'ETC/USDT',
        'BTS/BTC',
        'LSK/BTC',
        'DGB/BTC',  
        'NXT/BTC',
        'SC/BTC',
        'STRAT/BTC',
        'NXT/USDT',
        'DOGE/BTC',
        'DASH/USDT',
        'XMR/USDT',
        'BCH/ETH',
        'ZRX/BTC',  
        'ARDR/BTC',
        'VTC/BTC',
        'OMG/BTC',
        'MAID/BTC',
        'GNT/BTC',  
        'GAME/BTC',
        'CVC/BTC',  
        'REP/BTC',
        'STEEM/BTC',
        'SYS/BTC',
        'BCN/BTC',
        'LBC/BTC',
        'DCR/BTC',
        'ZEC/ETH',
        'REP/USDT',
        'ETC/ETH',
        'LTC/XMR',
        'ZRX/ETH',
        'PPC/BTC',
        'GAS/BTC',
        'BURST/BTC',
        'PASC/BTC', 
        'VIA/BTC',
        'OMG/ETH',
        'STORJ/BTC',
        'GNT/ETH',
        'CLAM/BTC', 
        'NAV/BTC',
        'XCP/BTC',
        'LSK/ETH',
        'OMNI/BTC', 
        'SBD/BTC',
        'NMC/BTC',
        'CVC/ETH',
        'NXT/XMR',
        'ZEC/XMR',
        'REP/ETH',
        'MAID/XMR', 
        'DASH/XMR', 
        'HUC/BTC',
        'STEEM/ETH',
        'BCN/XMR',
    ];

    $rootScope.loginToggle = function(){$mdSidenav('nav').close();$mdSidenav('login').toggle();};
    $rootScope.marketsToggle = function(){$mdSidenav('markets').toggle()};
    $rootScope.navToggle = function(){$mdSidenav('nav').toggle()};
    //$rootScope.subNavToggle = function(){$mdSidenav('subNav').toggle()};
    $scope.isActive = function (viewLocation) { return viewLocation === $location.path()};

}]);