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
            predictionDataFiveMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                return PredictionModel.getSome(100, 0, 'createdAt DESC', {asset1:$stateParams.path1, asset2:$stateParams.path2, predictionTime:'300000'});
            }],
            predictionDataThirtyMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                return PredictionModel.getSome(100, 0, 'createdAt DESC', {asset1:$stateParams.path1, asset2:$stateParams.path2, predictionTime:'1800000'});
            }],
            currentPredictionFiveMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                return PredictionModel.getCurrentPrediction($stateParams.path1, $stateParams.path2, 300000);
            }],
            currentPredictionThirtyMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                //return PredictionModel.getCurrentPrediction($stateParams.path1, $stateParams.path2, 1800000);
                return null;
            }]
        }
	});
}])

.controller( 'MarketCtrl', ['$scope', '$stateParams', 'config', 'currentPredictionFiveMin', 'currentPredictionThirtyMin', 'predictionDataFiveMin', 'predictionDataThirtyMin', 'PredictionModel', 'titleService', function MarketController( $scope, $stateParams, config, currentPredictionFiveMin, currentPredictionThirtyMin, predictionDataFiveMin, predictionDataThirtyMin, PredictionModel, titleService ) {
	titleService.setTitle('Market - investingfor');
	$scope.predictionDataFiveMin = predictionDataFiveMin;
    $scope.predictionDataThirtyMin = predictionDataThirtyMin;
    $scope.stateParams = $stateParams;

    $scope.currentPredictionFiveMin = currentPredictionFiveMin;
    $scope.currentPredictionThirtyMin = currentPredictionThirtyMin;

    $scope.currentData = null
    //console.log(currentPredictionFiveMin)
    PredictionModel.getCurrentPrediction($stateParams.path1, $stateParams.path2, 300000).then(function(model){
        console.log(model);
        $scope.currentData = model.currentData;
        $scope.currentPredictionFiveMin = model.output;
    })

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
                //axisLabel: 'USD/BTC',
                axisLabelDistance: 50
            }
        }
    };

    $scope.predictionFiveMinAskData = {};
    $scope.predictionFiveMinAskData.key = 'Prediction Ask';
    $scope.predictionFiveMinAskData.color = '#ff7f0e';
    $scope.predictionFiveMinAskData.values = [];

    $scope.predictionFiveMinBidData = {};
    $scope.predictionFiveMinBidData.key = 'Prediction Bid';
    $scope.predictionFiveMinBidData.color = '#2ab996';
    $scope.predictionFiveMinBidData.values = [];

    $scope.actualFiveMinAskData = {};
    $scope.actualFiveMinAskData.key = 'Actual Ask';
    $scope.actualFiveMinAskData.color = '#a94442';
    $scope.actualFiveMinAskData.values = [];

    $scope.actualFiveMinBidData = {};
    $scope.actualFiveMinBidData.key = 'Actual Bid';
    $scope.actualFiveMinBidData.color = '#2ca02c';
    $scope.actualFiveMinBidData.values = [];

    $scope.predictionDataFiveMin.reverse().forEach(function(obj){ 
        if (obj.actualAsk == 0){obj.actualAsk = null}
        if (obj.actualBid == 0){obj.actualBid = null}
        if (obj.predictionAsk == NaN){obj.predictionAsk = null}
        if (obj.predictionBid == NaN){obj.predictionBid = null}
        var predictionFiveMinAskModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.predictedAsk];
        var predictionFiveMinBidModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.predictedBid];
        var actualFiveMinAskModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.actualAsk];
        var actualFiveMinBidModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.actualBid];

        $scope.predictionFiveMinAskData.values.push(predictionFiveMinAskModel);
        $scope.predictionFiveMinBidData.values.push(predictionFiveMinBidModel);
        $scope.actualFiveMinAskData.values.push(actualFiveMinAskModel);
        $scope.actualFiveMinBidData.values.push(actualFiveMinBidModel);
    });

    $scope.fiveMinData = [$scope.predictionFiveMinAskData, $scope.predictionFiveMinBidData, $scope.actualFiveMinAskData, $scope.actualFiveMinBidData]

    $scope.predictionThirtyMinAskData = {};
    $scope.predictionThirtyMinAskData.key = 'Prediction Ask';
    $scope.predictionThirtyMinAskData.color = '#ff7f0e';
    $scope.predictionThirtyMinAskData.values = [];

    $scope.predictionThirtyMinBidData = {};
    $scope.predictionThirtyMinBidData.key = 'Prediction Bid';
    $scope.predictionThirtyMinBidData.color = '#2ab996';
    $scope.predictionThirtyMinBidData.values = [];

    $scope.actualThirtyMinAskData = {};
    $scope.actualThirtyMinAskData.key = 'Actual Ask';
    $scope.actualThirtyMinAskData.color = '#a94442';
    $scope.actualThirtyMinAskData.values = [];

    $scope.actualThirtyMinBidData = {};
    $scope.actualThirtyMinBidData.key = 'Actual Bid';
    $scope.actualThirtyMinBidData.color = '#2ca02c';
    $scope.actualThirtyMinBidData.values = [];

    $scope.predictionDataThirtyMin.reverse().forEach(function(obj){ 
        if (obj.actualAsk == 0){obj.actualAsk = null}
        if (obj.actualBid == 0){obj.actualBid = null}
        if (obj.predictionAsk == NaN){obj.predictionAsk = null}
        if (obj.predictionBid == NaN){obj.predictionBid = null}
        var predictionThirtyMinAskModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.predictedAsk];
        var predictionThirtyMinBidModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.predictedBid];
        var actualThirtyMinAskModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.actualAsk];
        var actualThirtyMinBidModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.actualBid];

        $scope.predictionThirtyMinAskData.values.push(predictionThirtyMinAskModel);
        $scope.predictionThirtyMinBidData.values.push(predictionThirtyMinBidModel);
        $scope.actualThirtyMinAskData.values.push(actualThirtyMinAskModel);
        $scope.actualThirtyMinBidData.values.push(actualThirtyMinBidModel);
    });

    $scope.thirtyMinData = [$scope.predictionThirtyMinAskData, $scope.predictionThirtyMinBidData, $scope.actualThirtyMinAskData, $scope.actualThirtyMinBidData]





}]);