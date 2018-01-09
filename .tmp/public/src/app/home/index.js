angular.module( 'investing.home', [
])

.config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state( 'home', {
        url: '/',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/index.tpl.html'
            }
        },
        resolve:{
            marketData: ['DataModel', function(DataModel) {
                return DataModel.getData(100, 0, 'createdAt DESC', 'BTC', 'LTC', 30000);
            }],
            orders: ['OrderModel', function(OrderModel) {
                return OrderModel.getSome(25, 0, 'createdAt DESC');
            }],
        }
    });
}])

.controller( 'HomeCtrl', ['$sailsSocket', '$scope', 'titleService', 'config', 'DataModel', 'marketData', 'orders', function HomeController($sailsSocket, $scope, titleService, config, DataModel, marketData, orders) {
    titleService.setTitle('collaborative.capital');
    $scope.currentUser = config.currentUser;
    $scope.marketData = marketData;
    $scope.selectedPair = ['BTC','LTC'];
    $scope.selectedDelta = '30000';
    $scope.orders = orders;
    $scope.portfolioData = [];
    $scope.portfolioLabels = [];

    $scope.portfolio = {"BTC":11.060538745890252,"XRP":0,"ETH":0,"LTC":0,"BCH":0,"XMR":0,"ZEC":0,"DASH":0,"ETC":0,"XEM":0,"FCT":0,"BTS":0,"LSK":0,"DGB":263591.5069943809,"EMC2":38176.577348262574,"NXT":0,"SC":1325411.3022239534,"POT":0,"STRAT":0,"DOGE":0,"ZRX":0,"ARDR":14560.05055129148,"VTC":0,"BTM":0,"OMG":0,"MAID":0,"VRC":0,"GNT":71252.02154826501,"GAME":272.12899820401367,"CVC":47150.833566708905,"REP":3814.1648113849833,"STEEM":0,"SYS":0,"BCN":0,"LBC":0,"DCR":0,"RIC":0,"GNO":0,"PPC":0,"GAS":0,"BURST":0,"PASC":0,"VIA":0,"FLO":62574.26509878051,"FLDC":0,"NEOS":0,"STORJ":0,"CLAM":9020.714522223534,"NAV":0,"XCP":51.04647785638911,"XBC":0,"AMP":97677.8501493588,"OMNI":0,"EXP":551.6313274360972,"GRC":667483.999663664,"BLK":0,"SBD":0,"PINK":0,"NMC":0,"RADS":0,"NXC":576399.0160247518,"XVC":0,"BELA":33664.128196055455,"XPM":0,"BTCD":992.928621698872,"BCY":0,"HUC":0}
    for (x in Object.keys($scope.portfolio)){
        $scope.portfolioData.push($scope.portfolio[Object.keys($scope.portfolio)[x]]);
        $scope.portfolioLabels.push(Object.keys($scope.portfolio)[x]);
    }

    $scope.tradingPairs = [
        'XRP/BTC',
        'ETH/BTC',
        'BTC/USDT',
        'LTC/BTC',
        'BCH/BTC',
        'XRP/USDT',
        'XLM/BTC',
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
        'EMC2/BTC',
        'NXT/BTC',
        'SC/BTC',
        'POT/BTC',  
        'STRAT/BTC',
        'NXT/USDT',
        'DOGE/BTC',
        'DASH/USDT',
        'XMR/USDT',
        'BCH/ETH',
        'ZRX/BTC',  
        'ARDR/BTC',
        'VTC/BTC',
        'BTM/BTC',  
        'OMG/BTC',
        'MAID/BTC',
        'VRC/BTC',  
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
        'RIC/BTC',
        'GNO/BTC',
        'PPC/BTC',
        'GAS/BTC',
        'BURST/BTC',
        'PASC/BTC', 
        'VIA/BTC',
        'FLO/BTC',
        'FLDC/BTC',
        'NEOS/BTC', 
        'OMG/ETH',
        'STORJ/BTC',
        'GNT/ETH',
        'CLAM/BTC', 
        'NAV/BTC',
        'XCP/BTC',
        'LSK/ETH',
        'XBC/BTC',
        'AMP/BTC',
        'OMNI/BTC', 
        'EXP/BTC',
        'GRC/BTC',
        'BLK/BTC',  
        'SBD/BTC',
        'PINK/BTC',
        'NMC/BTC',
        'RADS/BTC', 
        'GNO/ETH',
        'NXC/BTC',
        'XVC/BTC',
        'CVC/ETH',
        'BELA/BTC',
        'NXT/XMR',
        'ZEC/XMR',
        'XPM/BTC',
        'BTCD/BTC', 
        'REP/ETH',
        'BCY/BTC',
        'MAID/XMR', 
        'DASH/XMR', 
        'HUC/BTC',
        'STEEM/ETH',
        'BCN/XMR',
        'BTCD/XMR', 
        'BLK/XMR'
    ];

    $scope.marketOptions = {
        chart: {
            type: 'lineWithFocusChart',
            height: 550,
            margin : {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            x: function(d){ 
                return d[0]; 
            },
            y: function(d){ 
                return d[1]; 
            },
            color: d3.scale.category10().range(),
            duration: 1500,
            useInteractiveGuideline: true,
            clipVoronoi: true,
            xAxis: {
                axisLabel: 'Time',
                tickFormat: function(d) {
                    return d3.time.format('%m/%d/%y %H:%M:%S')(new Date(d))
                },
                staggerLabels: true
            },
            yAxis: {
                axisLabel: 'BTC/LTC',
                axisLabelDistance: 200
            }
        }
    };

    $scope.marketGraphData = {};
    $scope.marketGraphData.key = $scope.selectedPair[0]+'/'+$scope.selectedPair[1];
    $scope.marketGraphData.color = '#14b794';
    $scope.marketGraphData.values = [];

    $scope.marketGraphChangeData = {};
    $scope.marketGraphChangeData.key = $scope.selectedPair[0]+'/'+$scope.selectedPair[1] +' Change';
    $scope.marketGraphChangeData.color = '#14b794';//'#ff7f0e';
    $scope.marketGraphChangeData.values = [];

    $scope.seletetData = function (asset1, asset2, delta){
        $scope.selectedPair = [asset1, asset2];
        $scope.selectedDelta = delta;
        DataModel.getData(100, 0, 'createdAt DESC', asset1,  asset2, delta).then(function(model){
            $scope.marketData = model;
            $scope.updateMarketData();
        })
    };

    $scope.updateMarketData = function (){
        $scope.marketData.reverse().forEach(function(obj, index){ 
            $scope.marketGraphData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.price]);
            var change = 0;
            if (index > 1){
                change = (obj.price - $scope.marketData[index-1].price)/obj.price;
                console.log(change, obj.percentChange);
            }
            $scope.marketGraphChangeData.values.push([parseInt(new Date(obj.createdAt).getTime()), change]);
        });
        //$scope.marketGraphDataRender = [$scope.marketGraphData];
        $scope.marketGraphDataRender = [$scope.marketGraphChangeData];
        //$scope.marketGraphDataRender = [$scope.marketGraphData, $scope.marketGraphChangeData];
    };
    $scope.updateMarketData();

    $sailsSocket.subscribe('order', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.orders.push(envelope.data);
        }
    });
    
    $sailsSocket.subscribe('data', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                //console.log(envelope.data);
                if (envelope.data.assetPair==$scope.selectedPair[0]+'_'+$scope.selectedPair[1] && envelope.data.delta == $scope.selectedDelta){
                    console.log(envelope.data);
                    $scope.marketData.push(envelope.data);
                    var change = ($scope.marketData[$scope.marketData.length-1].price - $scope.marketData[$scope.marketData.length-2].price)/$scope.marketData[$scope.marketData.length-1].price;
                    $scope.marketGraphData.values.push([parseInt(new Date(envelope.data.createdAt).getTime()), envelope.data.price]);
                    $scope.marketGraphChangeData.values.push([parseInt(new Date($scope.marketData[$scope.marketData.length-1].createdAt).getTime()), change]);
                    $scope.marketGraphDataRender = [$scope.marketGraphData];
                    //$scope.marketGraphDataRender = [$scope.marketGraphChangeData];
                }
                if ($scope.marketData.length >= 300){
                    $scope.marketData.shift();
                    $scope.marketGraphData.values.shift()
                    $scope.marketGraphDataRender = [$scope.marketGraphData]
                }
        }
    });

    //sails.sockets.join(req, 'ticker', function(err) {
        //res.json({});
    //});

    /*
    $sailsSocket.subscribe('ticker', function (envelope) {
        //console.log(envelope);
        $scope.pendingTransactions = envelope;
        $scope.pendingTransactionsList.push(envelope);
        if ($scope.pendingTransactionsList.length >= 100){
            $scope.pendingTransactionsList.shift();
        }
    });
    */

}]);
