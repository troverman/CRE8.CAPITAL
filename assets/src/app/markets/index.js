angular.module( 'investing.markets', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'markets', {
		url: '/markets',
		views: {
			"main": {
				controller: 'MarketsCtrl',
				templateUrl: 'markets/index.tpl.html'
			}
		},
        resolve:{
            marketData: ['$stateParams', 'DataModel', function(DataModel) {
                return null;
                //return DataModel.getData(100, 0, 'createdAt DESC', 60000);
            }]
        }
	});
}])

.controller( 'MarketsCtrl', ['$rootScope', '$sailsSocket', '$scope', 'AnalysisModel', 'config', 'DataModel', 'marketData', 'titleService', function MarketsController( $rootScope, $sailsSocket, $scope, AnalysisModel, config, DataModel, marketData, titleService ) {
	titleService.setTitle('Markets - investingfor');

    $scope.marketData = marketData;
    $scope.selectedDelta = '60000';

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
            height: 850,
            margin : {
                top: 20,
                right: 0,
                bottom: 20,
                left: 30
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
                axisLabel: 'cre8', //$scope.selectedPair[0]+'_'+$scope.selectedPair[1],
                axisLabelDistance: 50
            }
        }
    };

    //$scope.marketDataRender = {};
    //$scope.marketDataRender.key = 'cre8';
    //$scope.marketDataRender.color = '#f94442';
    //$scope.marketDataRender.values = [];
    $scope.marketDataRender = {};
    $scope.marketDataRenderRender = [];


    //do an analysis of % change...

    
    $scope.dataMap = {}
    $scope.iterator = 0
    $scope.selectData = function (asset1, asset2, delta){
        $rootScope.stateIsLoading = true;

        //$scope.selectedPair = [asset1, asset2];
        //$scope.selectedDelta = delta;
        //if (asset1 == 'BTC'){
        DataModel.getData(60, 0, 'createdAt DESC', asset1, asset2, delta).then(function(model){

            $scope.marketDataRender[asset1+'_'+asset2] = {};
            $scope.marketDataRender[asset1+'_'+asset2].values = [];
            $scope.marketDataRender[asset1+'_'+asset2].key = asset1+'_'+asset2;
            $scope.marketDataRender[asset1+'_'+asset2].color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

            $scope.dataMap[asset1+'_'+asset2] = model;
            var change = 0;
            for (x in $scope.dataMap[asset1+'_'+asset2].reverse()){

                if (x > 1){
                    change = $scope.dataMap[asset1+'_'+asset2][x].price - $scope.dataMap[asset1+'_'+asset2][x-1].price;
                    change = change/$scope.dataMap[asset1+'_'+asset2][x].price;
                    $scope.marketDataRender[asset1+'_'+asset2].values.push([parseInt(new Date($scope.dataMap[asset1+'_'+asset2][x].createdAt).getTime()), change]);//$scope.dataMap[asset1+'_'+asset2][x].percentChange]);
                }

            }

            $scope.iterator++
            console.log($scope.iterator, $scope.selectedPairs.length)
            if ($scope.iterator == $scope.selectedPairs.length){
                for (x in Object.keys($scope.marketDataRender)){
                    console.log(Object.keys($scope.marketDataRender)[x]);
                    $scope.marketDataRenderRender.push($scope.marketDataRender[Object.keys($scope.marketDataRender)[x]]);
                    $rootScope.stateIsLoading = false;
                    $scope.iterator = 0;
                }
            }

        });
        //}
    };

    $scope.selectTime = function(delta, asset){

        $scope.marketDataRender = {};
        $scope.marketDataRenderRender = [];
        //$scope.tradingPairs = $scope.tradingPairs.map(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
        //console.log($scope.tradingPairs.map(function(obj){if (obj.split('/')[1]=='BTC'){return obj}}))

        $scope.selectedPairs = $scope.tradingPairs.filter(function(obj){
            if (obj.split('/')[1]==asset){return obj;}
            else{if(asset == 'all'){return obj}}
        });

        console.log($scope.selectedPairs);

        for (x in $scope.selectedPairs){
            $scope.selectData($scope.selectedPairs[x].split('/')[1], $scope.selectedPairs[x].split('/')[0], delta);
        }
        
    };

    //$scope.selectTime(300000, 'BTC');

    $scope.solvePortfolio = function(delta, limit){
        AnalysisModel.getPortfolioSolve(delta, limit).then(function(data){
            console.log(data);
            $scope.portfolioData = data;
        });
    };

    //AnalysisModel.getPortfolioSolve('30000', 100).then(function(data){
    //    console.log(data);
    //})

    /*$sailsSocket.subscribe('data', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                if (envelope.data.assetPair==$scope.selectedPair[0]+'_'+$scope.selectedPair[1] && envelope.data.delta == $scope.selectedDelta){
                    $scope.marketData.push(envelope.data);                   
                    $scope.marketGraphData.values.push([parseInt(new Date(envelope.data.createdAt).getTime()), envelope.data.price]);
                    $scope.marketGraphDataRender = [$scope.marketGraphData]
                }
                if ($scope.marketData.length >= 1000){
                    $scope.marketData.shift();
                    $scope.marketGraphData.values.shift()
                    $scope.marketGraphDataRender = [$scope.marketGraphData];
                }
        }
    });*/
    




}]);