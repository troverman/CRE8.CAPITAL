angular.module( 'investing.marketPair', [
])

.config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state( 'marketPair', {
        url: '/market/:path1/:path2',
        views: {
            "main": {
                controller: 'MarketPairCtrl',
                templateUrl: 'marketPair/index.tpl.html'
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

.controller( 'MarketPairCtrl', ['$mdSidenav', '$rootScope', '$sailsSocket', '$scope', '$stateParams', 'AnalysisModel', 'config', 'DataModel', 'marketData', 'orders', 'OrderBookModel', 'PredictionModel', 'TradeModel', 'titleService', function MarketController( $mdSidenav, $rootScope, $sailsSocket, $scope, $stateParams, AnalysisModel, config, DataModel, marketData, orders, OrderBookModel, PredictionModel, TradeModel, titleService ) {
    
    //TODO: VOLUME IN OUT -- via trades
    //TODO: ORDERBOOK MAP -- over time -- 3d
    //TODO: EXCHANGE AGNOSTIC

    //TODO: INDICATOR LOGIC
    //TODO: HIGHCHARTS?
    //TODO: live price.. ticker call -- socket. --> in title!
    titleService.setTitle($stateParams.path1.toUpperCase()+'/'+$stateParams.path2.toUpperCase()+' | CRE8.CAPITAL');

    $scope.marketData = marketData;
    $scope.stateParams = $stateParams;
    $scope.selectedPair = [$stateParams.path1.toUpperCase(),$stateParams.path2.toUpperCase()];
    $scope.selectedDelta = '300000';
    $scope.orderBook = {};
    $scope.orders = orders;
    $scope.trades = [];

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
            name: $stateParams.path1.toUpperCase() + ' | ' + $stateParams.path2.toUpperCase()+' Last Price',
            lineWidth: 1.2, 
            data:[],
        },{
            id: 'bid',
            name: $stateParams.path1.toUpperCase() + '_' + $stateParams.path2.toUpperCase()+' Selling Price (BID)',
            lineWidth: 1.2, 
            data:[],
            color:'#a94442',
            type: 'line',
        },{
            id: 'ask',
            name: ''+ $stateParams.path1.toUpperCase() + '_' + $stateParams.path2.toUpperCase()+' Buying Price (ASK)',
            lineWidth: 1.2, 
            data:[],
            color:'#f94442',
            type: 'line',
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

    $scope.heatMapChart = {
        chart: {
            type: 'heatmap',
            marginTop: 0,
            marginBottom: 0,
            plotBorderWidth: 1,
            zoomType: 'xy',
            events: {
                redraw: function () {
                    var data = this.series[0].data
                    var xe = this.xAxis[0].getExtremes()
                    var ye = this.yAxis[0].getExtremes()
                    var filteredData = data.filter(function(point){
                        return point.x <= xe.max && point.x >= xe.min && point.y <= ye.max && point.y >= ye.min
                    });
                }
            }
        },
        boost: {
            useGPUTranslations: true
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: [],
            title: null,
            type: 'datetime',
        },
        yAxis: {
            categories: [],
            title: null
        },
        tooltip: {
            formatter: function () {
                return this.series.xAxis.categories[this.point.x] + ' | ' + this.series.yAxis.categories[this.point.y] + ' | ' + this.point.value+'%';
            }
        },
        colorAxis: {
            min: -1,
            minColor: '#FFFFFF',
            maxColor: '#000000',
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },
        colorAxis: {
            reversed: false,
            stops: [
                [0, '#FFFFFF'],
                [0.01, '#3060cf'],
                [0.25, '#fffbbc'],
                [1, '#c4463a']
            ],
            min: 0,
            max: 5,
            startOnTick: false,
            endOnTick: false,
            labels: {
                format: '{value}%'
            }
        },
        series: [{
            boostThreshold: 100,
            id: 'pdf',
            name: 'Probability Density Function',
            borderWidth: 0,
            data: [],
            dataLabels: {
                enabled: false,
                //color: '#000000'
            }
        }/*,{
            id: 'pdfPercentChange',
            type: 'line',
            name: 'Percent Change',
            data: [],
            marker: {
                lineWidth: 1.2,
            },
        }*/],
        credits:{enabled:false},
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
        //TODO
        AnalysisModel.getPdf($scope.marketData.slice(0,350)).then(function(returnData){
        //AnalysisModel.getPdf($scope.marketData.slice(650,1000)).then(function(returnData){
            $scope.heatMapChart.series[0].data = [];
            $scope.heatMapChart.xAxis.categories = [];
            var pdfData = returnData.heatMap.slice(returnData.heatMap.length-100, returnData.heatMap.length);
            //TODO
            for(x in pdfData){$scope.heatMapChart.xAxis.categories.push(new Date($scope.marketData[x].createdAt));}
            //for(x in pdfData){$scope.heatMapChart.xAxis.categories.push(new Date($scope.marketData.reverse().slice(0,100).reverse()[x].createdAt));}
            var sortedKeys = Object.keys(pdfData[0]).sort(function(a,b){return a - b});
            sortedKeys = sortedKeys.sort(function(a,b){return a - b});
            sortedKeys = sortedKeys.map(function(obj){
                if(isNaN(parseFloat(obj))){return '1';}
                else{return obj}
            });
            sortedKeys = sortedKeys.filter(function(obj){
                if (obj < 0.25 && obj > -0.25){return obj}
            });
            for (x in sortedKeys){ 
                var dataArray = [];
                var key = sortedKeys[x];
                $scope.heatMapChart.yAxis.categories.push(key);
                var heatMapData = [];
                for (z in pdfData){
                    $scope.heatMapChart.series[0].data.push([parseFloat(z),parseFloat(x),parseFloat(pdfData[z][key])])
                }
            }
            //$scope.marketData.slice(900,1000).forEach(function(obj, index){ 
            //    $scope.heatMapChart.series[1].data.push(parseFloat(obj.percentChange*100));
            //});
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