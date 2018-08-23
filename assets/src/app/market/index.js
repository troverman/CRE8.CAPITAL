angular.module( 'investing.market', [
])

.config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state( 'market', {
        url: '/market/:path1/:path2',
        views: {
            "main": {
                controller: 'MarketCtrl',
                templateUrl: 'market/index.tpl.html'
            }
        },
        resolve:{
            marketData: ['$stateParams', 'DataModel', function($stateParams, DataModel) {
                return DataModel.getData(1000, 0, 'createdAt DESC', $stateParams.path1.toUpperCase(), $stateParams.path2.toUpperCase(), 300000);
                //return null
            }],
            orders: ['$stateParams', 'OrderModel', function($stateParams, OrderModel) {
                return OrderModel.getSome(50, 0, 'createdAt DESC', $stateParams.path1.toUpperCase(),  $stateParams.path2.toUpperCase());
            }],
        }
    });
}])

.controller( 'MarketCtrl', ['$mdSidenav', '$rootScope', '$sailsSocket', '$scope', '$stateParams', 'AnalysisModel', 'config', 'DataModel', 'marketData', 'orders', 'OrderBookModel', 'PredictionModel', 'TradeModel', 'titleService', function MarketController( $mdSidenav, $rootScope, $sailsSocket, $scope, $stateParams, AnalysisModel, config, DataModel, marketData, orders, OrderBookModel, PredictionModel, TradeModel, titleService ) {
    
    //TODO: VOLUME IN OUT -- via trades
    //TODO: ORDERBOOK MAP -- over time -- 3d
    //TODO: EXCHANGE AGNOSTIC

    //TODO: INDICATOR LOGIC
    //TODO: HIGHCHARTS?
    //TODO: live price.. ticker call -- socket. --> in title!
    titleService.setTitle($stateParams.path1.toUpperCase()+'/'+$stateParams.path2.toUpperCase()+' | collaborative.capital');

    $scope.marketData = marketData;
    $scope.stateParams = $stateParams;
    $scope.selectedPair = [$stateParams.path1.toUpperCase(),$stateParams.path2.toUpperCase()];
    $scope.selectedDelta = '300000';
    $scope.orderBook = {};
    $scope.orders = orders;
    $scope.trades = [];

    //TODO
    $scope.sideNavToggle = function(){
        $mdSidenav('left').toggle();
    };

    //TODO -- better than this
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

    $scope.chartConfig = {
        chart: {
            type: 'line',
            zoomType: 'x',
            marginLeft: 70,
            //marginBottom: 40,
            marginTop: 20,
            height: 500
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        title:{text: null},
        //legend: {enabled: false},
        colors: ['#14b794'],
        series: [{
            id: 'price',
            name: $stateParams.path1.toUpperCase() + ' | ' + $stateParams.path2.toUpperCase(),
            lineWidth: 1.2, 
            data:[],
        },{
            id: 'bid',
            name: $stateParams.path1.toUpperCase() + '_' + $stateParams.path2.toUpperCase()+' bid',
            lineWidth: 1.2, 
            data:[],
            color:'#a94442'
        },{
            id: 'ask',
            name: $stateParams.path1.toUpperCase() + '_' + $stateParams.path2.toUpperCase()+' ask',
            lineWidth: 1.2, 
            data:[],
            color:'#f94442'
        },
        {
            id: 'change',
            color:'#a94442',
            type: 'line',
            name: $stateParams.path1.toUpperCase() + ' | ' + $stateParams.path2.toUpperCase()+' change',
            lineWidth: 1.2, 
            yAxis: 1, 
            data:[]

        }],
        xAxis: {
            type: 'datetime',
            currentMin: 0,
            currentMax: 20,
            title: null,
            crosshair: true,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'

        },
        yAxis: [{
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        },
        {
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        }],
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
        //tooltip: {
        //    split: true
        //},
    };

    $scope.bidAskChart = {
        chart: {
            type: 'bar',
            zoomType: 'x',
            height: 500,
        },
        legend:{enabled:false},
        title: {
            text: null
        },
        xAxis: {
            crosshair: true,
            opposite: true,
            reversed: false
        },
        yAxis: {
            title: {
                text: null
            },

        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            id: 'Bids',
            name: 'Bids',
            color: '#a94442',
            data: []
        },{
            id:  'Asks',
            name: 'Asks',
            color: '#14b794',
            data: []
        }],
        credits:{enabled:false},
    };

    $scope.changeChart = {
        chart: {
            type: 'line',
            zoomType: 'x',
            marginLeft: 70,
            marginTop: 20,
            height: 500
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        title:{text: null},
        colors: ['#f94442'],
        series: [{
            id: 'changechange',
            color:'#f94442',
            type: 'line',
            name: $stateParams.path1.toUpperCase() + ' | ' + $stateParams.path2.toUpperCase()+' Change',
            lineWidth: 1.2, 
            yAxis: 0, 
            data:[]
        },{
            id: 'bidChange',
            name: 'Bid Change',
            type: 'line',
            color: '#a94442',
            lineWidth: 1.2, 
            data: []
        },{
            id: 'askChange',
            name: 'Ask Change',
            type: 'line',
            color: '#14b794',
            lineWidth: 1.2, 
            data: []
        }],
        xAxis: {
            type: 'datetime',
            currentMin: 0,
            currentMax: 20,
            title: null,
            crosshair: true,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'

        },
        yAxis: [{
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        }],
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
    };

    $scope.changeChangeChart = {
        chart: {
            type: 'line',
            zoomType: 'x',
            marginLeft: 70,
            marginTop: 20,
            height: 500
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        title:{text: null},
        colors: ['#14b794'],
        series: [{
            id: 'changechange',
            color:'#a94442',
            type: 'line',
            name: $stateParams.path1.toUpperCase() + ' | ' + $stateParams.path2.toUpperCase()+' Change Change',
            lineWidth: 1.2, 
            yAxis: 0, 
            data:[]
        }],
        xAxis: {
            type: 'datetime',
            currentMin: 0,
            currentMax: 20,
            title: null,
            crosshair: true,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'

        },
        yAxis: [{
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        }],
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
    };

    $scope.oscillatorChart = {
        chart: {
            type: 'line',
            zoomType: 'x',
            marginLeft: 70,
            marginTop: 20,
            height: 500
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        title:{text: null},
        colors: ['#f94442'],
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
        yAxis: [{
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        }],
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
    };

    //TODO: DEPRECIATE
    $scope.marketGraphData = {};
    $scope.marketGraphData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1];
    $scope.marketGraphData.color = '#14b794';
    $scope.marketGraphData.values = [];

    $scope.marketGraphChangeData = {};
    $scope.marketGraphChangeData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] +' Change';
    $scope.marketGraphChangeData.color = '#a94442';
    $scope.marketGraphChangeData.values = [];

    $scope.marketGraphOscillatorDataRender = [];

    //TODO: REFACTOR
    //HEATMAP
    var heatmapData = {};
    heatmapData.labels = [];
    heatmapData.labels = ['Time1','Time2','Time3','Time4','Time5','Time6','Time7','Time8','Time9','Time10','Time11','Time12','Time13','Time14','Time15','Time16','Time17','Time18','Time19','Time20','Time21','Time22','Time23','Time24','Time25', 'Time26'],
    //for(var i = 0; i<=100; i++){
    //   heatmapData.labels.push('Time'+i);
    //}
    heatmapData.datasets = [];
    $scope.clientWidth = document.body.clientWidth;
    for(var i = 25; i>=-25; i--){
        var dataInsert = 0;
        if (i == 0){dataInsert = 100}
        else if (i == 1 || i == -1){dataInsert = 75}
        else{dataInsert = Math.abs(parseInt( 1/i * 100 ))}
        //var dataSet = [];
        //for(var i = 0; i<=100; i++){
        //    dataSet.push(dataInsert);
        //}
        //heatmapData.datasets.push({label:(1*i).toString(), data:[dataSet]})
        heatmapData.datasets.push({label:(1*i).toString(), data:[dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert,dataInsert]})
    }

    var ctx = document.getElementById('tableHeatmap').getContext('2d');
    var heatmapOptions = {rounded: false, showLabels: false};
    var newChart = new Chart(ctx).HeatMap(heatmapData, heatmapOptions);

    //ORDERBOOK
    OrderBookModel.getSome(1, 0, 'createdAt DESC', $stateParams.path1.toUpperCase(), $stateParams.path2.toUpperCase()).then(function(orderBookModel){
        $scope.orderBook = orderBookModel[0];

        $scope.sumBids = [];
        $scope.orderBook.bids.reduce(function(a,b,i) {
            return $scope.sumBids[i] = parseFloat(a) + parseFloat(b[1]);
        }, 0);

        $scope.sumAsks = [];
        $scope.orderBook.asks.reduce(function(a,b,i) {
            return $scope.sumAsks[i] = parseFloat(a) + parseFloat(b[1]);
        }, 0);

        for (x in $scope.orderBook.bids){
            $scope.bidAskChart.series[0].data.push([parseFloat(orderBookModel[0].bids[x][0]),$scope.sumBids[x]]);
        }
        for (x in $scope.orderBook.asks){
            $scope.bidAskChart.series[1].data.push([parseFloat(orderBookModel[0].asks[x][0]),$scope.sumAsks[x]]);
        }
        $scope.bidAskChart.series[0].data = $scope.bidAskChart.series[0].data.reverse().slice($scope.bidAskChart.series[0].data.length-250,$scope.bidAskChart.series[0].data.length);
        $scope.bidAskChart.series[1].data = $scope.bidAskChart.series[1].data.slice(0,250);
    });

    $scope.selectedClass= function(delta){
        if($scope.selectedDelta==delta){return 'btn btn-primary'}
        else{return 'btn btn-default'}
    };

    $scope.getLive = function(){
        $scope.selectedDelta = 'Live';//HAK-CLEAN
        TradeModel.getSome(1000, 0, 'createdAt DESC', $stateParams.path1.toUpperCase(), $stateParams.path2.toUpperCase()).then(function(tradeModel){
            console.log(tradeModel);
            //$scope.trades = tradeModel;
            $scope.marketGraphData.values = [];
            //HIGHCHARTS
            $scope.chartConfig.series = [{
                name: $stateParams.path1.toUpperCase() + '_' + $stateParams.path2.toUpperCase(),
                lineWidth: 1.2, 
                data:[]
            }];
            $scope.marketData = tradeModel;
            $scope.updateMarketData(function(){});
        });
    };

    //TODO: LOL
    $scope.getPdf = function (){
        $rootScope.stateIsLoading = true;
        //$scope.marketData.reverse().slice($scope.marketData.length-350, $scope.marketData.length)
        AnalysisModel.getPdf($scope.marketData.slice(0,350)).then(function(returnData){
            
            //console.log(returnData);
            var heatmapData = {};
            var pdfData = returnData.heatMap.slice(returnData.heatMap.length-100, returnData.heatMap.length);
            heatmapData.labels = [];
            heatmapData.datasets = [];

            for(x in pdfData){
                heatmapData.labels.push(x);//$scope.marketData[x].createdAt);
            }
            var sortedKeys = Object.keys(pdfData[0]).sort(function(a,b){return b - a})
            for (x in sortedKeys){ 
                var dataArray = [];
                var key = sortedKeys[x];
                if (key < 0.20 && key > -0.20){
                    for (z in pdfData){
                        dataArray.push(pdfData[z][key]*1000);
                    }
                    heatmapData.datasets.push({label:key, data:dataArray})
                }
            }

            console.log(heatmapData);
            var ctx = document.getElementById('tableHeatmap').getContext('2d');
            var heatmapOptions = {rounded: false, showLabels: false};
            var newChart = new Chart(ctx).HeatMap(heatmapData, heatmapOptions);
            $rootScope.stateIsLoading = false;

        });
    };
    //$scope.getPdf();

    $scope.getEma = function (periodArray, type){
        $rootScope.stateIsLoading = true;
        var periodArray = periodArray;
        for(x in periodArray){
            (function(x, periodArray) {
                AnalysisModel.getEma($scope.marketData, periodArray[x], type).then(function(emaData){    
                    var emaGraphData = {};
                    emaGraphData.name = 'EMA_'+periodArray[x];
                    emaGraphData.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                    emaGraphData.data = emaData;
                    emaGraphData.lineWidth = 1.2;
                    emaGraphData.id = emaGraphData.name;
                    $scope.chartConfig.series.push(emaGraphData);
                    //$scope.changeChart.series.push(emaGraphData);
                    //$scope.changeChangeChart.series.push(emaGraphData);
                    $rootScope.stateIsLoading = false;
                });
            })(x, periodArray);
        }
    };
    //$scope.getEma([10,20,40,80,160,320], 'price');
    $scope.getEma([40, 80, 160, 320], 'price');

    $scope.getMacd = function (shortPeriod, longPeriod, signalPeriod, type){
        $rootScope.stateIsLoading = true;
        for (x in $scope.oscillatorChart.series){$scope.oscillatorChart.series[x].data = [];}
        var periodArray = [3,5,10,20,40,80];
        for(x in periodArray){
            //for (y in periodArray){
                (function(x, periodArray) {
                    AnalysisModel.getMacd($scope.marketData, periodArray[x], 2*periodArray[x], 3*periodArray[x]).then(function(macdData){
                        var macdGraphData = {};
                        macdGraphData.name = 'MACD_'+periodArray[x]+'_'+2*periodArray[x]+'_'+3*periodArray[x];
                        macdGraphData.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                        macdGraphData.data = macdData;
                        macdGraphData.lineWidth = 1.2;
                        macdGraphData.id = macdGraphData.name;
                        $scope.oscillatorChart.series.push(macdGraphData);
                        $rootScope.stateIsLoading = false;
                    });
                })(x, periodArray);
            //}
        }
    };
    $scope.getMacd();

    $scope.getTsf = function (periodArray){
        $rootScope.stateIsLoading = true;
        var periodArray = [3,5,10,20,40,80,160,320,640,1000];
        for(x in periodArray){
        //for (var x=1; x <= 100; x++){
            (function(x, periodArray) {
                //AnalysisModel.getTsf($scope.marketData.reverse(), x).then(function(tsfData){
                AnalysisModel.getTsf($scope.marketData, periodArray[x]).then(function(tsfData){
                    var tsfGraphData = {};
                    tsfGraphData.name = 'TSF_'+periodArray[x];
                    tsfGraphData.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                    tsfGraphData.data = tsfData;
                    tsfGraphData.lineWidth = 1.2;
                    tsfGraphData.id = tsfGraphData.name;
                    $scope.chartConfig.series.push(tsfGraphData);
                    //$scope.changeChart.series.push(tsfGraphData);
                    //$scope.changeChangeChart.series.push(tsfGraphData);
                    $rootScope.stateIsLoading = false;
                });
            })(x, periodArray);
        }
    };
    //$scope.getTsf([3,5,10,20,40,80,160,320,640,1000]);

    $scope.getFosc = function (periodArray, type){
        $rootScope.stateIsLoading = true;
        for (x in $scope.oscillatorChart.series){$scope.oscillatorChart.series[x].data = [];}
        var periodArray = [3,5,10,20,40,80];
        for(x in periodArray){
            (function(x, periodArray) {
                AnalysisModel.getFosc($scope.marketData, periodArray[x]).then(function(foscData){
                    var foscGraphData = {};
                    foscGraphData.name = 'FOSC_'+periodArray[x];
                    foscGraphData.color = "#" + Math.random().toString(16).slice(2,8);;
                    foscGraphData.data = foscData;
                    foscGraphData.lineWidth = 1.2;
                    foscGraphData.id = foscGraphData.name;
                    $scope.oscillatorChart.series.push(foscGraphData);
                    $rootScope.stateIsLoading = false;
                });
            })(x, periodArray);
        }
    };
    //$scope.getFosc();

    $scope.getRsi = function (periodArray, type){
        $rootScope.stateIsLoading = true;
        for (x in $scope.oscillatorChart.series){$scope.oscillatorChart.series[x].data = [];}
        var periodArray = [3,5,10,20,40,80,160,320,640];
        for(x in periodArray){
            (function(x, periodArray) {
                AnalysisModel.getRsi($scope.marketData, periodArray[x]).then(function(rsiData){
                    var rsiGraphData = {};
                    rsiGraphData.name = 'RSI_'+periodArray[x];
                    rsiGraphData.color = "#" + Math.random().toString(16).slice(2,8);;
                    rsiGraphData.data = rsiData;
                    rsiGraphData.lineWidth = 1.2;
                    rsiGraphData.id = rsiGraphData.name;
                    $scope.oscillatorChart.series.push(rsiGraphData);
                    $rootScope.stateIsLoading = false;
                });
            })(x, periodArray);
        }
    };
    //$scope.getRsi();

    //TODO:BACKEND
    //TODO: WTF THE SHIFT?????
    $scope.getBband = function (periodArray, sdArray, type){
        $rootScope.stateIsLoading = true;
        var periodArray = periodArray;
        var sdArray = sdArray;
        var data = $scope.marketData;
        for(x in periodArray){
            for(y in sdArray){
                (function(x, y, periodArray, sdArray) {
                    console.log(periodArray[x], sdArray[y])
                    AnalysisModel.getBband(data, periodArray[x], sdArray[y], type).then(function(bbandData){

                        var bbandUpperGraphData = {};
                        var bbandMiddleGraphData = {};
                        var bbandLowerGraphData = {}
                        bbandUpperGraphData.name = 'UB_'+periodArray[x]+'_'+sdArray[y];
                        bbandLowerGraphData.name = 'LB_'+periodArray[x]+'_'+sdArray[y];
                        bbandUpperGraphData.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                        bbandLowerGraphData.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                        bbandUpperGraphData.data = bbandData.upper;
                        bbandLowerGraphData.data = bbandData.lower;
                        bbandUpperGraphData.lineWidth = 1.2;
                        bbandLowerGraphData.lineWidth = 1.2;
                        bbandUpperGraphData.id = bbandUpperGraphData.name;
                        bbandLowerGraphData.id = bbandLowerGraphData.name;

                        if (type=='price'){
                            $scope.chartConfig.series.push(bbandLowerGraphData);
                            $scope.chartConfig.series.push(bbandUpperGraphData);
                        }
                        if (type=='change'){
                            $scope.changeChart.series.push(bbandLowerGraphData);
                            $scope.changeChart.series.push(bbandUpperGraphData);
                        }
                        if (type=='changeChange'){
                            $scope.changeChangeChart.series.push(bbandLowerGraphData);
                            $scope.changeChangeChart.series.push(bbandUpperGraphData);
                        }
                        $rootScope.stateIsLoading = false;
                    });
                })(x, y, periodArray, sdArray);
            }
        }
    };
    //$scope.getBband([5,10,15,20], [2,2.5,3,3.5], 'price');
    //$scope.getBband([5,10,15], [0.5,1,1.5,2,2.5,3,3.5], 'price');
    //$scope.getBband([2,4,6,8,10,12,14,16,18,20], [2], 'price');
    //$scope.getBband([5,10,15], [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7], 'price');
    //$scope.getBband([50, 100], [2], 'change');
    $scope.getBband([10], [2], 'change');


    //TODO: DO IT
    $scope.getNn = function (periodArray, sdArray){}
    //$scope.getNn();
    //$scope.getNnPdf = function (periodArray, sdArray){}
    //$scope.getNnPdf();

    //TODO: REFACTOR
    $scope.updateMarketData = function (callback){
        $scope.marketData.reverse().forEach(function(obj, index){ 

            $scope.marketGraphData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.price]);
            $scope.marketGraphChangeData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.percentChange]);

            $scope.chartConfig.series[0].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(obj.price)]);
            $scope.chartConfig.series[1].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(obj.currentBid)]);
            $scope.chartConfig.series[2].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(obj.currentAsk)]);

            var change = 0;
            var changeChange = 0;
            var bidChange = 0;
            var askChange = 0;
            if (index > 1){
                change = obj.price - $scope.marketData[index-1].price;
                change = change/obj.price;
                bidChange = obj.currentBid - $scope.marketData[index-1].currentBid;
                bidChange = bidChange/obj.currentBid;
                askChange = obj.currentAsk - $scope.marketData[index-1].currentAsk;
                askChange = askChange/obj.currentAsk;
            }
            if ($scope.marketGraphChangeData.values.length > 1){
                changeChange = $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-1][1] - $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-2][1];
            }
            $scope.changeChart.series[0].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(obj.percentChange)]);
            $scope.changeChart.series[1].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(bidChange)]);
            $scope.changeChart.series[2].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(askChange)]);

            $scope.changeChangeChart.series[0].data.push([parseInt(new Date(obj.createdAt).getTime()), parseFloat(changeChange)]);
        });

        callback();

    };

    $scope.updateMarketData(function(){

        //TODO: PACKAGE
        var flagModel = {};
        flagModel.type = 'flags';
        flagModel.data = [];
        flagModel.onSeries = 'price';
        flagModel.name = 'Orders';
        flagModel.id = 'flags';
        flagModel.shape = 'flag';

        for (x in orders.reverse().slice(0,50)){
            if (parseInt(new Date(orders[x].createdAt).getTime()) > parseInt(new Date($scope.marketData.reverse()[0].createdAt).getTime())){
                var dataModel = {}
                dataModel.title = orders[x].type.substring(0, 1);
                dataModel.x = parseInt(new Date(orders[x].createdAt).getTime());
                dataModel.text = orders[x].type;
                flagModel.data.push(dataModel)
            }
        }
        $scope.chartConfig.series.push(flagModel);

        //$scope.getBband([500, 750], [0.5, 1, 2, 4, 6, 8], 'price');
        //$scope.getBband([50, 100], [2], 'change');
        //$scope.getEma([160, 320], 'price');
        //$scope.getBband([10], [2], 'change');

    });

    $scope.selectData = function (asset1, asset2, delta){
        $rootScope.stateIsLoading = true;
        $scope.selectedPair = [asset1.toUpperCase(), asset2.toUpperCase()];
        $scope.selectedDelta = delta;
        //if $scope.selectedDelta != delta
        DataModel.getData(1000, 0, 'createdAt DESC', asset1.toUpperCase(), asset2.toUpperCase(), delta).then(function(model){
           
            //HIGHCHARTS
            //$scope.chartConfig.series = [{
            //    name: $stateParams.path1.toUpperCase() + '_' + $stateParams.path2.toUpperCase(),
            //    lineWidth: 1.2, 
            //    data:[],
            //    id: 'price',
            //}];

            for (x in $scope.chartConfig.series){$scope.chartConfig.series[x].data = [];}
            for (x in $scope.changeChart.series){$scope.changeChart.series[x].data = [];}
            for (x in $scope.changeChangeChart.series){$scope.changeChangeChart.series[x].data = [];}
            for (x in $scope.oscillatorChart.series){$scope.oscillatorChart.series[x].data = [];}

            //TODO
            //TODO: reverse prob.
            $scope.marketData = model;
            $rootScope.stateIsLoading = false;
            $scope.updateMarketData(function(){

                var flagModel = {};
                flagModel.type = 'flags';
                flagModel.data = [];
                flagModel.onSeries = 'price';
                flagModel.name = 'Orders';
                flagModel.id = 'flags';
                flagModel.shape = 'flag';

                for (x in orders.reverse()){//.slice(0,50)){
                    if (parseInt(new Date(orders[x].createdAt).getTime()) > parseInt(new Date($scope.marketData[0].createdAt).getTime())){
                        var dataModel = {}
                        dataModel.title = orders[x].type.substring(0, 1);
                        dataModel.x = parseInt(new Date(orders[x].createdAt).getTime());
                        dataModel.text = orders[x].type;
                        flagModel.data.push(dataModel)
                    }
                }
                $scope.chartConfig.series.push(flagModel);

            });
        })
    };

    //TODO: LIVE PRICE
    //TODO: DECENTRALIZE
    //$sailsSocket.subscribe('ticker', function (envelope) {
    //    $scope.currentPrice = envelope.data
    //});

    //TODO: REFACTOR
    $sailsSocket.subscribe('data', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                console.log(envelope.data);
               /* if (envelope.data.assetPair==$scope.selectedPair[0]+'_'+$scope.selectedPair[1] && envelope.data.delta == $scope.selectedDelta){
                    
                    $scope.marketData.push(envelope.data);

                    var change = $scope.marketData[$scope.marketData.length-1].price - $scope.marketData[$scope.marketData.length-2].price;
                    change = change/$scope.marketData[$scope.marketData.length-1].price
                    $scope.marketGraphData.values.push([parseInt(new Date(envelope.data.createdAt).getTime()), envelope.data.price]);
                    $scope.marketGraphChangeData.push(envelope.data.percentChange);
                    //$scope.marketGraphChangeData.values.push([parseInt(new Date($scope.marketData[$scope.marketData.length-1].createdAt).getTime()), change]);

                    var changeChange = $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-1][1] - $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-2][1];
                    $scope.marketGraphChangeChangeData.values.push([parseInt(new Date($scope.marketData[$scope.marketData.length-1].createdAt).getTime()), changeChange]);

                    $scope.marketGraphDataRender = [$scope.marketGraphData]
                    $scope.marketGraphChangeDataRender = [$scope.marketGraphChangeData];
                    $scope.marketGraphChangeChangeDataRender = [$scope.marketGraphChangeChangeData];

                }
                if ($scope.marketData.length >= 1000){
                    $scope.marketData.shift();
                    $scope.marketGraphData.values.shift()
                    $scope.marketGraphDataRender = [$scope.marketGraphData];
                    $scope.marketGraphChangeDataRender = [$scope.marketGraphChangeData];
                    $scope.marketGraphChangeChangeDataRender = [$scope.marketGraphChangeChangeData];
                }*/
        }
    });


}]);