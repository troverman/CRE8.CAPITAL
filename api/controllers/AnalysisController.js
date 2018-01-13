var Q = require('q');
var tulind = require('tulind');
var regression = require('regression');

var tradingPairs = [
    'XRP/BTC',
    'ETH/BTC',
    'BTC/USDT',
    'LTC/BTC',
    'BCH/BTC',
    'XRP/USDT',
    'ETH/USDT',
    'BCH/USDT',
    'XMR/BTC',
    'ZEC/BTC',
    'LTC/USDT',
    'DASH/BTC',
    'ETC/BTC',
    'XEM/BTC',
    'ZEC/USDT',
    'FCT/BTC',
    'ETC/USDT',
    'BTS/BTC',
    'LSK/BTC',
    'DGB/BTC',  
    'EMC2/BTC',
    'NXT/BTC',
    'SC/BTC',
    'POT/BTC',  
    'STRAT/BTC',
    'NXT/USDT',
    'DOGE/BTC',
    'DASH/USDT',
    'XMR/USDT',
    'BCH/ETH',
    'ZRX/BTC',  
    'ARDR/BTC',
    'VTC/BTC',
    'BTM/BTC',  
    'OMG/BTC',
    'MAID/BTC',
    'VRC/BTC',  
    'GNT/BTC',  
    'GAME/BTC',
    'CVC/BTC',  
    'REP/BTC',
    'STEEM/BTC',
    'SYS/BTC',
    'BCN/BTC',
    'LBC/BTC',
    'DCR/BTC',
    'ZEC/ETH',
    'REP/USDT',
    'ETC/ETH',
    'LTC/XMR',
    'ZRX/ETH',
    'RIC/BTC',
    'GNO/BTC',
    'PPC/BTC',
    'GAS/BTC',
    'BURST/BTC',
    'PASC/BTC', 
    'VIA/BTC',
    'FLO/BTC',
    'FLDC/BTC',
    'NEOS/BTC', 
    'OMG/ETH',
    'STORJ/BTC',
    'GNT/ETH',
    'CLAM/BTC', 
    'NAV/BTC',
    'XCP/BTC',
    'LSK/ETH',
    'XBC/BTC',
    'AMP/BTC',
    'OMNI/BTC', 
    'EXP/BTC',
    'GRC/BTC',
    'BLK/BTC',  
    'SBD/BTC',
    'PINK/BTC',
    'NMC/BTC',
    'RADS/BTC', 
    'GNO/ETH',
    'NXC/BTC',
    'XVC/BTC',
    'CVC/ETH',
    'BELA/BTC',
    'NXT/XMR',
    'ZEC/XMR',
    'XPM/BTC',
    'BTCD/BTC', 
    'REP/ETH',
    'BCY/BTC',
    'MAID/XMR', 
    'DASH/XMR', 
    'HUC/BTC',
    'STEEM/ETH',
    'BCN/XMR',
    'BTCD/XMR', 
    'BLK/XMR'
];


function hasUndefined(a) {
    return a.indexOf() !== -1;
};

function clone(a) {
   return JSON.parse(JSON.stringify(a));
};

function getData(limit, delta, tradingPair){
    var defered = Q.defer();
    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]})
	.limit(limit)
	.sort('createdAt DESC')
	.then(function(models){
		console.log(tradingPair);
		defered.resolve(models.reverse());
	});
    return defered.promise;
};

function liveTrade(delta, asset1, asset2){

	//getPredicted
	//getLastestData..granularity.
	Data.find({delta:delta})
	.limit(1)
	.then(function(model){
		//model[0];
		//sync with granularity? 
		//yes
		//var now = new Date();
		//var createdAt = new Data(model[0].createAt);
		//var syncDelay = parseInt(delta) - (now-createdAt)
		//get lastest data
		//get prediction w data
		//wait delta - place trade
	});

};


module.exports = {

	ema: function(req, res) {
		
		var data = JSON.parse(req.query.data);
		var period = req.query.period;
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange})

		//TODO --> var results = dataService.. dataService(data, period); res.json(results)
		//tulind.indicators.ema.indicator([data], [period], function(err, results) {
		tulind.indicators.ema.indicator([price], [period], function(err, results) {

			var returnData = [];
			for (x in results[0]){
				returnData.push([parseInt(new Date(data[x].createdAt).getTime()), results[0][x]])
			}

			var dataArray = []
			for (x in results[0]){
				dataArray.push([x, results[0][x]]);
	    	}

			var result = regression.polynomial(dataArray, { order: 14, precision: 100 });
			console.log(result.r2, result.predict(1000), period, result.string);

			res.json(returnData);
			//res.json(results[0]);
		});

	},

	bband: function(req, res) {

		var data = req.query.data;
		var period = req.query.period;
		var std = req.query.std;

		//for x in 100

		//TODO --> var results = dataService.. dataService(data, period); res.json(results)
		//tulind.indicators.bbands.indicator([change], [10,2], function(err, results) {
			//dataObject.data = dataModel;
			//for (x in results[0]){
			//	dataModel[x].lower = results[0][x];
			//	dataModel[x].middle = results[1][x];
			//	dataModel[x].upper = results[2][x];
			//	dataModel[x].ema = results[0][x];
			//}
		//	console.log(results[0])
		//	res.json(results[0]);
		//});

	},

	prediction: function(req, res) {

		dataService.predictiveModelPolynomial(req.query.asset1, req.query.asset2, req.query.delta, req.query.dataCount, req.query.order, req.query.precision).then(function(model){
			console.log(model);
		});

	},

	portfolioBalance: function(req, res) {

		//limit to btc for now.. 
		var exchangeMap = [];
		var promises = [];

		var initPortfolio, currentPortfolio = {BTC:req.query.btc}

		var limit = req.query.limit;
		var delta = req.query.delta;
		
		var selectedValues = [];
		var portfolioSet = [];
		var orderSet = [];

		var totalChange = 0;
		var smallestChange = 0;
		var largestChange = 0;

		tradingPairs = tradingPairs.filter(function(obj){
	        if (obj.split('/')[1]=='BTC'){return obj}
	    });

		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(limit, delta, tradingPair);
		    promises.push(promise);
		});

		Q.all(promises)
		.then(function(data){
			exchangeMap = data;
			
			//gotta compare 
			//exchangeMap[0][1]
			//exchangeMap[1][1]
			//exchangeMap[2][1]
			//portfolioMap 
			//if something starts losing money.. sell to btc.
			//if something is gaining, buy

			//TODO: efficencicy redux
			for (y in exchangeMap[0]){

				var timeArray = [];
				var predictionArray = [];

				for (x in exchangeMap){
					timeArray.push(exchangeMap[x][y]);
					predictionArray.push(exchangeMap[x][parseInt(y)+1]);
					if (!hasUndefined(timeArray)){
						if(!currentPortfolio[exchangeMap[x][y].asset1]){currentPortfolio[exchangeMap[x][y].asset1]=0}
						if(!currentPortfolio[exchangeMap[x][y].asset2]){currentPortfolio[exchangeMap[x][y].asset2]=0}
					}
				}

				if (!hasUndefined(predictionArray)){

					timeArray.sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 
					predictionArray.sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 

					var mostPositiveChange = predictionArray[0].percentChange;
					var mostNegativeChange = predictionArray[predictionArray.length-1].percentChange;

					var totalPositiveChange = predictionArray.reduce(function (s, a) {
						if (a.percentChange > 0){return s + a.percentChange;}
						else{return s}
					}, 0);

					var totalNegativeChange = predictionArray.reduce(function (s, a) {
						if (a.percentChange < 0){return s + a.percentChange;}
						else{return s}
					}, 0);

					var totalChange = predictionArray.reduce(function (s, a) {return s + a.percentChange;}, 0);

					//console.log(y, mostPositiveChange, mostNegativeChange, totalChange);
					//console.log(y, totalPositiveChange, totalNegativeChange);

					//MULTIPICK -- prob best to cap from 3-7
					var cap = 4;
					var capPositiveChange = predictionArray.slice(0, cap).reduce(function (s, a) {return s + a.percentChange}, 0);

					//TODO: STRAT
					//go to btc
					for (n in Object.keys(currentPortfolio)){
						var pairIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(Object.keys(currentPortfolio)[n]);
						if (pairIndex != -1){
							if (Object.keys(currentPortfolio)[n] != 'BTC' && currentPortfolio[Object.keys(currentPortfolio)[n]] != 0){
								//console.log('PLACE ORDER.. TRADE', currentPortfolio[Object.keys(currentPortfolio)[n]], timeArray[pairIndex].asset2, 'for', currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price), predictionArray[0].asset1)
								currentPortfolio[predictionArray[0].asset1] += currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price);
								orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:1/parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]], createdAt:timeArray[pairIndex].createdAt})
								currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
								portfolioSet.push(clone(currentPortfolio));
							}
						}
					};

					
					//all in on PREDICTED NEXT HIGHEST
					//IF STRAT == CLASSIC
					if(predictionArray[0].percentChange != 0){
						var currentIndex = timeArray.map(function(obj){return obj.assetPair}).indexOf(predictionArray[0].assetPair);
						console.log('PLACE ORDER.. TRADE', currentPortfolio[predictionArray[0].asset1], predictionArray[0].asset1, 'for', currentPortfolio[predictionArray[0].asset1]/parseFloat(timeArray[currentIndex].price), predictionArray[0].asset2)
						orderSet.push({asset1: predictionArray[0].asset1, asset2:predictionArray[0].asset2, price:parseFloat(timeArray[currentIndex].price), amount:currentPortfolio[predictionArray[0].asset1], createdAt:timeArray[pairIndex].createdAt})
						currentPortfolio[predictionArray[0].asset2] += currentPortfolio[predictionArray[0].asset1]/parseFloat(timeArray[currentIndex].price);
						currentPortfolio[predictionArray[0].asset1] = 0;
						portfolioSet.push(clone(currentPortfolio));
					}
					
					//MULTIPICK
					//IF STRAT == MULTIPICK, CAP
					/*var asset1Amount = currentPortfolio[predictionArray[x].asset1];
					for (x in predictionArray){
						if (totalPositiveChange != 0 && predictionArray[x].percentChange > 0){
							//if (x < cap){
								var currentIndex = timeArray.map(function(obj){return obj.assetPair}).indexOf(predictionArray[x].assetPair);
								var relativeAmount = asset1Amount*predictionArray[x].percentChange/totalPositiveChange//capPositiveChange;
								//console.log('PLACE ORDER.. TRADE', relativeAmount, predictionArray[x].asset1, 'for', relativeAmount/timeArray[currentIndex].price, predictionArray[x].asset2)
								currentPortfolio[predictionArray[x].asset2] += relativeAmount/timeArray[currentIndex].price;
								currentPortfolio[predictionArray[x].asset1] = currentPortfolio[predictionArray[x].asset1] - relativeAmount;
								orderSet.push({asset1: predictionArray[x].asset1, asset2:predictionArray[x].asset2, price:parseFloat(timeArray[currentIndex].price), amount:currentPortfolio[predictionArray[x].asset1]})
								portfolioSet.push(clone(currentPortfolio));
							//}
						}
					}*/

					//console.log(currentPortfolio.BTC)
					//console.log(y, currentPortfolio);

				}

			}

			console.log(portfolioSet);
			console.log(orderSet);
			res.json({portfolioSet:portfolioSet, orderSet:orderSet});

		});

	},

	portfolioBalanceMulti: function(req, res) {

		//limit to btc for now.. 
		var exchangeMap = [];
		var promises = [];
		var currentPortfolio = {BTC:req.query.btc}
		var limit = req.query.limit;
		var delta = req.query.delta;
		var portfolioSet = [];
		var orderSet = [];

		tradingPairs = tradingPairs.filter(function(obj){
	        if (obj.split('/')[1]=='BTC'){return obj}
	    });

		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(limit, delta, tradingPair);
		    promises.push(promise);
		});

		Q.all(promises)
		.then(function(data){
			exchangeMap = data;

			//TODO: efficencicy redux
			for (y in exchangeMap[0]){
				var timeArray = [];
				var predictionArray = [];

				for (x in exchangeMap){
					timeArray.push(exchangeMap[x][y]);
					predictionArray.push(exchangeMap[x][parseInt(y)+1]);//--> this is oh boi.
					if (!hasUndefined(timeArray)){
						if(!currentPortfolio[exchangeMap[x][y].asset1]){currentPortfolio[exchangeMap[x][y].asset1]=0}
						if(!currentPortfolio[exchangeMap[x][y].asset2]){currentPortfolio[exchangeMap[x][y].asset2]=0}
					}
				}

				if (!hasUndefined(predictionArray)){

					timeArray.sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 
					predictionArray.sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 

					var mostPositiveChange = predictionArray[0].percentChange;
					var mostNegativeChange = predictionArray[predictionArray.length-1].percentChange;

					var totalPositiveChange = predictionArray.reduce(function (s, a) {
						if (a.percentChange > 0){return s + a.percentChange;}
						else{return s}
					}, 0);

					var totalNegativeChange = predictionArray.reduce(function (s, a) {
						if (a.percentChange < 0){return s + a.percentChange;}
						else{return s}
					}, 0);

					var totalChange = predictionArray.reduce(function (s, a) {return s + a.percentChange;}, 0);

					//console.log(y, mostPositiveChange, mostNegativeChange, totalChange);
					//console.log(y, totalPositiveChange, totalNegativeChange);

					//MULTIPICK -- prob best to cap from 3-7
					var cap = req.query.cap;
					//var cap = 4;
					var capPositiveChange = predictionArray.slice(0, cap).reduce(function (s, a) {return s + a.percentChange}, 0);

					//TODO: STRAT
					//go to btc
					for (n in Object.keys(currentPortfolio)){
						var pairIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(Object.keys(currentPortfolio)[n]);
						if (pairIndex != -1){
							if (Object.keys(currentPortfolio)[n] != 'BTC' && currentPortfolio[Object.keys(currentPortfolio)[n]] != 0){
								//console.log('PLACE ORDER.. TRADE', currentPortfolio[Object.keys(currentPortfolio)[n]], timeArray[pairIndex].asset2, 'for', currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price), predictionArray[0].asset1)
								currentPortfolio[predictionArray[0].asset1] += currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price);
								orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:1/parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]], createdAt:timeArray[pairIndex].createdAt})
								currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
								portfolioSet.push(clone(currentPortfolio));
							}
						}
					};

					//MULTIPICK
					//IF STRAT == MULTIPICK, CAP
					var sum = 0;
					var asset1Amount = currentPortfolio[predictionArray[x].asset1];
					for (x in predictionArray){
						if (totalPositiveChange != 0 && predictionArray[x].percentChange > 0){
							//if (cap != 'none' && x < cap){
								var currentIndex = timeArray.map(function(obj){return obj.assetPair}).indexOf(predictionArray[x].assetPair);
								var relativeAmount = asset1Amount*predictionArray[x].percentChange/totalPositiveChange//capPositiveChange;
								sum += relativeAmount;
								console.log(sum);
								//console.log('PLACE ORDER.. TRADE', relativeAmount, predictionArray[x].asset1, 'for', relativeAmount/timeArray[currentIndex].price, predictionArray[x].asset2)
								currentPortfolio[predictionArray[x].asset2] += relativeAmount/timeArray[currentIndex].price;
								currentPortfolio[predictionArray[x].asset1] = currentPortfolio[predictionArray[x].asset1] - relativeAmount;
								orderSet.push({asset1: predictionArray[x].asset1, asset2:predictionArray[x].asset2, price:parseFloat(timeArray[currentIndex].price), amount:relativeAmount, createdAt:timeArray[pairIndex].createdAt})
								portfolioSet.push(clone(currentPortfolio));
							//}
						}
					}
				}
			}

			console.log(portfolioSet);
			console.log(orderSet);
			res.json({portfolioSet:portfolioSet, orderSet:orderSet})

		});

	},

	
};