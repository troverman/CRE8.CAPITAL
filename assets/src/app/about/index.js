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
            predictionData: ['PredictionModel', function(PredictionModel) {
                return PredictionModel.getSome(1000, 0, 'createdAt DESC', {asset1:'BTC', asset2:'LTC', delta:'300000'});
            }],
        }
	});
}])

.controller( 'AboutCtrl', ['$scope', 'predictionData', 'titleService', function AboutController( $scope, predictionData, titleService ) {
	titleService.setTitle('About | collaborative.capital');

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.chartData = [300, 500, 100, 40, 120];

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

    $scope.chartConfig = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1
        },
        title: {
            text: 'Sales per employee per weekday'
        },
        xAxis: {
            categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
        },
        yAxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            title: null
        },
        colorAxis: {
            min: 0,
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
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
        series: [{
            name: 'Sales per employee',
            borderWidth: 1,
            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]
    };


}]);