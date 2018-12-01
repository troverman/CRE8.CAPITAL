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
	titleService.setTitle('Markets | collaborative.capital');
    $scope.marketData = marketData;
    $scope.selectedDelta = '60000';

    //STORE AS VECTOR
    //MATRIX - VECTOR SET WITH 1 TRAVERSAL
    $scope.vector = {
        BTC:{
            BTC:1,
            LTC:0.1,
            XMR:0.4,
            XRP:0.003,
        }
    };

    $scope.matrix = {
        BTC:{
            BTC:1,
            LTC:1,
            XMR:1,
            XRP:1,
        },
        LTC:{
            BTC:1,
            LTC:1,
            XMR:1,
            XRP:1,
        },
        XMR:{
            BTC:1.7,
            LTC:0.5,
            XMR:1,
            XRP:0.09,
        },
        XRP:{
            BTC:1.7,
            LTC:0.5,
            XMR:0.09,
            XRP:1,
        }
    };

    $scope.orderBookMatrix = {
        BTC:{
            BTC: null,
            LTC: {bids:[],asks:[]},
            XMR: {bids:[],asks:[]},
            XRP: {bids:[],asks:[]},
        },
    };

    $scope.vector = {
        name:'BTC', 
        data:[
            {name:'BTC', data:1},
            {name:'LTC', data:0.1},
            {name:'XRP', data:0.4},
            {name:'XMR', data:0.003},
        ]
    };

    $scope.matrix = [{
        name:'BTC', 
        data:[
            {name:'BTC', data:1},
            {name:'LTC', data:0.1},
            {name:'XRP', data:0.003},
            {name:'XMR', data:0.4},
        ]
    },{
        name:'LTC', 
        data:[
            {name:'BTC', data:10},
            {name:'LTC', data:1},
            {name:'XRP', data:0.3},
            {name:'XMR', data:17},
        ]
    },{
        name:'XMR', 
        data:[
            {name:'BTC', data:1.7},
            {name:'LTC', data:0.5},
            {name:'XMR', data:1},
            {name:'XRP', data:0.09},
        ]
    },{
        name:'XRP', 
        data:[
            {name:'BTC', data:10002},
            {name:'LTC', data:203},
            {name:'XMR', data:540},
            {name:'XRP', data:1},
        ]
    }];

    $scope.orderBookMatrix = [{
        name: 'BTC',
        data:[
            {name:'LTC', bids:[], asks:[]},
            {name:'XMR', bids:[], asks:[]},
            {name:'XRP', bids:[], asks:[]},
        ],
    }];

    $scope.orderBook = [{
        name: 'BTC',
        data:[
            {name:'LTC', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
            {name:'XMR', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
            {name:'XRP', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
        ],
    }];


    //LISTEN TO SET OF EXCHANGES
    //LISTEN TO ORDER BOOK CHANGES --> SOCKET


    //^^LIST OR NESTED OBJ?
    //{"BTC":data:{"BTC":1,"LTC",0.2}}
    //[{name:'BTC', data:[{name:'BTC', data:1}]}]
    //NESTED OBJ :)

    //TENSOR IS TRAVERSAL / NEST AND COMBINATIORIAL

    //HODLING 2 AT SAME TIME

    //TODO: NOT STATIC
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
        'GNO/BTC',
        'PPC/BTC',
        'GAS/BTC',
        'BURST/BTC',
        'PASC/BTC', 
        'VIA/BTC',
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
        'SBD/BTC',
        'NMC/BTC',
        'GNO/ETH',
        'CVC/ETH',
        'NXT/XMR',
        'ZEC/XMR',
        'XPM/BTC',
        'BTCD/BTC', 
        'REP/ETH',
        'MAID/XMR', 
        'DASH/XMR', 
        'HUC/BTC',
        'STEEM/ETH',
        'BCN/XMR',
        'BTCD/XMR', 
    ];

    $scope.chartConfig = {
        chart: {
            type: 'area',
            zoomType: 'x',
            marginLeft: 70,
            marginTop: 20,
            height: 750
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        title:{text: null},
        colors: ['#14b794'],
        series: [],
        xAxis: {
            type: 'datetime',
            currentMin: 0,
            currentMax: 20,
            title: null,
            crosshair: true,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        },
        yAxis: {
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false
                }
            }
        },
        credits: {enabled:false},
        loading: false,
        time: {
            timezoneOffset: 5 * 60
        },
        tooltip: {
            split: true
        },
    };


    $scope.marketDataRender = {};
    $scope.marketDataRenderRender = [];

    //do an analysis of % change...
    $scope.dataMap = {};
    $scope.iterator = 0;
    //TODO: REDO
    $scope.selectData = function (asset1, asset2, delta){
        $rootScope.stateIsLoading = true;
        $scope.selectedDelta = delta;
        DataModel.getData(100, 0, 'createdAt DESC', asset1, asset2, delta).then(function(model){
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
                    $scope.marketDataRender[asset1+'_'+asset2].values.push([parseInt(new Date($scope.dataMap[asset1+'_'+asset2][x].createdAt).getTime()), change]);
                }
            }
            $scope.iterator++
            console.log($scope.iterator, $scope.selectedPairs.length)
            if ($scope.iterator == $scope.selectedPairs.length){

                for (x in Object.keys($scope.marketDataRender)){
                    console.log(Object.keys($scope.marketDataRender)[x]);
                    $scope.marketDataRenderRender.push($scope.marketDataRender[Object.keys($scope.marketDataRender)[x]]);
                    var series = {
                        id: Object.keys($scope.marketDataRender)[x],
                        name: Object.keys($scope.marketDataRender)[x],
                        lineWidth: 1.2,
                        color:'#'+(Math.random()*0xFFFFFF<<0).toString(16),
                        data: $scope.marketDataRender[Object.keys($scope.marketDataRender)[x]].values
                    };
                    $scope.chartConfig.series.push(series);
                    $rootScope.stateIsLoading = false;
                    $scope.iterator = 0;
                }
                console.log($scope.marketDataRenderRender)
            }
        });
    };

    $scope.selectTime = function(delta, asset){
        $scope.marketDataRender = {};
        $scope.marketDataRenderRender = [];
        $scope.chartConfig.series = [];
        $scope.selectedPairs = $scope.tradingPairs.filter(function(obj){
            if (obj.split('/')[1]==asset){return obj;}
            else{if(asset == 'all'){return obj}}
        });
        for (x in $scope.selectedPairs){
            $scope.selectData($scope.selectedPairs[x].split('/')[1], $scope.selectedPairs[x].split('/')[0], delta);
        }
    };

    //$scope.selectTime('60000', 'BTC');

    $scope.solvePortfolio = function(delta, limit){
        $scope.portfolioData = {};
        $rootScope.stateIsLoading = true;
        AnalysisModel.getPortfolioSolve($scope.selectedDelta, 100).then(function(data){
            $rootScope.stateIsLoading = false;
            $scope.portfolioData = data;
            console.log(data);
            //$scope.updatePortfolio(data.portfolioSet);
        });
    };

    $scope.solvePortfolioMulti = function(delta, limit){
        $scope.portfolioData = {};
        $rootScope.stateIsLoading = true;
        AnalysisModel.getPortfolioSolveMulti($scope.selectedDelta, 100).then(function(data){
            $rootScope.stateIsLoading = false;
            $scope.portfolioData = data;
            //$scope.updatePortfolio(data.portfolioSet);
        });
    };

    $scope.solvePortfolioPDF = function(delta, limit){
        $scope.portfolioData = {};
        $rootScope.stateIsLoading = true;
        AnalysisModel.getPortfolioSolvePDF($scope.selectedDelta, limit).then(function(data){
            $rootScope.stateIsLoading = false;
            $scope.portfolioData = data;
        });
    };

    /*
    $scope.updatePortfolio = function(data){
        for (y in data){
            $scope.portfolioData.portfolioSet[y].data = [];
            $scope.portfolioData.portfolioSet[y].labels = [];
            for (x in Object.keys(data[y])){
                $scope.portfolioData.portfolioSet[y].data.push(data[y][Object.keys(data[y])[x]])
                $scope.portfolioData.portfolioSet[y].labels.push(Object.keys(data[y])[x])
            }
        }
    };

    $scope.selectedPortfolioIndex = 0;
    $scope.selectedPortfolio = {};
    $scope.selectPortfolioSet = function(number){
        $scope.selectedPortfolioIndex ++//= parseInt(number);  
        $selectedPortfolio = $scope.portfolioData.portfolioSet[$scope.selectedPortfolioIndex];
        //console.log($selectedPortfolio)
    }
    */

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