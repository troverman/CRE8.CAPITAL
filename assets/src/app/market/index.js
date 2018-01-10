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
                //return PredictionModel.getSome(100, 0, 'createdAt DESC', {asset1:$stateParams.path1, asset2:$stateParams.path2, predictionTime:'300000'});
                return null;
            }],
            predictionDataThirtyMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                //return PredictionModel.getSome(100, 0, 'createdAt DESC', {asset1:$stateParams.path1, asset2:$stateParams.path2, predictionTime:'1800000'});
                return null;
            }],
            currentPredictionFiveMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                //return PredictionModel.getCurrentPrediction($stateParams.path1, $stateParams.path2, 300000);
                return null;
            }],
            currentPredictionThirtyMin: ['$stateParams', 'PredictionModel', function($stateParams, PredictionModel) {
                //return PredictionModel.getCurrentPrediction($stateParams.path1, $stateParams.path2, 1800000);
                return null;
            }],
            marketData: ['$stateParams', 'DataModel', function($stateParams, DataModel) {
                return DataModel.getData(1000, 0, 'createdAt DESC', $stateParams.path1, $stateParams.path2, 300000);
            }]
        }
	});
}])

.controller( 'MarketCtrl', ['$rootScope', '$sailsSocket', '$scope', '$stateParams', 'config', 'currentPredictionFiveMin', 'currentPredictionThirtyMin', 'DataModel', 'marketData', 'predictionDataFiveMin', 'predictionDataThirtyMin', 'PredictionModel', 'titleService', function MarketController( $rootScope, $sailsSocket, $scope, $stateParams, config, currentPredictionFiveMin, currentPredictionThirtyMin, DataModel, marketData, predictionDataFiveMin, predictionDataThirtyMin, PredictionModel, titleService ) {
	titleService.setTitle('Market - investingfor');

	$scope.predictionDataFiveMin = predictionDataFiveMin;
    $scope.predictionDataThirtyMin = predictionDataThirtyMin;
    $scope.currentPredictionFiveMin = currentPredictionFiveMin;
    $scope.currentPredictionThirtyMin = currentPredictionThirtyMin;

    //TODO:work on indicator api
    $scope.marketData = marketData//.data;
    console.log(marketData)

    $scope.stateParams = $stateParams;
    $scope.selectedPair = [$stateParams.path1,$stateParams.path2];
    $scope.selectedDelta = '5000';

    $scope.seletetData = function (asset1, asset2, delta){
        $rootScope.stateIsLoading = true;
        $scope.selectedPair = [asset1, asset2];
        $scope.selectedDelta = delta;
        DataModel.getData(1000, 0, 'createdAt DESC', asset1,  asset2, delta).then(function(model){
            $scope.marketGraphData.values = [];
            $scope.marketGraphChangeData.values = [];
            $scope.marketGraphChangeChangeData.values = [];
            $scope.marketGraphEmaData.values = [];

            //TODO:work on indicator api
            $scope.marketGraphBandUpperData.values = [];
            $scope.marketGraphBandMiddleData.values = [];
            $scope.marketGraphBandLowerData.values = [];

            $scope.marketData = model;
            $scope.updateMarketData();
            $rootScope.stateIsLoading = false;
        })
    };

    $scope.marketOptions = {
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
                axisLabel: $scope.selectedPair[0]+'_'+$scope.selectedPair[1],
                axisLabelDistance: 50
            }
        }
    };

    $scope.marketGraphData = {};
    $scope.marketGraphData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1];
    $scope.marketGraphData.color = '#14b794';
    $scope.marketGraphData.values = [];

    $scope.marketGraphEmaData = {};
    $scope.marketGraphEmaData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] + ' ema';
    $scope.marketGraphEmaData.color = 'black';
    $scope.marketGraphEmaData.values = [];

    $scope.marketGraphBandUpperData = {};
    $scope.marketGraphBandUpperData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] + ' upper band';
    $scope.marketGraphBandUpperData.color = 'orange';
    $scope.marketGraphBandUpperData.values = [];

    $scope.marketGraphBandMiddleData = {};
    $scope.marketGraphBandMiddleData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] + ' middle band';
    $scope.marketGraphBandMiddleData.color = 'black';
    $scope.marketGraphBandMiddleData.values = [];

    $scope.marketGraphBandLowerData = {};
    $scope.marketGraphBandLowerData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] + ' lower band';
    $scope.marketGraphBandLowerData.color = 'gray';
    $scope.marketGraphBandLowerData.values = [];



    $scope.marketGraphChangeData = {};
    $scope.marketGraphChangeData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] +' Change';
    $scope.marketGraphChangeData.color = '#a94442';
    $scope.marketGraphChangeData.values = [];

    $scope.marketGraphChangeChangeData = {};
    $scope.marketGraphChangeChangeData.key = $scope.selectedPair[0]+'_'+$scope.selectedPair[1] +' Change Change';
    $scope.marketGraphChangeChangeData.color = '#f94442';
    $scope.marketGraphChangeChangeData.values = [];


    $scope.updateMarketData = function (){
        $scope.marketData.reverse().forEach(function(obj, index){ 
            $scope.marketGraphData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.price]);

            //$scope.marketGraphEmaData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.ema]);
            $scope.marketGraphBandUpperData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.upper]);
            $scope.marketGraphBandMiddleData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.middle]);
            $scope.marketGraphBandLowerData.values.push([parseInt(new Date(obj.createdAt).getTime()), obj.lower]);

            var change = 0;
            var changeChange = 0
            if (index > 1){
                change = obj.price - $scope.marketData[index-1].price;
                change = change/obj.price;
            }

            $scope.marketGraphChangeData.values.push([parseInt(new Date(obj.createdAt).getTime()), change]);

            if ($scope.marketGraphChangeData.values.length > 1){
                changeChange = $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-1][1] - $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-2][1];
                //changeChange = changeChange / $scope.marketGraphChangeData.values[$scope.marketGraphChangeData.values.length-1][1]
            }

            $scope.marketGraphChangeChangeData.values.push([parseInt(new Date(obj.createdAt).getTime()), changeChange]);

        });

        $scope.marketGraphDataRender = [$scope.marketGraphData]//, $scope.marketGraphBandUpperData, $scope.marketGraphBandMiddleData, $scope.marketGraphBandLowerData];
        $scope.marketGraphChangeDataRender = [$scope.marketGraphChangeData, $scope.marketGraphBandUpperData, $scope.marketGraphBandMiddleData, $scope.marketGraphBandLowerData];

        //$scope.marketGraphChangeDataRender = [$scope.marketGraphChangeData]//, $scope.marketGraphEmaData];
        $scope.marketGraphChangeChangeDataRender = [$scope.marketGraphChangeChangeData];
    };

    $scope.updateMarketData();

    $sailsSocket.subscribe('data', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                //console.log(envelope.data);
                if (envelope.data.assetPair==$scope.selectedPair[0]+'_'+$scope.selectedPair[1] && envelope.data.delta == $scope.selectedDelta){
                    
                    $scope.marketData.push(envelope.data);
                    var change = $scope.marketData[$scope.marketData.length-1].price - $scope.marketData[$scope.marketData.length-2].price;
                    change = change/$scope.marketData[$scope.marketData.length-1].price
                    $scope.marketGraphData.values.push([parseInt(new Date(envelope.data.createdAt).getTime()), envelope.data.price]);
                    $scope.marketGraphChangeData.values.push([parseInt(new Date($scope.marketData[$scope.marketData.length-1].createdAt).getTime()), change]);

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
                }
        }
    });


}]);