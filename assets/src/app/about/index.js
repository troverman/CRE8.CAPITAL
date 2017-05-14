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
                return PredictionModel.getSome(100, 0, 'createdAt DESC', null);
            }],
        }
	});
}])

.controller( 'AboutCtrl', ['$scope', 'predictionData', 'titleService', function AboutController( $scope, predictionData, titleService ) {
	titleService.setTitle('About - investingfor');

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
                axisLabel: 'USD/BTC',
                axisLabelDistance: 50
            }
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
        if (obj.actualAsk == 0){obj.actualAsk = 1000}
        if (obj.actualBid == 0){obj.actualBid = 1000}
        if (obj.predictionTime == '60000'){
            var predictionAskModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.predictedAsk];
            var predictionBidModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.predictedBid];
            var actualAskModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.actualAsk];
            var actualBidModel = [ parseInt(new Date(obj.createdAt).getTime() + parseInt(obj.predictionTime)), obj.actualBid];

            $scope.predictionAskData.values.push(predictionAskModel);
            $scope.predictionBidData.values.push(predictionBidModel);
            $scope.actualAskData.values.push(actualAskModel);
            $scope.actualBidData.values.push(actualBidModel);
        }
    });

    $scope.data = [$scope.predictionAskData, $scope.predictionBidData, $scope.actualAskData, $scope.actualBidData]
    console.log($scope.data);


}]);