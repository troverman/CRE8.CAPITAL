angular.module( 'investing.market', [
])

.config(['$stateProvider', function config( $stateProvider ) {
	$stateProvider.state( 'market', {
		url: '/market/:path',
		views: {
			"main": {
				controller: 'MarketCtrl',
				templateUrl: 'market/index.tpl.html'
			}
		},
        resolve:{
           

            asset: ['$stateParams', 'AssetModel', function($stateParams, AssetModel) {
                return AssetModel.getSome({limit:1,skip:0,sort:'createdAt DESC',string:$stateParams.path.toUpperCase()});
            }],

            //marbet -- by asset

            orders: ['$stateParams', 'OrderModel', function($stateParams, OrderModel) {
                return OrderModel.getSome(500, 0, 'createdAt DESC', $stateParams.path.toUpperCase(), null);
            }],

        }

	});
}])

.controller( 'MarketCtrl', ['$rootScope', '$sailsSocket', '$scope', '$stateParams',  'AnalysisModel', 'asset', 'config', 'DataModel', 'orders', 'titleService', function MarketsController( $rootScope, $sailsSocket, $scope, $stateParams, AnalysisModel, asset, config, DataModel, orders, titleService ) {

    $scope.asset = asset;

    $scope.market = $stateParams.path.toUpperCase();

    $scope.orders = orders;

    titleService.setTitle($scope.market + ' | CRE8.CAPITAL');

    $scope.selectedTab = 'INFORMATION';
    $scope.selectTab = function(model){$scope.selectedTab=model;}


    //DIRECTED GRAPH
    $scope.directedGraphLayout = {name: 'cose', coolingFactor: 0, animate: true};
    $scope.directedGraphOptions = {
        pixelRatio: 'auto',
        maxZoom:10,
        minZoom:0.1,
    };
    $scope.directedGraphStyle = [
        {
            "selector": "core",
            "style": {
                "selection-box-color": "#AAD8FF",
                "selection-box-border-color": "#8BB0D0",
                "selection-box-opacity": "0.5"
            }
        }, {
            "selector": "node",
            "style": {
                "width": "25",
                "height": "25",
                "content": "data(name)",
                "font-size": "12px",
                "text-valign": "center",
                "text-halign": "center",
                "background-color": "#77828C",
                "text-outline-color": "#77828C",
                "text-outline-width": "2px",
                "color": "#fff",
                "overlay-padding": "3px",
                "z-index": "10"
            }
        }, {
            "selector": "node[?attr]",
            "style": {
                "shape": "rectangle",
                "background-color": "#aaa",
                "text-outline-color": "#aaa",
                "width": "8px",
                "height": "8px",
                "font-size": "3px",
                "z-index": "1"
            }
        }, {
            "selector": "node[?query]",
            "style": {
                "background-clip": "none",
                "background-fit": "contain"
            }
        }, {
            "selector": "node:selected",
            "style": {
                "border-width": "3px",
                "border-color": "#AAD8FF",
                "border-opacity": "0.5",
                "background-color": "#77828C",
                "text-outline-color": "#77828C"
            }
        }, {
            "selector": "edge",
            "style": {
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "arrow-scale":"0.75",
                "source-arrow-shape": "none",
                "opacity": "0.9",
                "line-color": "#bbb",
                "width": "3",
                "overlay-padding": "3px",
                'label': 'data(label)'
            }
        },
        {
            "selector": ".edgeLabelStyle",
            "style": {
                "text-background-opacity": 1,
                "color": "#fff",
                "font-size": "12px",
                "text-background-color": "#77828C",
                "text-background-shape": "roundrectangle",
                "text-border-color": "#e8e8e8",
                "text-border-width": 1,
                "text-border-opacity": 1
            }
        },
        {
            "selector": ".blue",
            "style": {
                "line-color": "#0000ff",
            }
        },
        {
            "selector": ".red",
            "style": {
                "line-color": "#ff0000",
            }
        },
        {
            "selector": "node.unhighlighted",
            "style": {
                "opacity": "0.2"
            }
        }, {
            "selector": "edge.unhighlighted",
            "style": {
                "opacity": "0.05"
            }
        }, {
            "selector": ".highlighted",
            "style": {
                "z-index": "999999"
            }
        }, {
            "selector": "node.highlighted",
            "style": {
                "border-width": "3px",
                "border-color": "#AAD8FF",
                "border-opacity": "0.5",
                "background-color": "#394855",
                "text-outline-color": "#394855"
            }
        }, {
            "selector": "edge.filtered",
            "style": {
                "opacity": "0"
            }
        }
    ];

    $scope.directedGraphElements = {};

    $scope.chart = {
        chart: {
            zoomType: 'x',
            marginLeft: 70,
            marginTop: 20,
            height: 750
        },
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        },
        title:{text: null},
        colors: ['#14b794'],
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
        time: {timezoneOffset: 5 * 60},
        tooltip: {split: true},
    };

    //STORE AS VECTOR
    //MATRIX - VECTOR SET WITH 1 TRAVERSAL
    $scope.vector = {
        BTC:{
            BTC:1,
            LTC:0.1,
            XMR:0.4,
            XRP:0.003,
        }
    };

    $scope.matrix = {
        BTC:{
            BTC:1,
            LTC:1,
            XMR:1,
            XRP:1,
        },
        LTC:{
            BTC:1,
            LTC:1,
            XMR:1,
            XRP:1,
        },
        XMR:{
            BTC:1.7,
            LTC:0.5,
            XMR:1,
            XRP:0.09,
        },
        XRP:{
            BTC:1.7,
            LTC:0.5,
            XMR:0.09,
            XRP:1,
        }
    };

    $scope.orderBookMatrix = {
        BTC:{
            BTC: null,
            LTC: {bids:[],asks:[]},
            XMR: {bids:[],asks:[]},
            XRP: {bids:[],asks:[]},
        },
    };

    $scope.vector = {
        name:'BTC', 
        data:[
            {name:'BTC', data:1},
            {name:'LTC', data:0.1},
            {name:'XRP', data:0.4},
            {name:'XMR', data:0.003},
        ]
    };

    $scope.matrix = [{
        name:'BTC', 
        data:[
            {name:'BTC', data:1},
            {name:'LTC', data:0.1},
            {name:'XRP', data:0.003},
            {name:'XMR', data:0.4},
        ]
    },{
        name:'LTC', 
        data:[
            {name:'BTC', data:10},
            {name:'LTC', data:1},
            {name:'XRP', data:0.3},
            {name:'XMR', data:17},
        ]
    },{
        name:'XMR', 
        data:[
            {name:'BTC', data:1.7},
            {name:'LTC', data:0.5},
            {name:'XMR', data:1},
            {name:'XRP', data:0.09},
        ]
    },{
        name:'XRP', 
        data:[
            {name:'BTC', data:10002},
            {name:'LTC', data:203},
            {name:'XMR', data:540},
            {name:'XRP', data:1},
        ]
    }];

    $scope.orderBookMatrix = [{
        name: 'BTC',
        data:[
            {name:'LTC', bids:[], asks:[]},
            {name:'XMR', bids:[], asks:[]},
            {name:'XRP', bids:[], asks:[]},
        ],
    }];

    $scope.orderBook = [{
        name: 'BTC',
        data:[
            {name:'LTC', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
            {name:'XMR', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
            {name:'XRP', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
        ],
    }];


    $scope.vector1 = {
        BTC:{
            BTC:1,
        }
    };

    $scope.vector = {
        name:$scope.market, 
        data:[
            {name:$scope.market, data:1},
        ]
    };

    $scope.matrix = [];

    //FIX THIS MESS.
    $scope.selectData = function (asset1, asset2, delta){

        console.log(asset1,asset2,delta)

        $scope.selectedDelta = delta;
        var row = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset1);
        var row1 = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset2);

        DataModel.getData(100, 0, 'createdAt DESC', asset1, asset2, delta).then(function(model){

            if (model.length != 0){

                var column = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset2);
                var column1 = $scope.matrix.map(function(obj){return obj.name}).indexOf(asset1);

                $scope.matrix[row].data[column].data = parseFloat(model[0].price);
                $scope.matrix[row1].data[column1].data = parseFloat(model[0].price);


                if ($scope.market == asset1){
                    $scope.chart.series.push({
                        id: asset1+asset2,
                        name: asset1.toUpperCase() + ' | ' + asset2.toUpperCase(),
                        lineWidth: 1.2, 
                        color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                        type: 'area',
                        data: model.map(function(obj){
                            return [parseInt(new Date(obj.createdAt).getTime()), parseFloat(obj.percentChange)]
                        }),
                    });
                }
                if ($scope.market == asset2){
                    $scope.chart.series.push({
                        id: asset1+asset2,
                        name: asset1.toUpperCase() + ' | ' + asset2.toUpperCase(),
                        lineWidth: 1.2, 
                        color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
                        type: 'area',
                        data: model.map(function(obj){
                            return [parseInt(new Date(obj.createdAt).getTime()), parseFloat(obj.percentChange)]
                        }),
                    });
                }
            }

        });

    };

    //YEEEEEp
    $scope.selectTimeBad = function(delta){
        $scope.selectTime(delta, 'XMR');
        $scope.selectTime(delta, 'ETH');
        $scope.selectTime(delta, 'USDT');
        $scope.selectTime(delta, 'BTC');
    };

    $scope.selectTime = function(delta, asset){

        $rootScope.stateIsLoading = true;
        $scope.selectedPairs = $rootScope.tradingPairs.filter(function(obj){
            if (obj.split('/')[1]==asset){return obj;}
            else{if(asset == 'all'){return obj}}
        });
        
        //VERY BAD .. LOL 
        for (x in $scope.selectedPairs){
            $scope.selectData($scope.selectedPairs[x].split('/')[1], $scope.selectedPairs[x].split('/')[0], delta);
        }

    };

    //USING WHOLE MARKET..
    $scope.uniqueMarkets = $rootScope.tradingPairs.map(function(obj){return obj.split('/');});
    $scope.uniqueMarkets = [].concat.apply([], $scope.uniqueMarkets);
    $scope.uniqueMarkets = $scope.uniqueMarkets.filter(function(item, pos) {return $scope.uniqueMarkets.indexOf(item) == pos});
    $scope.uniqueMarkets.sort(function(a, b){
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    });

    //console.log( $scope.uniqueMarkets)
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("XMR"), 1); $scope.uniqueMarkets.unshift('XMR');
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("ETH"), 1); $scope.uniqueMarkets.unshift('ETH');
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("USDT"), 1); $scope.uniqueMarkets.unshift('USDT');
    $scope.uniqueMarkets.splice($scope.uniqueMarkets.indexOf("BTC"), 1); $scope.uniqueMarkets.unshift('BTC');

    $scope.uniqueMarkets.forEach(function(obj){
        $scope.matrix.push({name:obj.split('/')[0], data:[]});
        $scope.uniqueMarkets.forEach(function(obj1){
            var index = $scope.matrix.map(function(obj2){return obj2.name}).indexOf(obj.split('/')[0]);
            var data = '--';
            if (obj == obj1){data = 1}
            $scope.matrix[index].data.push({name:obj1.split('/')[0], data:data});
        });
    });

    //VALUE MATRIX...
    $scope.selectTime('60000', 'XMR');
    $scope.selectTime('60000', 'ETH');
    $scope.selectTime('60000', 'USDT');
    $scope.selectTime('60000', 'BTC');

    var index = $scope.matrix.map(function(obj){return obj.name}).indexOf($scope.market);
    $scope.vector = $scope.matrix[index];

    if ($scope.vector){
        for (x in $scope.vector.data){
            var nodeModel = {
                group:'nodes',
                data:{
                    id:$scope.vector.data[x].name,
                    name:$scope.vector.data[x].name
                }
            }; 
            console.log(nodeModel)
            $scope.directedGraphElements[$scope.vector.data[x].name] = nodeModel;
        }
    }

    for (x in Object.keys($scope.directedGraphElements)){
        var edgeModel = {
            group:'edges',
            data:{
                id: $scope.market+'-'+$scope.directedGraphElements[Object.keys($scope.directedGraphElements)[x]].data.id, 
                source: $scope.market, 
                target: $scope.vector.data[x].name, 
                label: $scope.vector.data[x].data,
            },
            classes: 'edgeLabelStyle',
        };
        $scope.directedGraphElements[$scope.market+'-'+$scope.directedGraphElements[Object.keys($scope.directedGraphElements)[x]].data.id] = edgeModel;
    }
    console.log( $scope.directedGraphElements );

}]);