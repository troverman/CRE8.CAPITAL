angular.module( 'investing.about', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'about', {
		url: '/about',
		views: {
			"main": {
				controller: 'AboutCtrl',
				templateUrl: 'about/index.tpl.html'
			}
		},
        resolve:{
            marketData: ['DataModel', function(DataModel) {
                return DataModel.getData(1000, 0, 'createdAt DESC','BTC', 'LTC', 21600000);
            }],
            predictionData: ['PredictionModel', function(PredictionModel) {
                return PredictionModel.getSome(1000, 0, 'createdAt DESC', {asset1:'BTC', asset2:'LTC', delta:'3600000'});
            }],
        }
	});
}])

.controller( 'AboutCtrl', ['$scope', 'AnalysisModel', 'marketData', 'OrderBookModel', 'predictionData', 'titleService', function AboutController( $scope, AnalysisModel, marketData, OrderBookModel, predictionData, titleService ) {
	titleService.setTitle('About | collaborative.capital');
    $scope.marketData = marketData;
    $scope.predictionData = predictionData;

    $scope.bidAskChart = {
        chart: {
            type: 'bar',
            zoomType: 'x',
        },
        title: {
            text: null
        },
        xAxis: {
            crosshair: true,
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
            data: []
        },{
            id:  'Asks',
            name: 'Asks',
            data: []
        }],
        credits:{enabled:false},
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
            text: 'Probability Density of Percent Change'
        },
        xAxis: {
            categories: [],
            title: null
        },
        yAxis: {
            categories: [],
            title: null
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
        tooltip: {
            formatter: function () {
                return this.point.value;
            }
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
            max: 10,
            startOnTick: false,
            endOnTick: false,
            labels: {
                format: '{value}%'
            }
        },
        series: [{
            boostThreshold: 100,
            name: 'Probability Density Function',
            borderWidth: 0,
            data: [],
            dataLabels: {
                enabled: false,
                //color: '#000000'
            }
        }],
        credits:{enabled:false},
    };

    //TODO: SAVE PDF
    /*AnalysisModel.getPdf($scope.marketData.slice(0,350)).then(function(returnData){
        
        var pdfData = returnData.heatMap.slice(returnData.heatMap.length-50, returnData.heatMap.length);
        for(x in pdfData){$scope.heatMapChart.xAxis.categories.push(x);}
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
                $scope.heatMapChart.series[0].data.push([parseFloat(z),parseFloat(x), pdfData[z][key]])
            }
        }

    });

    OrderBookModel.getSome(1, 0, 'createdAt DESC', 'BTC', 'LTC').then(function(orderBookModel){
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
    });*/

    //HIGHCHARTS
    $scope.chartConfig = {
        chart: {
            type: 'line',
            zoomType: 'x',
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        size: {
            width: 400,
            height: 550
        },
        title:{text: null},
        colors: ['#14b794'],
        series: [{
            id: 'Prediction Ask',
            name: 'Prediction Ask',
            color: '#ff7f0e',
            lineWidth: 1.2, 
            data:[],
            yAxis: 0
        },{
            id: 'Prediction Bid',
            name: 'Prediction Bid',
            color: '#2ab996',
            lineWidth: 1.2, 
            data:[],
            yAxis: 0
        },{
            id: 'Actual Ask',
            name: 'Actual Ask',
            color: '#a94442',
            lineWidth: 1.2, 
            data:[],
            yAxis: 0
        },{
            id: 'Actual Bid',
            name: 'Actual Bid',
            color: '#2ca02c',
            lineWidth: 1.2, 
            data:[],
            yAxis: 0
        },{
            type: 'column',
            id: 'Ask Error',
            name: 'Ask Error',
            color: '#a94442',
            lineWidth: 1.2, 
            data:[],
            yAxis: 1
        },{
            type: 'column',
            id: 'Bid Error',
            name: 'Bid Error',
            color: '#2ca02c',
            lineWidth: 1.2, 
            data:[],
            yAxis: 1
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
        },{
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey',
            //opposite: true,
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
    };


    $scope.predictionData.reverse().forEach(function(obj){ 

        //if (obj.actualAsk == 0){obj.actualAsk = null}
        //if (obj.actualBid == 0){obj.actualBid = null}

        //console.log(parseFloat(100*Math.abs((obj.actualBid - obj.predictedBid)/obj.actualBid)))
        //console.log(parseFloat(100*Math.abs((obj.predictedBid - obj.actualBid)/obj.predictedBid)))

        var predictionAskModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat(obj.predictedAsk)];
        var predictionBidModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat(obj.predictedBid)];
        var actualAskModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat(obj.actualAsk)];
        var actualBidModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat(obj.actualBid)];
        var errorBidModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat(100*Math.abs((obj.actualAsk - obj.predictedAsk)/obj.actualAsk))];
        var errorAskModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat(100*Math.abs((obj.actualBid - obj.predictedBid)/obj.actualBid))];

        //var priceChangeModel = 0;
        //if (){
        //    priceChangeModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), parseFloat((obj.actualBid - obj.predictedBid)/obj.actualBid)];
        //}

        $scope.chartConfig.series[0].data.push(predictionAskModel);
        $scope.chartConfig.series[1].data.push(predictionBidModel);
        $scope.chartConfig.series[2].data.push(actualAskModel);
        $scope.chartConfig.series[3].data.push(actualBidModel);
        $scope.chartConfig.series[4].data.push(errorAskModel);
        $scope.chartConfig.series[5].data.push(errorBidModel);

        //$scope.chartConfig.series[6].data.push(errorBidModel)

    });


}]);