var request = require('request');
var Q = require('q');
var async = require('async');
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;
var regression = require('regression');
var fs = require('fs');

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

//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  

function assetArrayLinearCombinationEquality(){
	var exchangeMap = [];
	console.log('assetArrayLinearCombinationEquality')
	//for (x in tradingPairs){
	//	console.log(tradingPairs[x][0], tradingPairs[x][1])
	//	getPairData(tradingPairs[x][0], tradingPairs[x][1]).then(function(currencyData){
			//console.log(currencyData.last_price)
	//		exchangeMap.push({asset1:tradingPairs[x][0], asset2: tradingPairs[x][1], price: currencyData.last_price})
	//		exchangeMap.push({asset1:tradingPairs[x][1], asset2: tradingPairs[x][0], price: 1/currencyData.last_price})
	//		console.log(exchangeMap)
	//	});
	//}
	async.eachSeries(tradingPairs, function (tradingPair, nextIteration){ 
		//or instant ticker.. 
		Data.find({asset1:tradingPair[1], asset2:tradingPair[1], delta: '5000'})
		.limit(1)
		.then(function(currencyData){
			exchangeMap.push({asset1:tradingPair[0], asset2: tradingPair[1], price: currencyData.last_price})
			exchangeMap.push({asset1:tradingPair[1], asset2: tradingPair[0], price: 1/currencyData.last_price})
			process.nextTick(nextIteration);
		});
	}, 
	function(err) {
		console.log(exchangeMap)
		var currentPortfolio = {USD:75, LTC:3, ETH:1, BTC:0}
		var BTC = 0;
		for (x in exchangeMap){
			if(exchangeMap[x].asset2=='BTC'){
				if(exchangeMap[x].asset1=='ETH'){
					BTC += currentPortfolio.ETH*exchangeMap[x].price;
					console.log(BTC)
				}
				if(exchangeMap[x].asset1=='LTC'){
					BTC += currentPortfolio.LTC*exchangeMap[x].price;
					console.log(BTC)
				}
				if(exchangeMap[x].asset1=='USD'){
					BTC += currentPortfolio.USD*exchangeMap[x].price;
					console.log(BTC)
				}
			}
		}

		//console.log(BTC)

		//remember the shortest path.. this method converts to btc
		//render these as a graph? 
		//as in this is [USD, LTC, ETH, BTC] --> [BTC] --> [USD, LTC, ETH, BTC] ^^^
		//if we rep them as [], then we mult by each rate vvv

		//resursiveDecomposition(exchangeMap);

		var allocationWeight = {ETH:0.5, BTC:0.1, USD:0.2, LTC:0.2}
		exchangeMap.map(function(obj){
			for (x in Object.keys(allocationWeight)){
				if(obj.asset1 == 'BTC' && obj.asset2 == Object.keys(allocationWeight)[x]){
					console.log(Object.keys(allocationWeight)[x] + ' : ' + BTC*obj.price*allocationWeight[Object.keys(allocationWeight)[x]])
					//allocationWeight[Object.keys(allocationWeight)[x]]
				}
			}

		});

	});

	//1btc --> 
	//var btcExchange = exchangeMap.map(function(obj){
		//obj.asset1 == 'BTC'
	//})
	//1 btc = btcExchange = [.001$, 23LTC, ... ]

	//==--> [1BTC, 1750$, 23LTC]

	//==--~~--> 1BTC = [], 1LTC = [], ...
	//==> [] + [] + []
	

	//Portfolio.find() --> multiply weights 
	// --> find equalities : ) 

};

function recursiveDecomposition(dataObj){
	for (x in Object.keys(dataObj)){
		recursiveDecomposition(dataObj);
	}
};

//experimental neural net where time is a variable'
//experimental neural net where currency pair are variable arrays -- > abstract
//TODO: multiNeuralNet
function neuralNet(networkModel, asset1, asset2, delta){

	var myNetwork = Network.fromJSON(networkModel.networkJson);
	var trainer =  new Trainer(myNetwork);

	Data.find({asset1:asset1,asset2:asset2, delta:delta})
	.sort('createdAt DESC')
	.limit(30)
	.then(function(models){
		var inputArray = models.reverse().slice(0, 10);
		var outputArray = models.reverse().slice(20, 30);
		var trainingSet = [];

		//TODO: should train for percentChange. 
		//TODO: price
		var minBidInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
		var maxBidInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
		var minAskInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
		var maxAskInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
		var minPriceInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.price}));
		var maxPriceInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.price}));
		var minBidOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
		var maxBidOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
		var minAskOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
		var maxAskOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
		var minPriceOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.price}));
		var maxPriceOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.price}));

		for (x in inputArray){
			var normalizedBidInput = (inputArray.currentBid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (inputArray[x].currentAsk-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var normalizedPriceInput = (inputArray[x].price-minAskInput)/(minPriceInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var normalizedBidOutput = (outputArray[x].currentBid-minBidOutput)/(maxBidOutput-minBidOutput);
			if (isNaN(normalizedBidOutput)){normalizedBidOutput=0}
			var normalizedAskOutput = (outputArray[x].currentAsk-minAskOutput)/(maxAskOutput-minAskOutput);
			if (isNaN(normalizedAskOutput)){normalizedAskOutput=0}
			var normalizedPriceOutput = (inputArray[x].price-minAskOutput)/(minPriceOutput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			trainingSet.push({input:[normalizedBidInput, normalizedAskInput], output:[normalizedBidOutput, normalizedAskOutput], price:[normalizedPriceInput, normalizedPriceOutput]});
		}

		return {
			trainingSet:trainingSet, 
			minBidInput:minBidInput,  
			maxBidInput:maxBidInput,  
			minAskInput:minAskInput,  
			maxAskInput:maxAskInput,  
			minAskOutput:minAskOutput,  
			maxAskOutput:maxAskOutput, 
			minPriceOutput:minPriceOutput,  
			maxPriceOutput:maxPriceOutput,  
		};

	}).then(function(dataSet){

		var minBidInput = dataSet.minBidInput;
		var maxBidInput = dataSet.maxBidInput;
		var minAskInput = dataSet.minAskInput;
		var maxAskInput = dataSet.maxAskInput;
		var minBidOutput = dataSet.minBidOutput;
		var maxBidOutput = dataSet.maxBidOutput;
		var minAskOutput = dataSet.minAskOutput;
		var maxAskOutput = dataSet.maxAskOutput;
		var minPriceOutput = minPriceOutput;
		var maxPriceOutput = maxPriceOutput;

		//TODO: tuneup
		trainer.train(dataSet.trainingSet, {
			rate: .1,
			iterations: 500000,
			error: -10000,
			shuffle: false,
			log: 1000000,
			cost: Trainer.cost.MSE,
			schedule: {
				every: 5000,
				do: function(data) {
					console.log(data)
				}
			}
		});

		var networkJson = myNetwork.toJSON();

		NeuralNetwork.update({id: networkModel.id}, {network:networkJson}).then(function(){
			//console.log('HI');
		});

		//TODO: get in lockset with the time interval
		//TODO: seperate trainig from perdicting. 
		//make sure interval of delta
		//var lockStepTime = Date.parse(new Date()) - Date.parse(data[0].createdAt);
		//console.log(lockStepTime);
		//console.log(Date.parse(data[0].createdAt));
		//console.log(Date.parse(new Date()));

		Data.find({asset1:asset1,asset2:asset2,delta:delta})
		.sort('createdAt DESC')
		.limit(1)
		.then(function(data){

			//lockstep by waiting til the next interval -- #toomuch rn

			var normalizedBidInput = (data[0].currentBid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (data[0].currentAsk-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}

			var latestInput = [normalizedBidInput, normalizedAskInput];

			var output = myNetwork.activate(latestInput);

			var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
			var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
			var denormalizePrice = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;

			var predictionModel = {
				normalizeData: {minBidInput:minBidInput, maxBidInput:maxBidInput, minAskInput:minAskInput, maxAskInput:maxAskInput, minPrice:null, maxPrice:null, minPercentChange:null, maxPercentChange:null},
				assetPair: asset1+'/'+asset2,
				asset1: asset1,
				asset2: asset2,
				delta: delta,
				currentBid: data[0].currentBid,
				currentAsk: data[0].currentAsk,
				predictedBid: denormalizeBid,
				predictedAsk: denormalizeAsk,
				actualPercentChange:null,
				actualPrice:null,
				actualBid:null,
				actualAsk:null,

			};

			console.log(output, asset1, asset2, delta, data[0], predictionModel);

			Prediction.create(predictionModel).then(function(predictionModel){
				console.log(predictionModel)
				Prediction.publishCreate(predictionModel);

				//if prediction hits the lowest in some time scale....
				//place buy order

				//if prediction hits the highest in some time scale.... (and then go down)
				//find actual pair time-->

				//TODO: Update prediction in data create -- eg if there is a prediction in the previous interval. 
				setTimeout(function () {

					Data.find({asset1:asset1,asset2:asset2,delta:delta})
					.sort('createdAt DESC')
					.limit(1)
					.then(function(data){
						Prediction.update({id:predictionModel.id}, {actualPrice: data[0].price, actualBid: data[0].currentBid, actualAsk: data[0].currentAsk }).then(function(predictionModel){
							Prediction.publishUpdate(predictionModel[0].id, predictionModel[0]);
							console.log(predictionModel);
							console.log(predictionModel[0].actualBid - predictionModel[0].predictedBid)/parseFloat(predictionModel[0].actualAsk))
						});
					});

				}, delta);

			});
			
		});

	});

};

function order(){

	var assetMap = {'BTC':10, 'LTC':10, 'ETC':10, 'XMR':10};

	//make 10 trades in 10 min

	//10 BTC - a set of .... find in set equality.
	//assetArrayLinearCombinationEquality()
	//Asset.find()
	console.log(Object.keys(assetMap))
	Data.find({delta:'1000'})
	.limit(100)
	.then(function(models){

		for (x in models){
			//Object.keys(assetMap).includes(models[x].asset1);
			//console.log(Object.keys(assetMap))
			if (Object.keys(assetMap).includes(models[x].asset1)){
				//if strategy.. make trade.. -->>>>>>>>> (y)
				console.log(models[x], assetMap[models[x].asset1])
				assetMap[models[x].asset1] = assetMap[models[x].asset1] - models[x].price*10;
				assetMap[models[x].asset2] = 10;
			}
		}

		console.log(assetMap)

	});

	//Asset.find()
   
};

function analyze(){
	Prediction.find({asset1:'ETH', asset2:'BTC'})
	.sort('createdAt DESC')
	.then(function(models){
		console.log(models[0]);
	});
};

function timer(callback, delay){
    var self = this;
    var counter = 0;
    var start = new Date().getTime();
    function delayed(){
        callback(delay);
        counter ++;
        var diff = (new Date().getTime() - start) - counter * delay;
        setTimeout(delayed, delay - diff);
    }
    delayed();
    setTimeout(delayed, delay);
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

function hasUndefined(a) {
    return a.indexOf() !== -1;
};

function clone(a) {
   return JSON.parse(JSON.stringify(a));
};

function portfolioBalance(delta, limit){

	//limit to btc for now.. 
	var exchangeMap = [];
	var promises = [];

	var initPortfolio, currentPortfolio = {BTC:0.65}
	
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

		console.log(orderSet)
		console.log(currentPortfolio)

	});

};

function portfolioBalanceMulti(delta, limit, strat){

	//limit to btc for now.. 
	var exchangeMap = [];
	var promises = [];
	var currentPortfolio = {BTC:10}
	var limit = limit;
	var delta = delta;
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

	});

};

function createPrediction(limit, delta, order, precision){

	var predictions = [];
	var promises = [];
	var exchangeMap = [];

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

		var predictionArray = [];
		for (x in exchangeMap){
			var dataArray = [];
			var pairData = exchangeMap[x];
			for (x in pairData){
				dataArray.push([Date.parse(pairData[x].createdAt) - Date.parse(pairData[0].createdAt), pairData[x].percentChange]);
			}

			//14,160 -> highest r2, 4,60
			var prediction = regression.polynomial(dataArray, { order:14, precision: 160 });
			var predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta))
			//console.log(prediction.r2, predictionData[1], pairData[0].asset1, pairData[0].asset2);
			predictionArray.push({percentChange: predictionData[1], asset1:pairData[0].asset1, asset2:pairData[0].asset2});

		}

		console.log(predictionArray);


		//TODO: efficencicy redux
		/*
		for (y in exchangeMap[0]){
			var dataArray = [];
			var predictionArray = [];
			var pairData = exchangeMap[y];
			console.log(pairData)
			for (x in pairData){
				dataArray.push([Date.parse(pairData[x].createdAt) - Date.parse(pairData[0].createdAt), pairData[x].percentChange]);
			}

			var prediction = regression.polynomial(dataArray, { order: order, precision: precision });
			var predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta))
			//console.log(prediction.string);

			predictionArray.push({percentChange:predictionData, asset1:exchangeMap[y][0].asset1, asset2:exchangeMap[y][0].asset2})

			//var timeArray = [];
			//for (x in exchangeMap){
				//timeArray.push(exchangeMap[x][y]);
				//could train --> loop and push the next as prediction
				//TODO: TRAIN
				var dataArray = [];
				for (z in pairData){
					if (z<y){
						dataArray.push([Date.parse(pairData[z].createdAt) - Date.parse(pairData[0].createdAt), pairData[z].percentChange]);
					}
				}
				var prediction = regression.polynomial(dataArray, { order: order, precision: precision });
				var predictionData = -1;
				if(prediction.r2){predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta));}
				predictionArray.push(predictionData[1]);//--> this is oh boi.
				
			//}
		}
		*/

	});

	/*
	tradingPairs.forEach(function(tradingPair, index){
		dataService.predictiveModelPolynomial(tradingPair.split('/')[1], tradingPair.split('/')[0], '60000', 100, 4, 100).then(function(prediction){
			predictions.push(prediction);
			//console.log(prediction.r2)
			//prediction.points[prediction.points.length-1][0]+60000
			console.log(prediction.predict(prediction.points[prediction.points.length-1][0]+60000))
		});

	});	
	*/

};



module.exports.intervalService = function(){

	var dataService = {};
	dataService = sails.services.dataservice;

	//createPrediction(100, '60000', 4, 100);

	//TOOMUCH
	NeuralNetwork.find({delta:'60000'})
    .then(function (models) {
		for (x in models){
			//console.log(models[x]);
			neuralNet(models[x], models[x].asset1, models[x].asset2, models[x].delta);
		}
		//neuralNet(models[0], models[0].asset1, models[0].asset2, models[0].delta);
    });

    NeuralNetwork.find({delta:'300000'})
    .then(function (models) {
		for (x in models){
			//console.log(models[x]);
			neuralNet(models[x], models[x].asset1, models[x].asset2, models[x].delta);
		}
		//neuralNet(models[0], models[0].asset1, models[0].asset2, models[0].delta);
    });

     NeuralNetwork.find({delta:'1800000'})
    .then(function (models) {
		for (x in models){
			//console.log(models[x]);
			neuralNet(models[x], models[x].asset1, models[x].asset2, models[x].delta);
		}
		//neuralNet(models[0], models[0].asset1, models[0].asset2, models[0].delta);
    });

    NeuralNetwork.find({delta:'3600000'})
    .then(function (models) {
		for (x in models){
			//console.log(models[x]);
			neuralNet(models[x], models[x].asset1, models[x].asset2, models[x].delta);
		}
		//neuralNet(models[0], models[0].asset1, models[0].asset2, models[0].delta);
    });




    //TODO:check
    //combined neural net? --> def
    //var initNetwork = new Architect.Perceptron(2, 4, 3, 2);
    //NeuralNetwork.create({title:'1 min btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'5 min btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'30 min btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'1 hr btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})

    //NeuralNetwork.create({title:'1 hr market', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})

    //combined neural net experiment? --> def
    //NeuralNetwork.create({title:'experimental btc network, delta:'experimental', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})

    /*for (x in tradingPairs){

		//for loop thru data if unique pair & delta create network. . . . 
		//var initNetwork = new Architect.Perceptron(2, 4, 3, 2);
		var initNetwork = new Architect.Perceptron(2, 10, 8, 6, 4, 2);
		var experimentalNetwork = new Architect.Perceptron(3, 10, 8, 6, 4, 2);
		var trainer = new Trainer(initNetwork);
		var trainerExperimental = new Trainer(experimentalNetwork)

		var networkJson = initNetwork.toJSON();
		var experimentalNetworkJson = initNetwork.toJSON();

		NeuralNetwork.create({title:'experimental ' + tradingPairs[x], delta:'experimental', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'30 seconds ' + tradingPairs[x], delta:'30000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'1 min ' + tradingPairs[x], delta:'60000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'5 min ' + tradingPairs[x], delta:'300000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'30 min ' + tradingPairs[x], delta:'1800000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'1 hr ' + tradingPairs[x], delta:'3600000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'2 hr ' + tradingPairs[x], delta:'7200000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'4 hr ' + tradingPairs[x], delta:'21600000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'6 hr ' + tradingPairs[x], delta:'14400000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'12 hr ' + tradingPairs[x], delta:'43200000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'24 hr ' + tradingPairs[x], delta:'86400000', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:networkJson }).then(function(){console.log('HI')})

	};*/

	//portfolioBalanceMulti('30000', 100);

	/*Data.find({delta:'30000'})
	.limit(10)
	.sort('createdAt DESC')
	.then(function(models){
		for (x in models){
			(function(models, x) {
				Data.find({createdAt: {'<': models[x].createdAt}, assetPair:models[x].assetPair, delta: models[x].delta})
	            .sort('createdAt DESC')
	            .limit(1)
	            .then(function (dataModels) {
	            	var model = {};
					model.absoluteChange = models[x].price - dataModels[0].price;
	                model.percentChange = model.absoluteChange/models[x].price;
	                model.absoluteChangeChange = model.absoluteChange -  dataModels[0].absoluteChange;
	                console.log(model)
	                Data.update({id:models[x].id}, model);
	            });
			})(models, x);
		}
	})*/
	//order();
	//timer(dataService.tickerREST.bind(null, 1000), 1000);
	//timer(dataService.tickerREST, 1000);

	/*Data.find({delta:'1000'}).sort('createdAt ASC').limit(1000000)
    .exec(function (err, data) {
    	for (x in data){
    		Data.destroy({id:data[x].id}).then(function(model){console.log(model)});
    	}
    }); */

	//get some training ---

	//timer(portfolioBalanceMulti.bind(null, '30000', 128), 60000);



	//tradingPairs.forEach(function(tradingPair, index){
		//timer(dataService.predictiveModelPolynomial.bind(null, tradingPair.split('/')[1], tradingPair.split('/')[0], '60000', 100, 5, 32), 5000);//30 seconds
	//});

	//timer(dataService.predictiveModelPolynomial.bind(null, 'BTC', 'LTC', '60000', 100, 5, 32), 5000);//30 seconds
	//timer(dataService.predictiveModelFFT.bind(null, 'BTC', 'LTC', '60000', 32), 5000);//30 seconds





	//timer(dataService.tickerREST.bind(null, 1000), 1000);//second
	/*timer(dataService.tickerREST.bind(null, 1000*5), 1000*5);//5 seconds
	timer(dataService.tickerREST.bind(null, 1000*5*6), 1000*5*6);//30 seconds
	timer(dataService.tickerREST.bind(null, 1000*5*12), 1000*5*12);//60 seconds
	timer(dataService.tickerREST.bind(null, 1000*5*12*5), 1000*5*12*5);//5min
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6), 1000*5*12*5*6);//30min
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2), 1000*5*12*5*6*2);//1hr
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2), 1000*5*12*5*6*2*2);//2hr
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*2), 1000*5*12*5*6*2*2*2);//4hr
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3), 1000*5*12*5*6*2*2*3);//6hr
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2), 1000*5*12*5*6*2*2*3*2);//12hr
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2*2), 1000*5*12*5*6*2*2*3*2*2);//24hr*/

	//cull the data.. 
	//timer(dataService.cullData.bind(null, '1000', 30*60*1000), 100000);//second
	/*timer(dataService.cullData.bind(null, '5000', 3*60*60*1000), 500000);//5 seconds
	timer(dataService.cullData.bind(null, '30000', 24*60*60*1000), 2500000);//30seconds
	timer(dataService.cullData.bind(null, '60000', 7*24*60*60*1000), 5000000);//60sec
	timer(dataService.cullData.bind(null, '300000', 2*7*24*60*60*1000), 7200000);//5min
	timer(dataService.cullData.bind(null, '1800000', 2*2*7*24*60*60*1000), 7200000);//30min
	timer(dataService.cullData.bind(null, '3600000', 2*2*7*24*60*60*1000), 7200000);//1hr
	timer(dataService.cullData.bind(null, '7200000', 2*2*2*7*24*60*60*1000), 7200000);//2hr
	timer(dataService.cullData.bind(null, '14400000', 2*2*2*2*7*24*60*60*1000), 7200000);//4hr
	timer(dataService.cullData.bind(null, '21600000', 2*2*2*7*24*60*60*1000), 7200000);//6hr
	timer(dataService.cullData.bind(null, '43200000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//12hr
	timer(dataService.cullData.bind(null, '86400000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//24hr*/


	//setInterval(dataService.dataService, 14400000);
	//setInterval(ticker, 6000);
	//dataService.cullData('1000', 30*60*1000)

	//gonna have to save the trainers to a db -- aka the weighted nodes
	//meantime

	//populate Networks....---
	/*for (x in tradingPairs){
		var initNetwork = new Architect.Perceptron(2, 4, 3, 2);
		var initNetwork = new Architect.Perceptron(2, 10, 8, 6, 4, 2);
		var trainer = new Trainer(initNetwork)
		//console.log(initNetwork)
		var networkJson = initNetwork.toJSON();
		NeuralNetwork.create({title:'1 min ' + tradingPairs[x], predictionTime:'60000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'5 min ' + tradingPairs[x], predictionTime:'300000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'30 min ' + tradingPairs[x], predictionTime:'1800000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'1 hr ' + tradingPairs[x], predictionTime:'3600000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'6 hr ' + tradingPairs[x], predictionTime:'21600000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'12 hr ' + tradingPairs[x], predictionTime:'43200000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
		NeuralNetwork.create({title:'24 hr ' + tradingPairs[x], predictionTime:'86400000', assetPair: tradingPairs[x], asset1:tradingPairs[x][0], asset2:tradingPairs[x][1], networkJson:networkJson }).then(function(){console.log('HI')})
	};*/

	//assetArrayLinearCombinationEquality();

	/*NeuralNetwork.find()
    .then(function (models) {

    	//neuralNet(models[0].predictionTime/10, models[0].predictionTime, models[0],	models[0].asset1, models[0].asset2)
		for (x in models){
			//if (models[x].predictionTime==1800000){
				//console.log(models[x].predictionTime)
				setInterval(neuralNet.bind(null, models[x].predictionTime/10, models[x].predictionTime, models[x],	models[x].asset1, models[x].asset2), models[x].predictionTime);
			//}
		}
    });*/

};