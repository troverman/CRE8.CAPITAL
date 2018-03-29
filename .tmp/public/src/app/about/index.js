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
            type: 'column',
            zoomType: 'x',
        },
        title: {
            text: null
        },
        xAxis: {
            crosshair: true
        },
        yAxis: {
            min: 0,
            max: 100,
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

    /*$scope.heatMapChart = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1
        },
        title: {
            text: 'Probability Density Function of Percent Change for the BTC/LTC Market'
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
            maxColor: Highcharts.getOptions().colors[0]
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
                return this.series.xAxis.categories[this.point.x];
            }
        },
        series: [{
            name: 'Probability Density Function',
            borderWidth: 1,
            data: [],
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }],
        credits:{enabled:false},
    };*/

    //TODO: SAVE PDF
    /*AnalysisModel.getPdf($scope.marketData.slice(0,350)).then(function(returnData){
        var pdfData = returnData.heatMap.slice(returnData.heatMap.length-20, returnData.heatMap.length);
        for(x in pdfData){
            $scope.heatMapChart.xAxis.categories.push(x);
        }
        var sortedKeys = Object.keys(pdfData[0]).sort(function(a,b){return a - b});
        for (x in Object.keys(pdfData[0])){ 
            var dataArray = [];
            var key = Object.keys(pdfData[0])[x];
            if (key < 0.20 && key > -0.20){
                $scope.heatMapChart.yAxis.categories.push(key);
                //console.log(key)
                var heatMapData = [];
                for (z in pdfData){
                    //console.log(pdfData[z][key])
                    $scope.heatMapChart.series[0].data.push([parseFloat(z),parseFloat(x),pdfData[z][key]])
                }
            }
        }
        console.log($scope.heatMapChart.series[0].data);
    });*/

    OrderBookModel.getSome(1, 0, 'createdAt DESC', 'BTC', 'LTC').then(function(orderBookModel){
        $scope.orderBook = orderBookModel[0];
        //var askSum = 0;
        //var bidSum = 0;
        for (x in orderBookModel[0].bids.reverse()){
            //bidSum+=parseFloat(orderBookModel[0].bids[x][1]);
            $scope.bidAskChart.series[0].data.push([parseFloat(orderBookModel[0].bids[x][0]),parseFloat(orderBookModel[0].bids[x][1])]);
        }
        for (x in orderBookModel[0].asks){
            //askSum+=parseFloat(orderBookModel[0].asks[x][1]);
            $scope.bidAskChart.series[1].data.push([parseFloat(orderBookModel[0].asks[x][0]),parseFloat(orderBookModel[0].bids[x][1])]);
            console.log('asks',[parseFloat(orderBookModel[0].asks[x][0]),parseFloat(orderBookModel[0].asks[x][1])])
        }
    });

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