var App = {
	import:{
		Q: require('q'),
		tulind: require('tulind'),
		regression: require('regression'),
	},
	static:{
		tradingPairs:[
		    'XRP/BTC',
		    'ETH/BTC',
		    'BTC/USDT',
		    'LTC/BTC',
		    'BCH/BTC',
			'STR/BTC',
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
		    'GNO/BTC',
		    'PPC/BTC',
		    'GAS/BTC',
		    'BURST/BTC',
		    'PASC/BTC', 
		    'VIA/BTC',
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
		    'SBD/BTC',
		    'NMC/BTC',
		    'GNO/ETH',
		    'CVC/ETH',
		    'NXT/XMR',
		    'ZEC/XMR',
		    'XPM/BTC',
		    'BTCD/BTC', 
		    'REP/ETH',
		    'MAID/XMR', 
		    'DASH/XMR', 
		    'HUC/BTC',
		    'STEEM/ETH',
		    'BCN/XMR',
		    'BTCD/XMR', 
		]
	},
	ema: async function(input, output) {
		var data = JSON.parse(input.query.data);
		var period = input.query.period;
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange})

		//TODO --> var results = analysisApp.. dataService(data, period); output.json(results)
		//zlema
		App.import.tulind.indicators.ema.indicator([price], [period], function(err, results) {
			var returnData, dataArray = [];
			for (x in results[0]){returnData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), results[0][x]])}
			for (x in returnData){dataArray.push([x, returnData[x]]);}
			var result = App.import.regression.polynomial(dataArray, { order: 14, precision: 100 });
			console.log(result, result.r2, result.predict(1000), period, result.string);
			output.json(returnData);
		});
	},
	zelma: async function(input, output) {
		var data = JSON.parse(input.query.data);
		var period = input.query.period;
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange})
		//wma, kama, dema, tema
		App.import.tulind.indicators.kama.indicator([price], [period], function(err, results) {
			var returnData = [];
			//reverse though data for ex, dema, tema
			for (x in data){
				if (x >= parseInt(period)){
					returnData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), results[0][x-parseInt(period)]]);
				}
			}
			output.json(returnData);
		});
	},
	macd: async function(input, output) {
		var data = JSON.parse(input.query.data);
		var shortPeriod = input.query.shortPeriod;
		var longPeriod = input.query.longPeriod;
		var signalPeriod = input.query.signalPeriod;
		var type = input.query.type;
		var macdData = await analysisApp.getMACD(data, shortPeriod, longPeriod, signalPeriod, type);
		var returnData = [];
		//var macdSignal = [];
		//var macdHistogram = [];
		for (x in data){
			if (x >= parseInt(longPeriod)){
				//TODO: macd[1], macd[2]
				returnData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), macdData[0][x-parseInt(longPeriod)]]);
			}
		}
		output.json(returnData);
	},
	tsf: async  function(input, output) {
		var data = JSON.parse(input.query.data);
		var period = input.query.period;
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange})
		App.import.tulind.indicators.tsf.indicator([price], [period], function(err, results) {
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
			for (x in returnData){dataArray.push([x, returnData[x]]);}
	    	var result = App.import.regression.polynomial(dataArray, { order: 14, precision: 100 });
			console.log(result, result.r2, result.predict(1000), period, result.string);
			output.json(returnData);
		});
	},
	fosc: async function(input, output) {
		var data = JSON.parse(input.query.data);
		var period = input.query.period;
		var type = input.query.type;
		var foscData = await analysisApp.getFOSC(data, period, type);
		var returnData = [];
		for (x in data){
			if (x >= parseInt(period)){
				returnData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), foscData[0][x-parseInt(period)]]);
			}
		}
		output.json(returnData);
	},
	rsi: async function(input, output) {
		var data = JSON.parse(input.query.data);
		var period = input.query.period;
		var type = input.query.type;
		var rsiData = await analysisApp.getRSI(data, period, type);
		var returnData = [];
		for (x in data){
			if (x >= parseInt(period)){
				returnData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), rsiData[0][x-parseInt(period)]]);
			}
		}
		output.json(returnData);
	},
	bband: function(input, output) {
		var data = JSON.parse(input.query.data);
		var period = input.query.period;
		var sD = input.query.sD;
		var type = input.query.type;
		var analysisData = [];
		if (type == 'price'){analysisData = data.map(function(obj){return obj.price});}
		if (type == 'change'){analysisData = data.map(function(obj){return obj.percentChange});}
		//TODO --> var results = analysisApp.. dataService(data, period); output.json(results)
		App.import.tulind.indicators.bbands.indicator([analysisData], [period, sD], function(err, results) {
			//console.log(results);
			//TODO:meh~
			//too structured
			var lowerData, middleData, uppderData = [];
			for (x in data){
				//shift.
				if (x >= parseInt(period)){
					lowerData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), results[0][x-parseInt(period)]]);
					middleData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), results[1][x-parseInt(period)]]);
					uppderData.push([parseInt(new Date(data[parseInt(x)].createdAt).getTime()), results[2][x-parseInt(period)]]);
				}
			}
			console.log(lowerData.length, results[0].length, parseInt(period));
			output.json({lower:lowerData, middle:middleData, upper:uppderData});
		});
	},
	fft: function(input, output) {},
	regression: function(input, output) {},
	prediction: async function(input, output) {
		var model = await analysisApp.predictiveModelPolynomial(input.query.asset1, input.query.asset2, input.query.delta, input.query.dataCount, input.query.order, input.query.precision);
		console.log(model);
		output.json(model);
	},

	//PDF | TRAIN WITH THESE GUYS
	//TODO: REDUCE TO APP 
	//TODO: THIS WILL BE A DB
	pdf: async function(input, output) {
		var heatMap, promises, predictionArray = []
		var data = JSON.parse(input.query.data);
		for (x in data){
			var dataData = data[x];
			var dataArray = [];
			//hack
			var index = data.map(function(obj){return obj.id}).indexOf(dataData.id);
			if (index>0){

				console.log(index);

				var pairData = data.slice(0, index);
				var periodArray = [3,5,10,20,40,80];
				var tsfPredictionData = [];
				//for (y in periodArray){
				for (var y = 1; y <= index; y++) {tsfPredictionData.push(analysisApp.getTSF(pairData, y));}
				
				var predictionData = await App.import.Q.all(tsfPredictionData);
					
				var sortedData = predictionData.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
				var low = sortedData[sortedData.length-1];
				var high = sortedData[0];
				var range = high - low;
				var lastPrice = pairData[pairData.length-1].price;
				var changeHigh = (high - lastPrice)/high;
				var changeLow = (low - lastPrice)/low;
				//console.log(pairData[0].asset1, pairData[0].asset2, pairData[0].delta);
				//console.log(sortedData);
				//console.log(lastPrice, high, low, range);
				//console.log(changeHigh, changeLow);
	
				//INIT PDF
				//might need to save pdfs as prediction db
				//populate oppropiately ~ normal dist around 0? liner relation..
				var pdfMap = {};
				var bbandData = [];
				for (var y = 1; y <= 30; y++) { 
					var sD =y/10;
					bbandData.push(analysisApp.getBband(pairData, 10, y));
				}
				var bbandData = await App.import.Q.all(bbandData);
				var bbandIndicator = [];
				for (x in bbandData){
					//console.log(bbandData[x].upper)
					//console.log(bbandData[x].upper[bbandData[x].upper.length-1]);
					var upperLastElement = bbandData[x].upper[bbandData[x].upper.length-1];
					var lowerLastElement = bbandData[x].lower[bbandData[x].lower.length-1];
					bbandIndicator.push({upper:upperLastElement, lower:lowerLastElement});
				}
				for (var i=1000; i>=-1000; i--){pdfMap[i/1000] = 0.60811/Math.pow(i, 2);}
				pdfMap[0] = pdfMap[0.001];
				//INIT pdfMap w bbandData!
				//w bband --> fill in area between bands.. --> layer it 
				for (x in bbandIndicator){
					//var upperBandPercent = (bbandIndicator[x].upper-lastPrice) / lastPrice;
					//var lowerBandPercent = (bbandIndicator[x].lower-lastPrice) / lastPrice;
					//console.log(upperBandPercent,lowerBandPercent);
					console.log(bbandIndicator[x].upper, lastPrice, bbandIndicator[x].lower)
					for (var i=1000; i>=-1000; i--){
						if (i/1000 > bbandIndicator[x].lower && i/1000 < bbandIndicator[x].upper){
							pdfMap[i/1000] += 0.001//map better by sD %
						}
					}
				}
				//TEST
				var testData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});
				for (x in testData){pdfMap[parseFloat(testData[x].toFixed(3))] += 0.50}
				//console.log(pdfMap);
				heatMap.push(pdfMap);
			}
		}
		output.json({heatMap:heatMap})
	},

	//TODO: SKINNY CONTROLLERS -- CALL APP..
	portfolioBalance: async function(input, output) {
		function hasUndefined(a) {return a.indexOf() !== -1;};
		function clone(a) {return JSON.parse(JSON.stringify(a));};
		function getData(limit, delta, tradingPair){
		    var defered = App.import.Q.defer();
		    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]}).limit(limit).sort('createdAt DESC').then(function(models){console.log(tradingPair);defered.resolve(models.reverse());});
		    return defered.promise;
		};
		//limit to btc for now.. 
		var initPortfolio, currentPortfolio = {BTC:input.query.btc}
		var limit = input.query.limit;
		var delta = input.query.delta;
		var selectedValues, portfolioSet, orderSet, promises, exchangeMap = [];
		var totalChange, smallestChange, largestChange = 0;

		tradingPairs = App.static.tradingPairs.filter(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
		tradingPairs.forEach(function(tradingPair, index){var promise = getData(limit, delta, tradingPair);promises.push(promise);});

		var data = await App.import.Q.all(promises);
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
				//SLOP
				timeArray.push(exchangeMap[x][y]);
				predictionArray.push(exchangeMap[x][parseInt(y)+1]);
				if (!hasUndefined(timeArray)){
					if(!currentPortfolio[exchangeMap[x][y].asset1]){currentPortfolio[exchangeMap[x][y].asset1]=0}
					if(!currentPortfolio[exchangeMap[x][y].asset2]){currentPortfolio[exchangeMap[x][y].asset2]=0}
				}
			}
			//sloppy fix.. | it's becoming undefined ?? 
			//if(exchangeMap[x][parseInt(y)+1]){
			if (!hasUndefined(predictionArray)){
				timeArray.sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 
				predictionArray.sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 
				var mostPositiveChange = predictionArray[0].percentChange;
				var mostNegativeChange = predictionArray[predictionArray.length-1].percentChange;
				var totalPositiveChange = predictionArray.reduce(function (s, a) {if (a.percentChange > 0){return s + a.percentChange;}else{return s}}, 0);
				var totalNegativeChange = predictionArray.reduce(function (s, a) {if (a.percentChange < 0){return s + a.percentChange;}else{return s}}, 0);
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
		console.log(portfolioSet); console.log(orderSet);
		output.json({portfolioSet:portfolioSet, orderSet:orderSet});
	},

	//TODO: SKINNY CONTROLLERS -- CALL APP..
	portfolioBalanceMulti: async function(input, output) {
		function hasUndefined(a) {return a.indexOf() !== -1;};
		function clone(a) {return JSON.parse(JSON.stringify(a));};
		function getData(limit, delta, tradingPair){
		    var defered = App.import.Q.defer();
		    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]}).limit(limit).sort('createdAt DESC').then(function(models){console.log(tradingPair);defered.resolve(models.reverse());});
		    return defered.promise;
		};
		//limit to btc for now.. 
		var exchangeMap, promises = [];
		var currentPortfolio = {BTC:input.query.btc}
		var limit = input.query.limit;
		var delta = input.query.delta;
		var portfolioSet, orderSet = [];
		tradingPairs = App.static.tradingPairs.filter(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
		tradingPairs.forEach(function(tradingPair, index){var promise = getData(limit, delta, tradingPair);promises.push(promise);});

		var data = await App.import.Q.all(promises)
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
				var totalPositiveChange = predictionArray.reduce(function (s, a) {if (a.percentChange > 0){return s + a.percentChange;}else{return s}}, 0);
				var totalNegativeChange = predictionArray.reduce(function (s, a) {if (a.percentChange < 0){return s + a.percentChange;}else{return s}}, 0);
				var totalChange = predictionArray.reduce(function (s, a) {return s + a.percentChange;}, 0);
				//console.log(y, mostPositiveChange, mostNegativeChange, totalChange);
				//console.log(y, totalPositiveChange, totalNegativeChange);
				//MULTIPICK -- prob best to cap from 3-7
				var cap = input.query.cap;
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
		console.log(orderSet);
		output.json({portfolioSet:portfolioSet, orderSet:orderSet})
	},

	//TODO: SKINNY CONTROLLERS -- CALL APP..
	//IF THIS IS PROFITABLE.. TURN IT ON!
	//TODO: restructure to object strcutre vs. reliying on indexing 
	portfolioSolvePDF: async function(input, output) {
		function hasUndefined(a) {return a.indexOf() !== -1;};
		function clone(a) {return JSON.parse(JSON.stringify(a));};
		function getData(limit, delta, tradingPair){
		    var defered = App.import.Q.defer();
		    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]}).limit(limit).sort('createdAt DESC').then(function(models){console.log(tradingPair);defered.resolve(models.reverse());});
		    return defered.promise;
		};

		//TODO: THIS IS IT
		//DO THIS AS A SAVER..
		async function getPdf(pairData, callback){
			//TODO: restructure to object strcutre vs. reliying on indexing 
			//pairData[0].asset1 ~ {}
			var pdfMapArray = [];
			for (x in data){
				var pairData = data[x];
				var index = pairData.map(function(obj){return obj.id}).indexOf(data.id);
				//build prediction array.
				if (index > 0){
					var predictionData = pairData.slice(0, index);
					var tsfPredictionData = [];
					//TODO: period vs prediction delta..?
					for (var z = 1; z <= index; z++){tsfPredictionData.push(analysisApp.getTSF(predictionData, z));}
					var data = await App.import.Q.all(tsfPredictionData);
					//large list of predictions.. (not pdf yet.)
					//theoretitically pdf will have +8.8 indicators +1 complexity
					//return obj here for predictions 
					//at each time at each pair
					var sortedData = data.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
					var lastPrice = pairData[pairData.length-1].price;

					//INIT PDF
					/*var pdfMap = {};
					var pdfSum = 0;
					for (var i=1000; i>=-1000; i--){pdfMap[i/1000] = 0.60811/Math.pow(i, 2);}
					pdfMap[0] = pdfMap[0.001];
					var pdfData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});
					for (x in pdfData){
						if (!isNaN(pdfData[x])){pdfMap[parseFloat(pdfData[x].toFixed(3))] += 0.25}
					}*/

					//PDF ANALYSIS HERE!
					//pdfSum+=0.60811/Math.pow(i, 2);
					//pdfMap.stats = {}
					//pdfMap.sum = pdfSum;
					//pdfMap.totalPositiveProbability = 0;
					//pdfMap.totalNegativeProbability = 0;
					//pdfMap.allPostiveProbability = true;

					//INIT PDF
					//might need to save pdfs as prediction db
					//populate oppropiately ~ normal dist around 0? liner relation..
					var pdfMap = {};
					var bbandData = [];
					for (var y = 1; y <= 30; y++) { 
						var sD =y/10;
						bbandData.push(analysisApp.getBband(pairData, 10, y));
						//for (var z = 2; z <= 20; z++) { 
						//	bbandData.push(analysisApp.getBband(pairData, z, y));
						//}
					}
					var bbandData = await App.import.Q.all(bbandData);
					var bbandIndicator = [];
					for (x in bbandData){
						//console.log(bbandData[x].upper)
						//console.log(bbandData[x].upper[bbandData[x].upper.length-1]);
						//TODO: this is lagged. it is last 'element', but behind. -~> if price is hitting the bband?? --> work with the probability fxn then
						//-->touch bottom band, will go up, tough top band, will go down
						var upperLastElement = bbandData[x].upper[bbandData[x].upper.length-1];
						var lowerLastElement = bbandData[x].lower[bbandData[x].lower.length-1];
						bbandIndicator.push({upper:upperLastElement, lower:lowerLastElement});
					}

					for (var i=1000; i>=-1000; i--){
						pdfMap[i/1000] = 0.60811/Math.pow(i, 2);
					}
					pdfMap[0] = pdfMap[0.001];

					//INIT pdfMap w bbandData!
					//w bband --> fill in area between bands.. --> layer it 
					for (x in bbandIndicator){
						//var upperBandPercent = (bbandIndicator[x].upper-lastPrice) / lastPrice;
						//var lowerBandPercent = (bbandIndicator[x].lower-lastPrice) / lastPrice;
						//console.log(upperBandPercent,lowerBandPercent);
						console.log(bbandIndicator[x].upper, pairData[pairData.length-1].percentChange, bbandIndicator[x].lower)
						for (var i=1000; i>=-1000; i--){
							if (i/1000 > bbandIndicator[x].lower && i/1000 < bbandIndicator[x].upper){
								pdfMap[i/1000] += 0.001//map better by sD %
							}
						}
					}

					//TEST
					var testData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});
					for (x in testData){pdfMap[parseFloat(testData[x].toFixed(3))] += 0.50}

					//TODO: EMA PDF,
					//var data = await analysisApp.getEMA(pairData, 10);

					//MACD PDF....~~~
					//TODO OSC PDF
					//var data = await analysisApp.getFOSC(pairData, 10);

					//MACD PDF....~~~
					//var data = await analysisApp.getMACD(pairData, 2, 5, 9);

					//CREATE DATA SETS .. 

					//PASS THEM TO TRAINING NETS 

					//TODO: CONTAINERIZE PYTHON ? KERAS ? PLAYGROUND 
					//NEED A DB OF PRETRAINED MODELS AND THE ABILITY TO CALL THEM .. 
					//NEED A DB OF DATA TO TRAIN .. 

					//SAVED NEURAL MODELS ..
					var neuralNetworkModel = await NeuralNetwork.find({delta:'300000', asset1: pairData[0].asset1, asset2:pairData[0].asset2})
					
					var synaptic = require('synaptic');
					var Neuron = synaptic.Neuron, Layer = synaptic.Layer, Network = synaptic.Network, Trainer = synaptic.Trainer, Architect = synaptic.Architect;
					var myNetwork = Network.fromJSON(neuralNetworkModel[0].networkJson);
					
					var lastestPrediction = await Prediction.find({delta:'300000', asset1: pairData[0].asset1, asset2:pairData[0].asset2}).limit(1).sort('createdAt DESC')
					console.log(lastestPrediction)
					if (lastestPrediction.length > 0){
						var model = {};
						var normalizedBidInput = (lastPrice - lastestPrediction[0].normalizeData.minBidInput)/(lastestPrediction[0].normalizeData.maxBidInput - lastestPrediction[0].normalizeData.minBidInput);
						if (isNaN(normalizedBidInput)){normalizedBidInput=0}
						var normalizedAskInput = (lastPrice - lastestPrediction[0].normalizeData.minAskInput)/(lastestPrediction[0].normalizeData.maxAskInput - lastestPrediction[0].normalizeData.minAskInput);
						if (isNaN(normalizedAskInput)){normalizedAskInput=0}
						var latestInput = [normalizedBidInput, normalizedAskInput];
						var output = myNetwork.activate(latestInput);
						var denormalizeBid = lastestPrediction[0].normalizeData.minBidInput*-1*output[0]+lastestPrediction[0].normalizeData.minBidInput+output[0]*lastestPrediction[0].normalizeData.maxBidInput;
						var denormalizeAsk = lastestPrediction[0].normalizeData.minAskInput*-1*output[1]+lastestPrediction[0].normalizeData.minAskInput+output[1]*lastestPrediction[0].normalizeData.maxAskInput;
						model.output = [denormalizeBid, denormalizeAsk];
						console.log(model.output[0], model.output[1], (lastPrice - model.output[0])/lastPrice, (lastPrice - model.output[1])/lastPrice);
					}
					pdfMapArray.push(pdfMap);
				}
			}
			callback(pdfMapArray);
		};

		var currentPortfolio = {BTC:input.query.btc}
		var limit = 20//input.query.limit;
		var delta = '7200000'//input.query.delta;
		var portfolioSet, orderSet, exchangeMap, promises, pdfArray = [];
		var sum = 0;
		tradingPairs = tradingPairs.filter(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
		tradingPairs.forEach(function(tradingPair, index){var promise = getData(limit, delta, tradingPair);promises.push(promise);});
		var data = await App.import.Q.all(promises);
		var exchangeMap = data;
		var pairData;

		for (x in exchangeMap){
			pairData = data[x]
			getPdf(pairData, function(pdfMap){pdfArray.push(pdfMap)});
		}
		for (y in exchangeMap[0]){
			var timeArray = [];
			var predictionArray = [];
			var trainArray = [];
			for (x in exchangeMap){
				timeArray.push(exchangeMap[x][y]);
				trainArray.push(exchangeMap[x][parseInt(y)+1]);//--> this is oh boi.
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
				//TOO MUCH CALC
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
							if (pdfMap[key] > 0.1){allPostiveProbability = false}
						}
					}
					//console.log(totalPositiveProbability, totalNegativeProbability, allPostiveProbability, totalPositiveProbability + totalNegativeProbability, sum);
					pdfAnalysis.push({totalPositiveProbability:totalPositiveProbability, totalNegativeProbability:totalNegativeProbability, allPostiveProbability:allPostiveProbability});
				}

				//find index of most 'attractive'
				//sort by probability score ~ for multipick 
				//if not -1
				//console.log(positiveProbabilityIndex);
				//sort by totalPositiveProbability - totalNegativeProbability
				//need to find index..
				//this may be redundant vs relativity +1 start complexity
				//var positiveProbabilityIndex = pdfAnalysis.map(function(obj){return obj.allPostiveProbability}).indexOf(true);
				
				var sortMap = pdfAnalysis.concat().sort(function(a,b) {return (a.totalPositiveProbability + a.totalNegativeProbability < b.totalPositiveProbability + b.totalNegativeProbability) ? 1 : ((b.totalPositiveProbability + b.totalNegativeProbability < a.totalPositiveProbability + a.totalNegativeProbability) ? -1 : 0);}); 
				//TODO: move away from index.
				var pickOrderIndex = [];
				//console.log(pdfAnalysis);
				for (x in sortMap){
					//totalPositiveProbability is not neccesarily unique 
					//console.log(sortMap[x].totalPositiveProbability + sortMap[x].totalNegativeProbability)
					pickOrderIndex.push(pdfAnalysis.map(function(obj){return obj.totalPositiveProbability}).indexOf(sortMap[x].totalPositiveProbability));
				}
				//TODO: add positiveProbabilityIndex to pickOrderIndex, reduce.
				//MULTIPICK -- prob best to cap from 3-7
				var cap = 3;
				var cappedPickIndex = pickOrderIndex.slice(0, cap);
				//console.log(cappedPickIndex);
				var trainSort = trainArray.concat().sort(function(a,b) {return (a.percentChange < b.percentChange) ? 1 : ((b.percentChange < a.percentChange) ? -1 : 0);}); 
				console.log('BEST PICK', trainSort[0].asset2, trainSort[0].percentChange)
				for (x in cappedPickIndex){
					if (trainArray[cappedPickIndex[x]].percentChange > 0){console.log(trainArray[cappedPickIndex[x]].asset2, trainArray[cappedPickIndex[x]].percentChange, 'GOOD PICK')}
					if (trainArray[cappedPickIndex[x]].percentChange < 0){console.log(trainArray[cappedPickIndex[x]].asset2, trainArray[cappedPickIndex[x]].percentChange, 'BAD PICK')}
				}

				//TODO: relativity? 
				var totalPositiveChange = 0;
				for (x in pdfAnalysis){totalPositiveChange += pdfAnalysis[x].totalPositiveProbability;}
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
		//console.log(portfolioSet);
		console.log(orderSet); console.log(portfolioSet[portfolioSet.length-1]);
		output.json({portfolioSet:portfolioSet, orderSet:orderSet})
	},
};
module.exports = App;