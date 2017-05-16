angular.module( 'investing.home', [
])

.config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state( 'home', {
        url: '/',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/index.tpl.html'
            }
        },
        resolve:{
            currencyData: ['DataModel', function(DataModel) {
                return DataModel.getCurrency();
            }],
            predictionData: ['PredictionModel', function(PredictionModel) {
                return PredictionModel.getSome(100, 0, 'createdAt DESC', {asset1:'USD', asset2:'BTC'});
            }],
        }
    });
}])

.controller( 'HomeCtrl', ['$sailsSocket', '$scope', 'titleService', 'config', 'currencyData', 'predictionData', function HomeController( $sailsSocket, $scope, titleService, config, currencyData, predictionData ) {
    titleService.setTitle('investingfor');
    $scope.currentUser = config.currentUser;
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
    $scope.updateData = function (){
        $scope.predictionData.reverse().forEach(function(obj){ 
            if (obj.actualAsk == 0){obj.actualAsk = null}
            if (obj.actualBid == 0){obj.actualBid = null}
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

        $scope.data = [$scope.predictionAskData, $scope.actualAskData, $scope.predictionBidData, $scope.actualBidData];
        console.log($scope.data);
    }
    $scope.updateData();
    
    /*
    var color = d3.scale.category20()
    $scope.directedOptions = {
        chart: {
            type: 'forceDirectedGraph',
            height:  (function(){ return nv.utils.windowSize().height })(),
            width: (function(){ return nv.utils.windowSize().width })(),
            margin:{top: 20, right: 20, bottom: 20, left: 20},
            color: function(d){
                return color(d.group)
            },
            nodeExtras: function(node) {
                node && node
                  .append("text")
                  .attr("dx", 8)
                  .attr("dy", ".35em")
                  .text(function(d) { return d.name })
                  .style('font-size', '10px');
            },
            linkExtras: function(link) {
                link && link
                  .append("text")
                  .attr("dx", 8)
                  .attr("dy", ".35em")
                  .text(function(d) { return d.value })
                  .style('font-size', '10px');
            }
        }
    };

    $scope.directedData = currencyData;
    */

    $sailsSocket.subscribe('prediction', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.predictionData.unshift(envelope.data);
                $scope.updateData();
                //$scope.calculateSum();
            case 'updated':
                $scope.updateData();
                //$scope.predictionData
        }
    });

}]);
