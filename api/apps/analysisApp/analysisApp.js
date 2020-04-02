var App = {
	import:{
		Q: require('q'),
		fft: require('fft-js').fft,
		nostradamus: require('nostradamus'),
		ema: require('exponential-moving-average'),
		regression: require('regression')
	},

	//ATTEMPTING TO CONSTRUCT A MULTIDIMENSIONAL TOKEN MAKRET && MATCHING ENGINE // BETER NAME SANS BUZZ

	recursivePowersetDecompose: function(model, count, length){
		//SHOULD BE LOCAL --> SHOULD HAVE KNOWN :P
		//if(!model.count){model.count=0}
		//model.count++;
		if(!count){count=0}
		count++;
		model.output = [];
		var powerSet = utilityServiceApp.getAllSubsets(model.input.data);
		powerSet.shift();
		for (x in powerSet){
			var set = powerSet[x];
			if (set.length > model.input.params.size && count < model.input.params.recursion && length != set.length ){
				//if set length == length passed in param
				console.log(set);
				console.log(length, set.length, model.input.params.size);
				//console.log(count, model.count);
				model.input.data=set;
				set = App.recursivePowersetDecompose(model, count, set.length);
				//returnObj.push(set);
			}
			model.output.push(set);
		}
		return model.output;
	},
		
	//SOLVER APP
	//TODO: TENSOR OUTPUT .. TO CREATE TRAINING SETS
	//TODO: PDF SOLVER
	portfolioBalance: async function(delta, limit){
		function getData(limit, delta, tradingPair){
		    var defered = App.import.Q.defer();
		    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]}).limit(limit).sort('createdAt DESC').then(function(models){defered.resolve(models.reverse());});
		    return defered.promise;
		};
		function hasUndefined(a) {return a.indexOf() !== -1;};
		function clone(a) {return JSON.parse(JSON.stringify(a));};
		//limit to btc for now.. 
		var exchangeMap, promises, selectedValues, portfolioSet, orderSet = [];
		var initPortfolio, currentPortfolio = {BTC:0.65}
		var totalChange, smallestChange, largestChange = 0;
		tradingPairs = tradingPairs.filter(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
		tradingPairs.forEach(function(tradingPair, index){var promise = getData(limit, delta, tradingPair);promises.push(promise);});
		var data = await Q.all(promises);
		exchangeMap = data;
		//TODO: efficencicy redux
		for (y in exchangeMap[0]){
			var timeArray, predictionArray = [];
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
				var totalPositiveChange = predictionArray.reduce(function (s, a) {if (a.percentChange > 0){return s + a.percentChange;}else{return s}}, 0);
				var totalNegativeChange = predictionArray.reduce(function (s, a) {if (a.percentChange < 0){return s + a.percentChange;}else{return s}}, 0);
				var totalChange = predictionArray.reduce(function (s, a) {return s + a.percentChange;}, 0);
				//TODO: STRAT
				//go to btc
				for (n in Object.keys(currentPortfolio)){
					var pairIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(Object.keys(currentPortfolio)[n]);
					if (pairIndex != -1){
						if (Object.keys(currentPortfolio)[n] != 'BTC' && currentPortfolio[Object.keys(currentPortfolio)[n]] != 0){
							//console.log('PLACE ORDER.. TRADE', currentPortfolio[Object.keys(currentPortfolio)[n]], timeArray[pairIndex].asset2, 'for', currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price), predictionArray[0].asset1)
							currentPortfolio[predictionArray[0].asset1] += currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price);
							currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
							orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:1/parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]]})
							portfolioSet.push(clone(currentPortfolio));
						}
					}
				};
				//all in on PREDICTED NEXT HIGHEST
				if(predictionArray[0].percentChange != 0){
					var currentIndex = timeArray.map(function(obj){return obj.assetPair}).indexOf(predictionArray[0].assetPair);
					//console.log('PLACE ORDER.. TRADE', currentPortfolio[predictionArray[0].asset1], predictionArray[0].asset1, 'for', currentPortfolio[predictionArray[0].asset1]/parseFloat(timeArray[currentIndex].price), predictionArray[0].asset2)
					orderSet.push({asset1: predictionArray[0].asset1, asset2:predictionArray[0].asset2, price:parseFloat(timeArray[currentIndex].price), amount:currentPortfolio[predictionArray[0].asset1]})
					currentPortfolio[predictionArray[0].asset2] += currentPortfolio[predictionArray[0].asset1]/parseFloat(timeArray[currentIndex].price);
					currentPortfolio[predictionArray[0].asset1] = 0;
					portfolioSet.push(clone(currentPortfolio));
				}
				console.log(y, currentPortfolio);
			}
		}
		console.log(orderSet); console.log(currentPortfolio)	
	},
	//LEGACY
	portfolioBalanceMulti: async function(delta, limit, strat){
		function getData(limit, delta, tradingPair){
		    var defered = App.import.Q.defer();
		    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]}).limit(limit).sort('createdAt DESC')
			.then(function(models){defered.resolve(models.reverse());});
		    return defered.promise;
		};
		function hasUndefined(a) {return a.indexOf() !== -1;};
		function clone(a) {return JSON.parse(JSON.stringify(a));};
		//limit to btc for now.. 
		var exchangeMap, orderSet, promises, portfolioSet = [];
		var currentPortfolio = {BTC:10}
		var limit = limit;
		var delta = delta;

		tradingPairs = tradingPairs.filter(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
		tradingPairs.forEach(function(tradingPair, index){var promise = getData(limit, delta, tradingPair);promises.push(promise);});
		var data = await Q.all(promises);
		exchangeMap = data;
		//TODO: efficencicy redux
		for (y in exchangeMap[0]){
			var timeArray, predictionArray = [];
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

				var totalPositiveChange = predictionArray.reduce(function (s, a) {if (a.percentChange > 0){return s + a.percentChange;}else{return s}}, 0);
				var totalNegativeChange = predictionArray.reduce(function (s, a) {if (a.percentChange < 0){return s + a.percentChange;} else{return s}}, 0);

				var totalChange = predictionArray.reduce(function (s, a) {return s + a.percentChange;}, 0);

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
							currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
							orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:1/parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]]})
							portfolioSet.push(clone(currentPortfolio));
						}
					}
				};

				/*
				//all in on PREDICTED NEXT HIGHEST
				//IF STRAT == CLASSIC
				if(predictionArray[0].percentChange != 0){
					var currentIndex = timeArray.map(function(obj){return obj.assetPair}).indexOf(predictionArray[0].assetPair);
					console.log('PLACE ORDER.. TRADE', currentPortfolio[predictionArray[0].asset1], predictionArray[0].asset1, 'for', currentPortfolio[predictionArray[0].asset1]/parseFloat(timeArray[currentIndex].price), predictionArray[0].asset2)
					orderSet.push({asset1: predictionArray[0].asset1, asset2:predictionArray[0].asset2, price:parseFloat(timeArray[currentIndex].price), amount:currentPortfolio[predictionArray[0].asset1]})
					currentPortfolio[predictionArray[0].asset2] += currentPortfolio[predictionArray[0].asset1]/parseFloat(timeArray[currentIndex].price);
					currentPortfolio[predictionArray[0].asset1] = 0;
					portfolioSet.push(clone(currentPortfolio));
				}
				*/
				//MULTIPICK
				//IF STRAT == MULTIPICK, CAP
				var asset1Amount = currentPortfolio[predictionArray[x].asset1];
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
				}
				//console.log(currentPortfolio.BTC)
				console.log(y, currentPortfolio);
			}
		}
		console.log(orderSet)
		//console.log(currentPortfolio)	
	},
	getTSF: function(data, period){
		var deferred = App.import.Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.tsf.indicator([price], [period], function(err, results) {
			//console.log(period) deferred.resolve(results[0]); console.log(results[0][results[0].length-1])
			deferred.resolve(results[0][results[0].length-1])
		});
		return deferred.promise;
	},
	getFOSC: function(data, period){
		var deferred = App.import.Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.fosc.indicator([price], [period], function(err, results) {
			deferred.resolve(results)
		});
		return deferred.promise;
	},
	getBband: function(data, period, sD){
		var deferred = App.import.Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.bbands.indicator([change], [period, sD], function(err, results) {deferred.resolve({lower:results[0], middle:results[1], upper:results[2]})});
		return deferred.promise;
	},
	getEMA: function(data, period){
		var deferred = App.import.Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.ema.indicator([price], [period], function(err, results) {deferred.resolve(results[0]);});
		return deferred.promise;
	},
	getMACD: function(data, shortPeriod, longPeriod, signalPeriod){
		var deferred = App.import.Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.macd.indicator([price], [shortPeriod, longPeriod, signalPeriod], function(err, results) {deferred.resolve(results);});
		return deferred.promise;
	},
	getRSI: function(data, period){
		var deferred = App.import.Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.rsi.indicator([price], [period], function(err, results) {deferred.resolve(results);});
		return deferred.promise;
	},
	predictiveModelPolynomial: async function(asset1, asset2, delta, limit, order, precision){
		var regression = App.import.regression;
		var ema = App.import.ema;
		var dataArray = [];	
	   	var predictions = [];
	   	var now = new Date(), start = new Date(now.getTime() - (24 * 60 * 60 * 1000));
		var yesterday = Date.parse(start);
		var models = await Data.find({asset1:asset1, asset2:asset2, delta:delta}).sort('createdAt DESC').limit(limit)
    	for (x in models.reverse()){dataArray.push([Date.parse(models[x].createdAt) - Date.parse(models[0].createdAt), models[x].percentChange]);}
		var result = regression.polynomial(dataArray, { order: order, precision: precision });
		
    	//console.log(result);
    	//console.log(result.predict(dataArray[dataArray.length-1][0] + 100));
    	//console.log(ema(models.map(function(obj){return obj.price})));
		//console.log(dma.ma(models.map(function(obj){return obj.percentChange}),2))
    	//console.log(movingAverages.ma(models.map(function(obj){return obj.percentChange}),2))
    	//console.log(movingAverages.ma([1, 2, 3, 4, 5], 2));
    	var change = models.map(function(obj){return obj.percentChange})
    	tulind.indicators.sma.indicator([change], [3], function(err, results) {
			//console.log("Result of sma is:");
			//console.log(results[0]);
		});  
		tulind.indicators.vidya.indicator([change], [3,7,0.5], function(err, results) {
			//console.log("Result of vidya is:");
			//console.log(results[0]);
			//for (x in results[0]){
				//dataArray.push([Date.parse(models[x].createdAt) -  Date.parse(models[0].createdAt), results[0][x]]);
    		//}
			//var result = regression.polynomial(dataArray, { order: order, precision: precision });
    		//console.log(result);
		});  
		//tulind.indicators.sma.start([change])
		//console.log(tulind.indicators.stoch.start([5,3,3]))
		//console.log(models.map(function(obj){return obj.percentChange}))
    	return result;
	},
	predictiveModelFFT: async function(model){
		var fft = App.import.fft;
		var forecast = App.import.nostradamus;
	   	var dataArray, predictions = [];	
		var now = new Date(), start = new Date(now.getTime() - (24 * 60 * 60 * 1000));
		var yesterday = Date.parse(start);
	    var models = await Data.find({asset1:model.asset1, asset2:model.asset2, delta:model.delta}).sort('createdAt DESC').limit(model.limit)
    	for (x in models){
			var price = models[x].price;
    		var date = Date.parse(models[x].createdAt);
    		var update = date - Date.parse(models[0].createdAt)// - yesterday;
			dataArray.push([date, price]);
    	}
    	var phasors=fft(dataArray);
		var string = '';
		//F ( x ) = a /2 + a 1 cos x + b 1 sin x + a 2 cos 2 x + b 2 sin 2 x + ... + a n cos nx + b n sin nx + ...
		for (x in phasors){
			var a = phasors[x][0];
			var b = phasors[x][1];
			if(x==0){string = a+'/2'+ a +'cos(x) + '+b+'sin(x) + ';}
			else{
				//ancos(nx) + bnsin(nx)
				string+=a*x+'cos('+a*x+'*x) + ' + b*x + 'sin('+b*x+'*x) + '
			}
		}
		console.log(phasors);
		return phasors;
	}
};
module.exports = App;