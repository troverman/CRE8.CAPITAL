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
            //TODO: SOCKET CONNECT TO CCUTL
            marketData: ['DataModel', function(DataModel) {
                return DataModel.getData(100, 0, 'createdAt DESC', 'BTC', 'LTC', 30000);
            }],
            orders: ['OrderModel', function(OrderModel) {
                return OrderModel.getSome(25, 0, 'createdAt DESC');
            }],
        }
    });
}])

.controller( 'HomeCtrl', [ '$mdSidenav', '$sailsSocket', '$scope', 'titleService', 'config', 'DataModel', 'marketData', 'orders', 'PortfolioModel', function HomeController( $mdSidenav, $sailsSocket, $scope, titleService, config, DataModel, marketData, orders, PortfolioModel) {
    titleService.setTitle('CRE8.CAPITAL');
    $scope.currentUser = config.currentUser;
    $scope.marketData = marketData;
    $scope.selectedPair = ['BTC','LTC'];
    $scope.selectedDelta = '30000';
    $scope.orders = orders;
    $scope.portfolioData = [];
    $scope.portfolioLabels = [];
    $scope.btcValue = 0;
    $scope.btcOrderValue = 0;

    //EXAMPLE
    //DataModel.getExchangeMap().then(function(data){
    //    console.log(data);
    //    for (x in data){
    //        data[x].asset1, data[x].asset2, data[x].price
    //    }
    //});
    //-->extend over time, combine with protfolioequality and probabilities

    $scope.sideNavToggle = function(){
        $mdSidenav('left').toggle();
    }

    //TODO: normalize to btc price
    //TODO: update to ticker.. 
    //aka total 
    //IF LOGGED IN
    $scope.assets = [];
    if($scope.currentUser){

        DataModel.getLatestData().then(function(data){

            PortfolioModel.getAssets($scope.currentUser.id).then(function(assets){
                $scope.assets = assets;
                for (x in assets){
                    if(assets[x].symbol!='USDT'){
                        console.log(data)
                        if (assets[x].symbol!='BTC' && assets[x].amount != 0){
                            var index = data.map(function(obj){return obj[0].asset2}).indexOf(assets[x].symbol);
                            console.log(index, assets[x].symbol)
                            var btcValue = assets[x].amount*data[index][0].price;
                            $scope.btcValue += btcValue;
                            //console.log($scope.btcValue, assets[x].symbol);
                        }
                        else{
                            $scope.btcValue += assets[x].amount;
                            //console.log($scope.btcValue, assets[x].symbol, assets[x].amount);
                        }
                    }
                }

                //TODO: IMPROVE
                for (x in assets){
                    if(assets[x].symbol!='USDT'){
                        if (assets[x].symbol!='BTC' && assets[x].amount != 0){
                            var index = data.map(function(obj){return obj[0].asset2}).indexOf(assets[x].symbol);
                            var btcValue = assets[x].amount*data[index][0].price;
                            $scope.portfolioData.push(btcValue/$scope.btcValue);
                            $scope.portfolioLabels.push(assets[x].symbol);
                        }
                        else{
                            $scope.portfolioData.push(assets[x].amount/$scope.btcValue);
                            $scope.portfolioLabels.push(assets[x].symbol);
                        }
                    }
                }  

                for (x in assets){
                    if(assets[x].symbol!='USDT'){
                        if (assets[x].symbol!='BTC'){
                            var index = data.map(function(obj){return obj[0].asset2}).indexOf(assets[x].symbol);
                            //console.log(assets[x].amountOnOrders, assets[x].amount, data[index][0].price, index, assets[x].symbol);
                            //TODO: IMPROVE
                            if (assets[x].amountOnOrders){
                                var btcOrderValue = assets[x].amountOnOrders*data[index][0].price;
                                $scope.btcOrderValue += btcOrderValue;
                            }
                           
                        }
                        else{
                            $scope.btcOrderValue += assets[x].amountOnOrders;
                        }
                    }
                }
            });

        });

        //OrderModel.getSome(25, 0, 'createdAt DESC', user:$scope.currentUser.id).then(function(data){
        //    $scope.orders = data
        //});

    }

    //HIGHCHARTS
    $scope.chartConfig = {
        chart: {
            type: 'line',
            zoomType: 'x',
            backgroundColor: {
               linearGradient: [0, 0, 500, 500],
               stops: [
                 [0, 'rgb(0, 0, 0)'],
               ]
             },
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
        legend: {enabled: false},
        colors: ['#14b794'],
        series: [{
            name: 'BTC/LTC', 
            lineWidth: 1.2, 
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
        yAxis: {
            title: null,
            gridLineWidth: 0.5,
            gridLineColor: 'grey'
        },
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

    $scope.seletetData = function (asset1, asset2, delta){
        $scope.selectedPair = [asset1, asset2];
        $scope.selectedDelta = delta;
        DataModel.getData(100, 0, 'createdAt DESC', asset1,  asset2, delta).then(function(model){
            $scope.marketData = model;
            var data = {
                id: asset1+'/'+asset2,
                name: asset1+'/'+asset2, 
                lineWidth: 1.2, 
                data: model.map(function(obj){return [new Date(obj.createdAt).getTime(), obj.percentChange]}).reverse()
            };
            $scope.chartConfig.series.push(data);
            console.log($scope.chartConfig.series)
        })
    };

    for (x in $scope.tradingPairs.splice(0,10)){
        $scope.seletetData($scope.tradingPairs[x].split('/')[1], $scope.tradingPairs[x].split('/')[0], 30000);
    }

    $sailsSocket.subscribe('order', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                $scope.orders.push(envelope.data);
        }
    });
    
    $sailsSocket.subscribe('data', function (envelope) {
        switch(envelope.verb) {
            case 'created':
                //console.log(envelope.data);
                if (envelope.data.assetPair==$scope.selectedPair[0]+'_'+$scope.selectedPair[1] && envelope.data.delta == $scope.selectedDelta){
                    console.log(envelope.data);
                    $scope.marketData.push(envelope.data);
                }
                if ($scope.marketData.length >= 300){
                    $scope.marketData.shift();
                    //$scope.marketGraphData.values.shift()
                }
        }
    });

    //sails.sockets.join(req, 'ticker', function(err) {
        //res.json({});
    //});

    /*
    $sailsSocket.subscribe('ticker', function (envelope) {
        //console.log(envelope);
        $scope.pendingTransactions = envelope;
        $scope.pendingTransactionsList.push(envelope);
        if ($scope.pendingTransactionsList.length >= 100){
            $scope.pendingTransactionsList.shift();
        }
    });
    */

}]);
