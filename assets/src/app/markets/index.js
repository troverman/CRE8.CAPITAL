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
            marketImage: ['$stateParams', 'DataModel', function(DataModel) {
                //return DataModel.getMarketImage();
                return null;
            }],
            assets: ['AssetModel', function(AssetModel) {
                return AssetModel.getSome({limit:10000, skip:0, sort:'string ASC'});
            }]
        }
	});
}])

.controller( 'MarketsCtrl', ['$rootScope', '$sailsSocket', '$scope', 'AnalysisModel', 'assets', 'config', 'DataModel', 'marketImage', 'titleService', function MarketsController( $rootScope, $sailsSocket, $scope, AnalysisModel, assets, config, DataModel, marketImage, titleService ) {
	titleService.setTitle('Markets | CRE8.CAPITAL');
    $scope.marketImage = marketImage;
    $scope.selectedDelta = '60000';

    DataModel.getMarketImage().then(function(data){
        $scope.marketImage = data;
        console.log($scope.marketImage);
    });

    //assets ~ tokens 
    //--> asset is better marketing LOL

    $scope.assets = assets;
    console.log(assets);

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
    //TODO: REDO

    $scope.matrix = [];
    $scope.selectData = function (asset1, asset2, delta){

        $rootScope.stateIsLoading = true;
        $scope.selectedDelta = delta;

        var row = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset1);
        var row1 = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset2);

        DataModel.getData(100, 0, 'createdAt DESC', asset1, asset2, delta).then(function(model){

            $scope.dataMap[asset1+'_'+asset2] = model;

            var column = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset2);
            var column1 = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset1);

            $scope.matrix[row].data[column].data = parseFloat(model[0].price);
            $scope.matrix[row1].data[column1].data = 1/parseFloat(model[0].price);

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


    $scope.uniqueMarkets = $rootScope.tradingPairs.map(function(obj){return obj.split('/');});
    $scope.uniqueMarkets = [].concat.apply([], $scope.uniqueMarkets);
    $scope.uniqueMarkets = $scope.uniqueMarkets.filter(function(item, pos) {return $scope.uniqueMarkets.indexOf(item) == pos});
    $scope.uniqueMarkets.sort(function(a, b){
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    });

    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("XMR"), 1); $scope.uniqueMarkets.unshift('XMR');
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("ETH"), 1); $scope.uniqueMarkets.unshift('ETH');
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("USDT"), 1); $scope.uniqueMarkets.unshift('USDT');
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("BTC"), 1); $scope.uniqueMarkets.unshift('BTC');
    
    $scope.uniqueMarkets.forEach(function(obj){
        $scope.matrix.push({name:obj.split('/')[0], data:[]});
        $scope.uniqueMarkets.forEach(function(obj1){
            var index = $scope.matrix.map(function(obj2){return obj2.name}).indexOf(obj.split('/')[0]);
            var data = '--';
            if (obj == obj1){data = 1}
            $scope.matrix[index].data.push({name:obj1.split('/')[0], data:data});
        });
    });

    $scope.selectTime('60000', 'XMR');
    $scope.selectTime('60000', 'ETH');
    $scope.selectTime('60000', 'USDT');
    $scope.selectTime('60000', 'BTC');


    //AnalysisModel.getPortfolioSolve('30000', 100).then(function(data){
    //    console.log(data);
    //})
    

}]);