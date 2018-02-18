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

.controller( 'HomeCtrl', ['$sailsSocket', '$scope', 'titleService', 'config', 'DataModel', 'marketData', 'orders', 'PortfolioModel', function HomeController($sailsSocket, $scope, titleService, config, DataModel, marketData, orders, PortfolioModel) {
    titleService.setTitle('collaborative.capital');
    $scope.currentUser = config.currentUser;
    $scope.marketData = marketData;
    $scope.selectedPair = ['BTC','LTC'];
    $scope.selectedDelta = '30000';
    $scope.orders = orders;
    $scope.portfolioData = [];
    $scope.portfolioLabels = [];
    $scope.btcValue = 0;

    //EXAMPLE
    //DataModel.getExchangeMap().then(function(data){
    //    console.log(data);
    //    for (x in data){
    //        data[x].asset1, data[x].asset2, data[x].price
    //    }
    //});
    //-->extend over time, combine with protfolioequality and probabilities


    //TODO: normalize to btc price
    //TODO: update to ticker.. 
    //aka total 
    $scope.assets = [];
    if($scope.currentUser){


        DataModel.getLatestData().then(function(data){

            PortfolioModel.getAssets($scope.currentUser.id).then(function(assets){
                $scope.assets = assets;
                for (x in assets){
                    if(assets[x].symbol!='USDT'){
                        if (assets[x].symbol!='BTC' && assets[x].amount != 0){
                            //console.log(data);
                            var index = data.map(function(obj){return obj[0].asset2}).indexOf(assets[x].symbol);
                            var btcValue = assets[x].amount*data[index][0].price;
                            $scope.btcValue += btcValue;
                            //console.log($scope.btcValue, assets[x].symbol);
                        }
                        else{
                            $scope.btcValue += assets[x].amount;
                            //console.log($scope.btcValue, assets[x].symbol, assets[x].amount);
                        }
                    }
                }

                //TODO: IMPROVE
                for (x in assets){
                    if(assets[x].symbol!='USDT'){
                        if (assets[x].symbol!='BTC' && assets[x].amount != 0){
                            var index = data.map(function(obj){return obj[0].asset2}).indexOf(assets[x].symbol);
                            var btcValue = assets[x].amount*data[index][0].price;
                            $scope.portfolioData.push(btcValue/$scope.btcValue);
                            $scope.portfolioLabels.push(assets[x].symbol);
                        }
                        else{
                            $scope.portfolioData.push(assets[x].amount/$scope.btcValue);
                            $scope.portfolioLabels.push(assets[x].symbol);
                        }
                    }
                }  
            });

        });

        //OrderModel.getSome(25, 0, 'createdAt DESC', user:$scope.currentUser.id).then(function(data){
        //    $scope.orders = data
        //});

    }

    $scope.tradingPairs = [
        'XRP/BTC',
        'ETH/BTC',
        'BTC/USDT',
        'LTC/BTC',
        'BCH/BTC',
        'STR/BTC',
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
            showLegend:false,
            color: d3.scale.category10().range(),
            duration: 200,
            useInteractiveGuideline: false,
            clipVoronoi: true,
            chartContainer: '.chartContainer',
            xAxis: {
                //axisLabel: 'Time',
                tickFormat: function(d) {
                    return d3.time.format('%m/%d %H:%M.%S')(new Date(d))
                },
                staggerLabels: true,
                showMaxMin : false
            },
            yAxis: {
                //axisLabel: 'BTC/LTC',
                axisLabelDistance: 200,
                showMaxMin : false,
            },
            x2Axis: {
                tickValues:0,
                showMaxMin: false
            },
            y2Axis: {
                tickValues:0,
                axisLabelDistance: 200,
                showMaxMin : false
            },
        },
        //title: {
        //    enable: true,
        //    text: 'BTC/LTC',
        //    css: {
        //        'text-align': 'left',
        //        'color': 'white'
        //    }
        //},
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
