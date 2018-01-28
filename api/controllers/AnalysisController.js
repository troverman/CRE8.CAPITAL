var Q = require('q');
var tulind = require('tulind');
var regression = require('regression');
var async = require('async');

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


//save pdf --> delta, pair, timestamp, data

module.exports = {

	ema: function(req, res) {
		
		var data = JSON.parse(req.query.data);
		var period = req.query.period;
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange})

		//TODO --> var results = dataService.. dataService(data, period); res.json(results)
		tulind.indicators.ema.indicator([price], [period], function(err, results) {
			var returnData = [];
			for (x in results[0]){
				returnData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), results[0][x]])
			}
			var dataArray = [];
			for (x in returnData){
				dataArray.push([x, returnData[x]]);
	    	}
			var result = regression.polynomial(dataArray, { order: 14, precision: 100 });
			console.log(result, result.r2, result.predict(1000), period, result.string);
			res.json(returnData);
		});
	},

	tsf: function(req, res) {
		var data = JSON.parse(req.query.data);
		var period = req.query.period;
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange})
		tulind.indicators.tsf.indicator([price], [period], function(err, results) {
			var returnData = [];
			for (x in results[0]){
				if (parseInt(x)+parseInt(period) < data.length){
					returnData.push([parseInt(new Date(data[parseInt(x)+parseInt(period)].createdAt).getTime()), results[0][x]])
				}
				if (parseInt(x)+parseInt(period) == data.length){
					var delta = parseInt(parseInt(data[0].delta));
					console.log('equal..');
					console.log(delta);
					console.log(new Date(data[data.length-1].createdAt) - new Date(data[data.length-2].createdAt))
					console.log(new Date(data[data.length-1].createdAt));
					console.log(new Date(data[data.length-1].createdAt).getTime() + delta);
					returnData.push([new Date(data[data.length-1].createdAt).getTime() + delta, results[0][x]])
				}
			}
			var dataArray = [];
			for (x in returnData){
				dataArray.push([x, returnData[x]]);
	    	}
	    	var result = regression.polynomial(dataArray, { order: 14, precision: 100 });
			console.log(result, result.r2, result.predict(1000), period, result.string);
			res.json(returnData);
		});
	},

	bband: function(req, res) {

		var data = req.query.data;
		var period = req.query.period;
		var std = req.query.std;

		//TODO --> var results = dataService.. dataService(data, period); res.json(results)
		tulind.indicators.bbands.indicator([change], [10,2], function(err, results) {
			//dataObject.data = dataModel;
			//for (x in results[0]){
			//	dataModel[x].lower = results[0][x];
			//	dataModel[x].middle = results[1][x];
			//	dataModel[x].upper = results[2][x];
			//	dataModel[x].ema = results[0][x];
			//}
			res.json(results[0]);
		});
	},

	//TODO:THIS WILL BE A DB LOL OVER ENG
	pdf: function(req, res) {
		console.log('PDF!!')
		var heatMap = []
		var promises = [];
		var data = JSON.parse(req.query.data);
		var predictionArray = [];
		async.eachSeries(data, function (dataData, nextTime){
		//for (x in data){
			var dataArray = [];
			//hack
			var index = data.map(function(obj){return obj.id}).indexOf(dataData.id);
			if (index>0){
				console.log(index);
				var pairData = data.slice(0, index);
				//console.log(pairData);
				var periodArray = [3,5,10,20,40,80];
				var tsfPredictionData = [];
				//for (y in periodArray){
				for (var y = 1; y <= index; y++) { 
					tsfPredictionData.push(dataService.getTSF(pairData, y));
				}
				(function(pairData){
					Q.all(tsfPredictionData)
					.then(function(predictionData){
						var sortedData = predictionData.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
						var low = sortedData[sortedData.length-1];
						var high = sortedData[0];
						var range = high - low;
						var lastPrice = pairData[pairData.length-1].price;
						var changeHigh = (high - lastPrice)/high;
						var changeLow = (low - lastPrice)/low;

						console.log(pairData[0].asset1, pairData[0].asset2, pairData[0].delta);
						console.log(sortedData);
						console.log(lastPrice, high, low, range);
						console.log(changeHigh, changeLow);
					
						//INIT PDF
						//might need to save pdfs as prediction db
						//populate oppropiately ~ normal dist around 0? liner relation..
						var pdfMap = {};
						for (var i=1000; i>=-1000; i--){
							pdfMap[i/1000] = 0.60811/Math.pow(i, 2);
						}
						pdfMap[0] = pdfMap[0.001];

						//TEST
						var testData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});
						for (x in testData){
							pdfMap[parseFloat(testData[x].toFixed(3))] += 0.1
						}
						heatMap.push(pdfMap);
						process.nextTick(nextTime);

					});
				})(pairData)
			}
			else{process.nextTick(nextTime);}
		},function(){
			res.json({heatMap:heatMap})
		});
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
					//what is x here vv
					//var asset1Amount = currentPortfolio['BTC'];
					for (x in predictionArray){
						var asset1Amount = currentPortfolio[predictionArray[x].asset1];
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

	//only using TSF atm
	//IF THIS IS PROFITABLE.. TURN IT ON!
	//TODO: restructure to object strcutre vs. reliying on indexing 
	//TODO: this a mess lol
	portfolioSolvePDF: function(req, res) {

		function getPdf(pairData, callback){
			//TODO: restructure to object strcutre vs. reliying on indexing 
			//pairData[0].asset1 ~ {}
			var pdfMapArray = [];
			async.eachSeries(pairData, function (data, nextPair){
				var index = pairData.map(function(obj){return obj.id}).indexOf(data.id);
				//build prediction array.
				if (index > 0){
					var predictionData = pairData.slice(0, index);
					var tsfPredictionData = [];
					for (var z = 1; z <= index; z++){
						tsfPredictionData.push(dataService.getTSF(predictionData, z));
					}
					Q.all(tsfPredictionData)
					.then(function(data){
						//large list of predictions.. (not pdf yet.)
						//theoretitically pdf will have +8.8 indicators +1 complexity
						//return obj here for predictions 
						//at each time at each pair
						var sortedData = data.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
						var lastPrice = pairData[pairData.length-1].price;

						//INIT PDF
						var pdfMap = {};
						var pdfSum = 0;
						for (var i=1000; i>=-1000; i--){
							pdfMap[i/1000] = 0.60811/Math.pow(i, 2);
						}
						pdfMap[0] = pdfMap[0.001];
						
						var pdfData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});
						for (x in pdfData){
							if (!isNaN(pdfData[x])){
								pdfMap[parseFloat(pdfData[x].toFixed(3))] += 0.25
							}
						}

						//PDF ANALYSIS HERE!
						//pdfSum+=0.60811/Math.pow(i, 2);
						//pdfMap.stats = {}
						//pdfMap.sum = pdfSum;
						//pdfMap.totalPositiveProbability = 0;
						//pdfMap.totalNegativeProbability = 0;
						//pdfMap.allPostiveProbability = true;

						pdfMapArray.push(pdfMap);
						process.nextTick(nextPair);
					});

				}
				else{process.nextTick(nextPair);}
			},
			function(){
				callback(pdfMapArray);
			});
		};

		var exchangeMap = [];
		var promises = [];
		var currentPortfolio = {BTC:req.query.btc}
		var limit = 20//req.query.limit;
		var delta = '60000'//req.query.delta;
		var portfolioSet = [];
		var orderSet = [];
		var sum = 0;
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
			var pdfArray = [];
			async.eachSeries(exchangeMap, function (pairData, nextPair){
				getPdf(pairData, function(pdfMap){
					pdfArray.push(pdfMap);
					process.nextTick(nextPair);
				});
			},
			function(){
				for (y in exchangeMap[0]){
					var timeArray = [];
					var predictionArray = [];
					for (x in exchangeMap){
						timeArray.push(exchangeMap[x][y]);
						predictionArray.push(pdfArray[x][y]);
						if (!hasUndefined(timeArray)){
							if(!currentPortfolio[exchangeMap[x][y].asset1]){currentPortfolio[exchangeMap[x][y].asset1]=0}
							if(!currentPortfolio[exchangeMap[x][y].asset2]){currentPortfolio[exchangeMap[x][y].asset2]=0}
						}
					}

					//TODO:fix lag ~ length probs.
					if (!hasUndefined(predictionArray)){

						var pdfAnalysis = [];
						//TODO REDUX. STORE IN PDF ARRAY :analyis
						//TO) MUCH CALC
						for (x in predictionArray){
							//find most 'attractive' pdf
							//pdf analysis
							var pdfMap = predictionArray[x];
							var pdfSum = 0;
							var totalPositiveProbability = 0;
							var totalNegativeProbability = 0;
							var allPostiveProbability = true;
							sum++;
							for (z in Object.keys(pdfMap)){
								var key = Object.keys(pdfMap)[z];
								pdfSum += pdfMap[key];
								//in analysis... amount * percentage -
								//so key*pdfMap[key] to weight
								if (key > 0){totalPositiveProbability += key*pdfMap[key];}
								if (key < 0){
									totalNegativeProbability += key*pdfMap[key];
									if (pdfMap[key] > 0.1){
										allPostiveProbability = false
									}
								}
							}
							console.log(totalPositiveProbability, totalNegativeProbability, allPostiveProbability, totalPositiveProbability + totalNegativeProbability, sum);
							pdfAnalysis.push({totalPositiveProbability:totalPositiveProbability, totalNegativeProbability:totalNegativeProbability, allPostiveProbability:allPostiveProbability});
						}


						//find index of most 'attractive'
						//sort by probability score ~ for multipick 
						//if not -1
						var positiveProbabilityIndex = pdfAnalysis.map(function(obj){return obj.allPostiveProbability}).indexOf(true);
						//console.log(positiveProbabilityIndex);

						//sort by totalPositiveProbability - totalNegativeProbability
						//need to find index..
						//var sortMap = pdfAnalysis.map(function(obj){return obj.totalPositiveProbability + obj.totalNegativeProbability});
						//this may be redundant vs relativity +1 start complexity
						var sortMap = pdfAnalysis.sort(function(a,b) {
							return (a.totalPositiveProbability + a.totalNegativeProbability < b.totalPositiveProbability + b.totalNegativeProbability) ? 1 : ((b.totalPositiveProbability + b.totalNegativeProbability < a.totalPositiveProbability + a.totalNegativeProbability) ? -1 : 0);
						}); 

						//TODO: move away from index.
						var pickOrderIndex = [];
						for (x in sortMap){
							//totalPositiveProbability is not neccesarily unique 
							pickOrderIndex.push(pdfAnalysis.map(function(obj){return obj.totalPositiveProbability}).indexOf(sortMap[x].totalPositiveProbability));
						}

						//TODO: add positiveProbabilityIndex to pickOrderIndex, reduce.

						//MULTIPICK -- prob best to cap from 3-7
						var cap = 4;
						var cappedPickIndex = pickOrderIndex.slice(0, cap);

						//TODO: relativity? 
						var totalPositiveChange = 0;
						for (x in pdfAnalysis){
							totalPositiveChange += pdfAnalysis[x].totalPositiveProbability;
						}

						//STRAT
						//go to btc
						for (n in Object.keys(currentPortfolio)){
							var pairIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(Object.keys(currentPortfolio)[n]);
							if (pairIndex != -1){
								if (Object.keys(currentPortfolio)[n] != 'BTC' && currentPortfolio[Object.keys(currentPortfolio)[n]] != 0){
									currentPortfolio['BTC'] += currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price);
									orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:1/parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]], createdAt:timeArray[pairIndex].createdAt})
									currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
									portfolioSet.push(clone(currentPortfolio));
								}
							}
						}

						//MULTIPICK
						for (n in cappedPickIndex){
							var asset1Amount = currentPortfolio[timeArray[cappedPickIndex[n]].asset1];
							var relativeAmount = asset1Amount*pdfAnalysis[cappedPickIndex[n]].totalPositiveProbability/totalPositiveChange;
							currentPortfolio[timeArray[cappedPickIndex[n]].asset2] += relativeAmount/timeArray[cappedPickIndex[n]].price;
							currentPortfolio['BTC'] = currentPortfolio['BTC'] - relativeAmount;
							orderSet.push({asset1: timeArray[cappedPickIndex[n]].asset1, asset2:timeArray[cappedPickIndex[n]].asset2, price:parseFloat(timeArray[cappedPickIndex[n]].price), amount:relativeAmount, createdAt:timeArray[cappedPickIndex[n]].createdAt})
							portfolioSet.push(clone(currentPortfolio));
						}

						//to see roi
						console.log(y, exchangeMap[0].length-2)
						if (y == exchangeMap[0].length-2){
							for (n in Object.keys(currentPortfolio)){
								var pairIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(Object.keys(currentPortfolio)[n]);
								if (pairIndex != -1){
									if (Object.keys(currentPortfolio)[n] != 'BTC' && currentPortfolio[Object.keys(currentPortfolio)[n]] != 0){
										//console.log(Object.keys(currentPortfolio)[n])
										currentPortfolio['BTC'] += currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price);
										orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:1/parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]], createdAt:timeArray[pairIndex].createdAt})
										currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
										portfolioSet.push(clone(currentPortfolio));
									}
								}
							}
						}

					}
				}

				console.log(portfolioSet);
				//console.log(orderSet);

				res.json({portfolioSet:portfolioSet, orderSet:orderSet})

			});
		});
	},

	
};