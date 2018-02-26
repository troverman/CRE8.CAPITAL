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
                return PredictionModel.getSome(1000, 0, 'createdAt DESC', {asset1:'BTC', asset2:'LTC', delta:'300000'});
            }],
        }
	});
}])

.controller( 'AboutCtrl', ['$scope', 'AnalysisModel', 'marketData', 'OrderBookModel', 'predictionData', 'titleService', function AboutController( $scope, AnalysisModel, marketData, OrderBookModel, predictionData, titleService ) {
	titleService.setTitle('About | collaborative.capital');
    $scope.marketData = marketData;

    $scope.heatMapChart={};
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


    /*$scope.heatMapChart = {
        chart: {
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Bids',
            data: []
        },{
            name: 'Asks',
            data: []
        }]
    };
    OrderBookModel.getSome(1, 0, 'createdAt DESC', 'BTC', 'LTC').then(function(orderBookModel){
        console.log(orderBookModel);
        $scope.orderBook = orderBookModel[0];
        for (x in orderBookModel[0].bids){
            $scope.heatMapChart.series[0].data.push(parseFloat(orderBookModel[0].bids[x][0]));
        }
        for (x in orderBookModel[0].asks){
            $scope.heatMapChart.series[0].data.push(parseFloat(orderBookModel[0].asks[x][0]));
        }
    
    });*/

    $scope.predictionData = predictionData;

    $scope.options = {
        chart: {
            type: 'lineWithFocusChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 65
            },
            x: function(d){ 
                return d[0]; 
            },
            y: function(d){ 
                return d[1]; 
            },

            color: d3.scale.category10().range(),
            duration: 200,
            useInteractiveGuideline: true,
            clipVoronoi: true,
            xAxis: {
                tickFormat: function(d) {
                    return d3.time.format('%m/%d/%y %H:%M.%S')(new Date(d))
                },
                staggerLabels: true,
                showMaxMin : false
            },
            yAxis: {
                axisLabelDistance: 50,
                showMaxMin : false
            },
            x2Axis: {
                tickValues:0,
                showMaxMin: false
            },
            y2Axis: {
                tickValues:0,
                axisLabelDistance: 200,
            },
        }
    };

    $scope.predictionAskData = {};
    $scope.predictionAskData.key = 'Prediction Ask';
    $scope.predictionAskData.color = '#ff7f0e';
    $scope.predictionAskData.values = [];

    $scope.predictionBidData = {};
    $scope.predictionBidData.key = 'Prediction Bid';
    $scope.predictionBidData.color = '#2ab996';
    $scope.predictionBidData.values = [];

    $scope.actualAskData = {};
    $scope.actualAskData.key = 'Actual Ask';
    $scope.actualAskData.color = '#a94442';
    $scope.actualAskData.values = [];

    $scope.actualBidData = {};
    $scope.actualBidData.key = 'Actual Bid';
    $scope.actualBidData.color = '#2ca02c';
    $scope.actualBidData.values = [];

    $scope.predictionData.reverse().forEach(function(obj){ 
        if (obj.actualAsk == 0){obj.actualAsk = null}
        if (obj.actualBid == 0){obj.actualBid = null}
        var predictionAskModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), obj.predictedAsk];
        var predictionBidModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), obj.predictedBid];
        var actualAskModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), obj.actualAsk];
        var actualBidModel = [ parseInt(new Date(obj.timeStamp).getTime() + parseInt(obj.delta)), obj.actualBid];

        $scope.predictionAskData.values.push(predictionAskModel);
        $scope.predictionBidData.values.push(predictionBidModel);
        $scope.actualAskData.values.push(actualAskModel);
        $scope.actualBidData.values.push(actualBidModel);
    });

    $scope.data = [$scope.predictionAskData, $scope.predictionBidData, $scope.actualAskData, $scope.actualBidData]
    console.log($scope.data);


}]);