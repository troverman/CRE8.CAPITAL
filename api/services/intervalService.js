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
var tulind = require('tulind');

var tradingPairs = [
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
];

function hasUndefined(a) {return a.indexOf() !== -1;};
function clone(a) {return JSON.parse(JSON.stringify(a));};

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

function assetArrayLinearCombinationEquality(currentPortfolio, allocationWeight){
	var exchangeMap = [];
	var exchangeMap1 = {};
	console.log('assetArrayLinearCombinationEquality');
	async.eachSeries(tradingPairs, function (tradingPair, nextIteration){ 
		//or instant ticker..
		//TODO: convert data into exchangeMap 
		Data.find({asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0], delta: '5000'})
		.limit(1)
		.then(function(currencyData){


			if (!exchangeMap1[tradingPair.split('/')[0]]){exchangeMap1[tradingPair.split('/')[0]]={}}
			if (!exchangeMap1[tradingPair.split('/')[1]]){exchangeMap1[tradingPair.split('/')[1]]={}}

			exchangeMap1[tradingPair.split('/')[0]][tradingPair.split('/')[1]] = currencyData[0].price;
			exchangeMap1[tradingPair.split('/')[1]][tradingPair.split('/')[0]] = 1/currencyData[0].price;
			exchangeMap1[tradingPair.split('/')[1]][tradingPair.split('/')[1]] = 1;
			exchangeMap1[tradingPair.split('/')[0]][tradingPair.split('/')[0]] = 1;




			exchangeMap.push({asset1:tradingPair.split('/')[0], asset2: tradingPair.split('/')[1], price: currencyData[0].price});
			exchangeMap.push({asset1:tradingPair.split('/')[1], asset2: tradingPair.split('/')[0], price: 1/currencyData[0].price});
			//exchangeMap.push({asset1:tradingPair.split('/')[0], asset2: tradingPair.split('/')[0], price: 1});
			//exchangeMap.push({asset1:tradingPair.split('/')[1], asset2: tradingPair.split('/')[1], price: 1});




			process.nextTick(nextIteration);
		});
	}, 
	function(err) {
		//console.log(exchangeMap);
		//console.log(exchangeMap1);
		var currentPortfolio = {USD:75, LTC:3, ETH:1, BTC:0};
		//recursiveDecomposition(exchangeMap1)
		//var currentPortfolio = currentPortfolio;
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

		//remember the shortest path.. this method converts to btc
		//render these as a graph? 
		//as in this is [USD, LTC, ETH, BTC] --> [BTC] --> [USD, LTC, ETH, BTC] ^^^
		//if we rep them as [], then we mult by each rate vvv
		//resursiveDecomposition(exchangeMap);

		var allocationWeight = {ETH:0.5, BTC:0.1, USD:0.2, LTC:0.2}
		//var allocationWeight = allocationWeight;

		//TODO!
		//TURN REWEIGHTING INTO ORDERS
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
		console.log(dataObj[Object.keys(dataObj)[x]])
		recursiveDecomposition(dataObj[Object.keys(dataObj)[x]]);
	}
};

//experimental neural net where time is a variable'
//experimental neural net where currency pair are variable arrays -- > abstract
//TODO: multiNeuralNet
//TODO: REDO
//TODO: DEEP
//TODO: TENSOR FLOW
function neuralNet(networkModel, asset1, asset2, delta, limit, agnostic){

	console.log(agnostic);

	var myNetwork = Network.fromJSON(networkModel.networkJson);
	var trainer =  new Trainer(myNetwork);
	Data.find({asset1:asset1, asset2:asset2, delta:delta})
	.sort('createdAt DESC')
	.limit(limit)
	.then(function(models){

		if (models.length >= 2){//limit){

			//facilitate more granularity 
			//the train index can be like delta something... using grandular data to larger shift
			//delta, aka predictedDelta ~ 10x dataDelta
			//var inputArray = models.reverse().slice(0, 10);
			//var outputArray = models.reverse().slice(20, 30);

			//remove first element
			var inputArray = models.reverse().slice(1);
			//remove last element
			var outputArray = models.reverse().slice(0, -1);

			var trainingSet = [];

			//TODO: should train for percentChange. 
			//TODO: price
			var minBidInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var maxBidInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var minAskInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			var maxAskInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			
			var minPriceInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.price}));
			var maxPriceInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.price}));
			var minPercentChangeInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));

			var minBidOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var maxBidOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var minAskOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			var maxAskOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			
			var minPriceOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.price}));
			var maxPriceOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.price}));
			var minPercentChangeOutput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeOutput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));


			for (x in inputArray){
				var normalizedBidInput = (inputArray[x].currentBid-minBidInput)/(maxBidInput-minBidInput);
				if (isNaN(normalizedBidInput)){normalizedBidInput=0}
				var normalizedAskInput = (inputArray[x].currentAsk-minAskInput)/(maxAskInput-minAskInput);
				if (isNaN(normalizedAskInput)){normalizedAskInput=0}
				var normalizedPriceInput = (inputArray[x].price-minPriceInput)/(maxPriceInput-minPriceInput);
				if (isNaN(normalizedPriceInput)){normalizedPriceInput=0}
				var normalizedPercentChangeInput = (inputArray[x].percentChange-minPercentChangeInput)/(maxPercentChangeInput-minPercentChangeInput);
				if (isNaN(normalizedPercentChangeInput)){normalizedPercentChangeInput=0}

				var normalizedBidOutput = (outputArray[x].currentBid-minBidOutput)/(maxBidOutput-minBidOutput);
				if (isNaN(normalizedBidOutput)){normalizedBidOutput=0}
				var normalizedAskOutput = (outputArray[x].currentAsk-minAskOutput)/(maxAskOutput-minAskOutput);
				if (isNaN(normalizedAskOutput)){normalizedAskOutput=0}
				var normalizedPriceOutput = (inputArray[x].price-minPriceOutput)/(maxPriceOutput-minPriceOutput);
				if (isNaN(normalizedPriceOutput)){normalizedPriceOutput=0}
				var normalizedPercentChangeOutput = (inputArray[x].percentChange-minPercentChangeOutput)/(maxPercentChangeOutput-minPercentChangeOutput);
				if (isNaN(normalizedPercentChangeOutput)){normalizedPercentChangeOutput=0}

				//NORMALIZED TIME
				if (agnostic){
					var normalizedDelta = 1/parseFloat(delta);
					trainingSet.push({input:[normalizedBidInput, normalizedAskInput, normalizedDelta], output:[normalizedBidOutput, normalizedAskOutput]});
					//trainingSet.push({input:[normalizedBidInput, normalizedPriceInput, normalizedAskInput, normalizedPercentChangeInput, normalizedDelta], output:[normalizedBidOutput, normalizedAskOutput, normalizedPriceOutput, normalizedPercentChangeOutput]});
				}
				else{
					trainingSet.push({input:[normalizedBidInput, normalizedAskInput], output:[normalizedBidOutput, normalizedAskOutput]});
				}
				//trainingSet.push({input:[normalizedBidInput, normalizedAskInput], output:[normalizedBidOutput, normalizedAskOutput]});
				//trainingSet.push({input:[normalizedBidInput, normalizedPriceInput, normalizedAskInput, normalizedPercentChangeInput], output:[normalizedBidOutput, normalizedAskOutput, normalizedPriceOutput, normalizedPercentChangeOutput]});
			}

			return {
				trainingSet:trainingSet,

				minBidInput:minBidInput,  
				maxBidInput:maxBidInput,  
				minAskInput:minAskInput,  
				maxAskInput:maxAskInput,
				minPriceInput:minPriceInput,  
				maxPriceInput:maxPriceInput,  
				minPercentChangeInput:minPercentChangeInput,  
				maxPercentChangeInput:maxPercentChangeInput,

				minBidInput:minBidOutput,  
				maxBidInput:maxBidOutput, 
				minAskOutput:minAskOutput,  
				maxAskOutput:maxAskOutput, 
				minPriceOutput:minPriceOutput,  
				maxPriceOutput:maxPriceOutput,  
				minPercentChangeOutput:minPercentChangeOutput,  
				maxPercentChangeOutput:maxPercentChangeOutput,
			};
		}

	}).then(function(dataSet){

		if (dataSet){

			var minBidInput = dataSet.minBidInput;
			var maxBidInput = dataSet.maxBidInput;
			var minAskInput = dataSet.minAskInput;
			var maxAskInput = dataSet.maxAskInput;
			var minPriceInput = dataSet.minPriceInput;
			var maxPriceInput = dataSet.maxPriceInput;
			var minPercentChangeInput = dataSet.minPercentChangeInput;
			var maxPercentChangeInput = dataSet.maxPercentChangeInput;

			var minBidOutput = dataSet.minBidOutput;
			var maxBidOutput = dataSet.maxBidOutput;
			var minAskOutput = dataSet.minAskOutput;
			var maxAskOutput = dataSet.maxAskOutput;
			var minPriceOutput = dataSet.minPriceOutput;
			var maxPriceOutput = dataSet.maxPriceOutput;
			var minPercentChangeOutput = dataSet.minPercentChangeOutput;
			var maxPercentChangeOutput = dataSet.maxPercentChangeOutput;

			//TODO: tuneup
			trainer.train(dataSet.trainingSet, {
				rate: .25,
				iterations: 20000,
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

				//TODO
				var normalizedPriceInput = (data[0].price-minAskInput)/(maxPriceInput-minPriceInput);
				if (isNaN(normalizedPriceInput)){normalizedPriceInput=0}
				var normalizedPercentChangeInput = (data[0].percentChange-minPercentChangeInput)/(maxPercentChangeInput-minPercentChangeInput);
				if (isNaN(normalizedPercentChangeInput)){normalizedPercentChangeInput=0}

				//if (normalizedBidInput==0){normalizedBidInput=0.00001}
				//if (normalizedAskInput==0){normalizedAskInput=0.00001}
				var latestInput = [];
				if (agnostic){
					latestInput = [normalizedBidInput, normalizedAskInput, 1/parseFloat(delta)];
				}
				else{
					latestInput = [normalizedBidInput, normalizedAskInput];
				}

				console.log(latestInput)
				//normalizedBidInput, normalizedPriceInput, normalizedAskInput, normalizedPercentChangeInput]

				var output = myNetwork.activate(latestInput);

				var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
				var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
				console.log(output)

				var denormalizePrice = minPriceInput*-1*output[1]+minPriceInput+output[1]*maxPriceInput;
				var denormalizePercentChange = minPercentChangeInput*-1*output[1]+minPercentChangeInput+output[1]*maxPercentChangeInput;

				var predictionModel = {
					normalizeData: {minBidInput:minBidInput, maxBidInput:maxBidInput, minAskInput:minAskInput, maxAskInput:maxAskInput, minPriceInput:null, maxPriceInput:null, minPercentChangeInput:null, maxPercentChangeInput:null},
					assetPair: asset1+'/'+asset2,
					asset1: asset1,
					asset2: asset2,
					delta: delta,
					currentBid: data[0].currentBid,
					currentAsk: data[0].currentAsk,
					currentPrice: data[0].price,
					currentPercentChange: data[0].percentChange,
					predictedBid: denormalizeBid,
					predictedAsk: denormalizeAsk,
					predictedPrice: null,
					predictedPercentChange: null,
					actualPercentChange:null,
					actualPrice:null,
					actualBid:null,
					actualAsk:null,
					timeStamp: data[0].createdAt,
				};

				//console.log(output, asset1, asset2, delta, data[0], predictionModel);

				Prediction.create(predictionModel).then(function(predictionModel){
					console.log(predictionModel)
					Prediction.publishCreate(predictionModel);

					//if prediction hits the lowest in some time scale....
					//place buy order

					//if prediction hits the highest in some time scale.... (and then go down)
					//find actual pair time-->

					//TODO: Update prediction in data create -- eg if there is a prediction in the previous interval. 
					setTimeout(function () {
						//find created after
						Data.find({asset1:asset1,asset2:asset2,delta:delta})//, createdAt: {'>': Date.parse(data[0].createdAt)}})
						.sort('createdAt DESC')
						.limit(1)
						.then(function(data){
							Prediction.update({id:predictionModel.id}, {actualPrice: data[0].price, actualBid: data[0].currentBid, actualAsk: data[0].currentAsk }).then(function(predictionModel){
								Prediction.publishUpdate(predictionModel[0].id, predictionModel[0]);
								console.log(predictionModel);
								console.log((predictionModel[0].actualBid - predictionModel[0].predictedBid)/parseFloat(predictionModel[0].actualAsk))
							});
						});

					}, delta*3/2);

				});		
			});

		}

	});
};

//TODO: THINK
//MARKET TO MARKET TOTAL -- INNACURATE
//NEED HUGE MEMORY
function neuralNetComplex(networkModel, asset1, asset2, delta, limit){

	var myNetwork = Network.fromJSON(networkModel.networkJson);
	var trainer =  new Trainer(myNetwork);

	var promises = [];
	tradingPairs = tradingPairs.filter(function(obj){
        if (obj.split('/')[1]=='BTC'){return obj}
    });
	tradingPairs.forEach(function(tradingPair, index){
	    var promise = getData(limit, delta, tradingPair);
	    promises.push(promise);
	});
	Q.all(promises)
	.then(function(data){

		var trainingSet = [];

		for (y in data){

			var inputArray = data[y].reverse().slice(1);
			var outputArray = data[y].reverse().slice(0, -1);

			//INPUT
			var minBidInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var maxBidInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var minAskInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			var maxAskInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			var minPriceInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.price}));
			var maxPriceInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.price}));
			var minPercentChangeInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));

			//OUTPUT
			var minBidOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var maxBidOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var minAskOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			var maxAskOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			var minPriceOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.price}));
			var maxPriceOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.price}));
			var minPercentChangeOutput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeOutput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));

			var pairTrainingSet = [];

			for (x in inputArray){
				var normalizedBidInput = (inputArray[x].currentBid-minBidInput)/(maxBidInput-minBidInput);
				if (isNaN(normalizedBidInput)){normalizedBidInput=0}
				var normalizedAskInput = (inputArray[x].currentAsk-minAskInput)/(maxAskInput-minAskInput);
				if (isNaN(normalizedAskInput)){normalizedAskInput=0}
				var normalizedPriceInput = (inputArray[x].price-minPriceInput)/(maxPriceInput-minPriceInput);
				if (isNaN(normalizedPriceInput)){normalizedPriceInput=0}
				var normalizedPercentChangeInput = (inputArray[x].percentChange-minPercentChangeInput)/(maxPercentChangeInput-minPercentChangeInput);
				if (isNaN(normalizedPercentChangeInput)){normalizedPercentChangeInput=0}

				var normalizedBidOutput = (outputArray[x].currentBid-minBidOutput)/(maxBidOutput-minBidOutput);
				if (isNaN(normalizedBidOutput)){normalizedBidOutput=0}
				var normalizedAskOutput = (outputArray[x].currentAsk-minAskOutput)/(maxAskOutput-minAskOutput);
				if (isNaN(normalizedAskOutput)){normalizedAskOutput=0}
				var normalizedPriceOutput = (inputArray[x].price-minPriceOutput)/(maxPriceOutput-minPriceOutput);
				if (isNaN(normalizedPriceOutput)){normalizedPriceOutput=0}
				var normalizedPercentChangeOutput = (inputArray[x].percentChange-minPercentChangeOutput)/(maxPercentChangeOutput-minPercentChangeOutput);
				if (isNaN(normalizedPercentChangeOutput)){normalizedPercentChangeOutput=0}

				pairTrainingSet.push({
					input:[normalizedBidInput, normalizedAskInput, normalizedPriceInput, normalizedPercentChangeInput], 
					output:[normalizedBidOutput, normalizedAskOutput, normalizedPriceOutput, normalizedPercentChangeOutput]
				});

			}
			//console.log(pairTrainingSet);
			//pairTrainingSet-->[10]
			trainingSet.push(pairTrainingSet);
			//trainingSet-->[67][10]

		}
		
		//Meh..
		//reduce this 
		var flatSet = [];
		for (y in trainingSet[0]){
			//trainingSet[x]: [10] [{output:1,input:1},...] --> 
			var tempOutput = [];
			var tempInput = [];
			for (x in trainingSet){
				tempOutput.push(trainingSet[x][y].output);
				tempInput.push(trainingSet[x][y].input);
			}
			//flatSet.push({output:tempOutput, input:tempInput});
			var flatInput = [].concat.apply([], tempOutput);
			var flatOutput = [].concat.apply([], tempInput);
			flatSet.push({output:flatOutput, input:flatInput});
		}

		return flatSet;

	})
	.then(function(trainingSet){

		trainer.train(trainingSet, {
			rate: .25,
			iterations: 20000,
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

	});
};

//MARKET TO PAIR DIMENSIONALITY REDUCTION
//MARKET + INDICATORS DIMENSIONALITY REDUCTION
//MARKET + INDICATORS + DELTA GAP DIMENSIONALITY REDUCTION

function neuralNetMarketToPair(networkModel, asset1, asset2, delta, limit){};


//OLD
function order(){

	var assetMap = {'BTC':10, 'LTC':10, 'ETC':10, 'XMR':10};

	//make 10 trades in 10 min

	//10 BTC - a set of .... find in set equality.
	//assetArrayLinearCombinationEquality()
	//Asset.find()
	console.log(Object.keys(assetMap))
	Data.find({delta:'5000'})
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

function createPrediction(limit, delta){
	console.log(limit, delta)
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

			//var periodArray = [3,5,10,20,40,80,160,320,640,1000];
			var periodArray = [3,5,10,20,40,80];
			//var periodArray = [];
			//for (var i=-0; i < limit; i++){
			//	periodArray.push(i);
			//}

			var tsfPredictionData = [];

			//may have to structure as promises..

			//TODO: use tsf occlicator to find error with tsf --> build prob / confidence score / range
			for (y in periodArray){
			//for (y = 0; y <= 1000; y+=5) { 
				tsfPredictionData.push(dataService.getTSF(pairData, periodArray[y]));//get last element.. 
			}
			(function(pairData){
				Q.all(tsfPredictionData)
				.then(function(data){
					//console.log(data);
					//gotta fire at the delta to lock in the price.. -- perhaps fire a slights cheaper.. eg market maker.... --> market make at a guess of high. ~> take if over estimate --> dont wanna under!  

					var sortedData = data.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
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

					if (changeHigh > 0 && changeLow > 0){
						console.log('PICK', pairData[0].asset1, pairData[0].asset2);
						var orderModel = {};
						orderModel.assetPair = pairData[pairData.length-1].assetPair;
						orderModel.asset1 = pairData[pairData.length-1].asset1;
						orderModel.asset2 = pairData[pairData.length-1].asset2;
						orderModel.price = pairData[pairData.length-1].price;
						orderModel.delta = pairData[pairData.length-1].delta;
						orderModel.type = 'BUY';
						orderModel.amount = 1;
						Order.create(orderModel);
						console.log(orderModel);
					}
					
					//console.log(data)
					//TODO.. heatmap, in data.. have period?
					//need to translate predictions into PDF
					//FINAL -- map %change to %
					//+-100 granularity
					//range of 2 --> .001 gran --> 2000 descrete data pts 
					//for (x in data){
					//	if (data[x]){console.log(data[x]);}
					//}

					//INIT PDF
					//might need to save pdfs as prediction db
					//populate oppropiately ~ normal dist around 0? liner relation..
					var pdfMap = {};
					for (var i=-1000; i <=1000; i++){
						//all values sum to 1
						//pdfMap[i/1000] = 2.4455/Math.abs(i);
						pdfMap[i/1000] = 0.60811/Math.pow(i, 2);

					}

					//TEST
					var testData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});
					//console.log(sortedData, testData);

					for (x in testData){
						//console.log(testData[x].toFixed(3))
						pdfMap[parseFloat(testData[x].toFixed(3))] += 0.1
						//pdfMap[parseFloat(testData[x].toFixed(3)+0.001)] += 0.05
						//pdfMap[parseFloat(testData[x].toFixed(3)-0.001)] += 0.05
					}

					//console.log(pdfMap);

				});
			})(pairData)

			//for (z in tsfPerdictionData){
			//	console.log(tsfPerdictionData[z].state,tsfPerdictionData[z].value);
			//	console.log(tsfPerdictionData[z]);
			//}

			//console.log('length', tsfPerdictionData);

			//get the last element in each period prediction..
			//var predictionSet = [];
			//for (z in tsfPerdictionData){
			//	predictionSet.push(tsfPerdictionData[z][pairData.length-1]);
			//	console.log('predictionSet', predictionSet);
			//}

			//console.log(pairData[0].asset1, pairData[0].asset2, predictionSet);
			//becomes the set for the pair data --> then becomes the set for each pair when selection predictions etc (the potiental future price)

			//var sdArray = [0.1,0.25,0.75,1,1.5,2,3];
			//Bbands do variance.. -- cinfidence in variance.. --> if volitility is x ~ sd - pdf weight

			//14,160 -> highest r2, 4,60
			//var prediction = regression.polynomial(dataArray, { order:14, precision:160 });
			//var predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta));

			//console.log(prediction.r2, predictionData[1], pairData[0].asset1, pairData[0].asset2);
			//predictionArray.push({percentChange: predictionData[1], asset1:pairData[0].asset1, asset2:pairData[0].asset2, });


			//TODO: encoperate set of parameters, and indicators to form a PDF on the price
			//for (x in pairData){
			//	dataArray.push([Date.parse(pairData[x].createdAt) - Date.parse(pairData[0].createdAt), pairData[x].percentChange]);
			//}
			//var change = pairData.map(function(obj){return obj.percentChange});

			/*
			tulind.indicators.bbands.indicator([change], [5,2], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.sma.indicator([change], [3], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.dema.indicator([change], [3], function(err, results) {
				console.log(results);
			});
			*/
			//tulind.indicators.ema.indicator([change], [3], function(err, results) {
			//	console.log(results[0]);
			//}); 
			//tulind.indicators.adx.indicator([change], [3], function(err, results) {
			//	console.log(results);
			//}); 
			/*tulind.indicators.stoch.indicator([change], [3], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.kama.indicator([change], [3], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.mass.indicator([change], [3], function(err, results) {
				console.log(results);
			});
			tulind.indicators.tsf.indicator([change], [3], function(err, results) {
				console.log(results);
			});
			tulind.indicators.macd.indicator([change], [3], function(err, results) {
				console.log(results);
			});*/
			//tulind.indicators.rci.indicator([change], [3], function(err, results) {
			//	console.log(results);
			//});
			//tulind.indicators.vwma.indicator([change], [3], function(err, results) {
			//	console.log(results);
			//});
			//boilinger band
			//var dataModel = {}
			//datamodel.polynomial = prediction;
			//datamodel.bbands = {};
			//datamodel.sma = {};

		}

		//console.log(predictionArray);

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
				//this is training error? --> get confidence in pick
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

//TODO:DO THIS WHEN I WANT $
//MB I should build the pdf solve 1st. . . . .. . . . . . .
//wanna start the $
//nap time
function createPredictionSolve(){
	var exchangeMap = data;
	var predictionArray = [];
	for (x in exchangeMap){
		var dataArray = [];
		var pairData = exchangeMap[x];
		var periodArray = [3,5,10,20,40,80];
		var tsfPredictionData = [];
		for (y in periodArray){
			tsfPredictionData.push(dataService.getTSF(pairData, periodArray[y]));
		}
		(function(pairData){
			Q.all(tsfPredictionData)
			.then(function(data){
				var sortedData = data.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
				var low = sortedData[sortedData.length-1];
				var high = sortedData[0];
				var range = high - low;
				var lastPrice = pairData[pairData.length-1].price;
				var changeHigh = (high - lastPrice)/high;
				var changeLow = (low - lastPrice)/low;
				if (changeHigh > 0 && changeLow > 0){
					
				}
			});
		})(pairData)
	}
};

function getCurrentPrediction(delta, asset1, asset2) {
	var delta = delta;
	var asset1 = asset1;
	var asset2 = asset2;
	NeuralNetwork.find({delta:delta, asset1: asset1, asset2:asset2})
	.then(function(neuralNetworkModel) {
		var myNetwork = Network.fromJSON(neuralNetworkModel[0].networkJson);

		//console.log(myNetwork)
		//get current price to denormalize

		Data.find({asset1:asset1, asset2:asset2})
		.limit(1)
		.sort('createdAt DESC')
		.then(function(data){

			var model = {};
			model.data = data[0];

			Prediction
			.find({delta:delta, asset1: asset1, asset2: asset2})
			.limit(1)
			.sort('createdAt DESC')
			.then(function(lastestPrediction){
				if (lastestPrediction.length > 0){
					//console.log(lastestPrediction[0]);
					var normalizedBidInput = (model.data.currentBid - lastestPrediction[0].normalizeData.minBidInput)/(lastestPrediction[0].normalizeData.maxBidInput - lastestPrediction[0].normalizeData.minBidInput);
					if (isNaN(normalizedBidInput)){normalizedBidInput=0}
					var normalizedAskInput = (model.data.currentAsk - lastestPrediction[0].normalizeData.minAskInput)/(lastestPrediction[0].normalizeData.maxAskInput - lastestPrediction[0].normalizeData.minAskInput);
					if (isNaN(normalizedAskInput)){normalizedAskInput=0}
					var latestInput = [normalizedBidInput, normalizedAskInput];
					var output = myNetwork.activate(latestInput);
					var denormalizeBid = lastestPrediction[0].normalizeData.minBidInput*-1*output[0]+lastestPrediction[0].normalizeData.minBidInput+output[0]*lastestPrediction[0].normalizeData.maxBidInput;
					var denormalizeAsk = lastestPrediction[0].normalizeData.minAskInput*-1*output[1]+lastestPrediction[0].normalizeData.minAskInput+output[1]*lastestPrediction[0].normalizeData.maxAskInput;
					model.output = [denormalizeBid, denormalizeAsk];

					//TODO - catalog moving average of error in perdictions to generate confidence score for picks 
					//Probability Density Functions ~ as a prediction?? 

					console.log(model.output[0], model.output[1], asset1, asset2, delta, model.data.currentBid, model.data.currentAsk, (model.data.currentAsk - model.output[0])/model.data.currentAsk, (model.data.currentAsk - model.output[1])/model.data.currentAsk, model.data.percentChange, model.data.percentChange -  (model.data.currentAsk - model.output[1])/model.data.currentAsk);

				}
			});
		});

	});
};

function initPortfolio(user){

	//1 btc and 1btc of all assets
	var promises = [];
	tradingPairs = tradingPairs.filter(function(obj){
        if (obj.split('/')[1]=='BTC'){return obj}
    });

	tradingPairs.forEach(function(tradingPair, index){
	    var promise = getData(1, '5000', tradingPair);
	    promises.push(promise);
	});

	Q.all(promises)
	.then(function(data){

		Asset.find({user:user}).then(function(model){
			for (x in data){
				var assetModel = {
					user: user,
					symbol: data[x][0].asset2,
					amount: 1000//75/data[x][0].price,
					//conversionArray: data,
					//wallet
					//secret?
				};
				var index = model.map(function(obj){return obj.symbol}).indexOf(assetModel.symbol)
				//if (index == -1){
				//  console.log(assetModel);
				//	Asset.create(assetModel).then(function(model){
				//		console.log(model)
				//	});
				//}
				//Asset.create(assetModel).then(function(model){
				//	console.log(model)
				//});
				//if (assetModel.symbol=='ETH'){
				Asset.update({user:user, symbol:assetModel.symbol}, assetModel).then(function(model){
					console.log(model)
				});
				//}
			}
		});

	});


	//Asset.update({user: user, symbol:'BTC'}, {amount:100}).then(function(model){console.log(model)});
	//Asset.update({user: user, symbol:'ETH'}, {amount:1000}).then(function(model){console.log(model)});
	//Asset.update({user: user, symbol:'XMR'}, {amount:1500}).then(function(model){console.log(model)});

	//Asset.update({user: user, symbol:'BTC'}, {amount:100}).then(function(model){console.log(model)});
	//Asset.update({user: user, symbol:'USDT'}, {amount:0}).then(function(model){console.log(model)});
	//Asset.create({user:user, symbol:'USDT',amount:1111111}).then(function(model){})
};


module.exports.intervalService = function(){

	//initPortfolio('591a95d935ab691100c584ce');
	//dataService.returnBalances('5a83602d5ac735000488e8f7');
	//Asset.find({user:'591a95d935ab691100c584ce'}).then(function(model){
	//	for (x in model){
	//		Asset.update({user: '591a95d935ab691100c584ce', symbol:model[x].symbol}, {amountOnOrders:0}).then(function(model){console.log(model)});
	//	}
	//});

	//assetArrayLinearCombinationEquality();
	//Asset.find({user:'5a83602d5ac735000488e8f7'}).then(function(model){
	//	console.log(model)
	//});

	//tradingPairs.forEach(function(tradingPair, index){
	//	getCurrentPrediction('300000', tradingPair.split('/')[1], tradingPair.split('/')[0]);
	//});

	//tradingPairs.forEach(function(tradingPair, index){
		//timer(dataService.predictiveModelPolynomial.bind(null, tradingPair.split('/')[1], tradingPair.split('/')[0], '60000', 100, 5, 32), 5000);//30 seconds
	//});


	//createPrediction(100, '1800000');
	//portfolioBalanceMulti('30000', 100);
	//get some training ---
	//timer(portfolioBalanceMulti.bind(null, '30000', 128), 60000);
	//timer(dataService.predictiveModelPolynomial.bind(null, 'BTC', 'LTC', '60000', 100, 5, 32), 5000);//30 seconds
	//timer(dataService.predictiveModelFFT.bind(null, 'BTC', 'LTC', '60000', 32), 5000);//30 seconds

	//assetArrayLinearCombinationEquality();
	//order();

	//EXPERIMENTAL NETWORK!
	//var initNetwork = new Architect.Perceptron(2, 10, 8, 6, 4, 2);
	//var experimentalNetwork = new Architect.Perceptron(3, 10, 8, 6, 4, 2);
	//var experimentalNetworkPdf = new Architect.Perceptron(500, 750, 1000, 1250, 1500, 1250, 1000, 750, 500, 250, 150, 100, 50, 25, 15, 10, 8, 5, 3, 100);

	//console.log(tradingPairs.length)--> 97 * 2 -->bid ask + delta == 195
	//total market experiment.. -->
	//USE THE WHOLE MARKET TO PREDICT ONE PAIR
	//USE THE WHOLE MARKET TO PREDICT THE WHOLE MARKET
	//var experimentalNetwork = new Architect.Perceptron(195, 390, 500, 390, 195);
	//var experimentalNetwork = new Architect.Perceptron(195, 390, 500, 650, 450, 400, 350, 333, 500, 250, 225, 210, 205, 210, 200, 205, 195);
	//var experimentalNetworkJson = experimentalNetwork.toJSON();
	//var neuralNetworkModel = {
	//	title:'Experimental time agnostic total market network', 
	//	delta:'Variable', 
	//	assetPair: 'Total Market', 
	//	asset1: 'Total Market', 
	//	asset2: 'Total Market', 
	//	networkJson:experimentalNetworkJson 
	//};
	//console.log(neuralNetworkModel);

	//268, 268.. STACK OVERFLOW
	/*
	var experimentalNetwork = new Architect.Perceptron(268, 536, 357, 313, 300, 295, 280, 268);
	var experimentalNetworkJson = experimentalNetwork.toJSON();
	var neuralNetworkModel = {
		title: 'Experimental total market network: 2hr', 
		delta: '7200000', 
		assetPair: 'Total Market', 
		asset1: 'Total Market', 
		asset2: 'Total Market', 
		networkJson: experimentalNetworkJson 
	};
	neuralNetComplex(neuralNetworkModel, 'Total Market', 'Total Market', '7200000', 10);
	//NeuralNetwork.create(neuralNetworkModel).then(function(){console.log('HI')})
	*/

	//NETWORKTRAINER
	/*NeuralNetwork.find({asset2:'LTC'})
    .then(function (models) {
    	NeuralNetwork.find({delta:'Agnostic', asset2:'LTC'})
    	.then(function (agnosticModels) {
			for (x in models){
				if (models[x].delta == '300000' || models[x].delta == '1800000' || models[x].delta == '3600000'){
					console.log(models[x].asset2)
					timer(neuralNet.bind(null, models[x], models[x].asset1, models[x].asset2, models[x].delta, 10, false), parseInt(models[x].delta));
					for (y in agnosticModels){
						timer(neuralNet.bind(null, agnosticModels[y], agnosticModels[y].asset1, agnosticModels[y].asset2, models[x].delta, 10, true), parseInt(models[x].delta));
					}
				}
			}
		});
    });*/
	

	/*
	var timeAgnosticNetwork = new Architect.Perceptron(3, 10, 8, 6, 4, 2);
	var timeAgnosticNetworkJson = timeAgnosticNetwork.toJSON();

	//var timeAgnosticNetwork = new Architect.Perceptron(3, 10, 20, 30, 50, 88, 44, 21, 13, 7, 5, 2);

	for (x in tradingPairs){
		NeuralNetwork.create({title:'Agnostic' + tradingPairs[x], delta:'Agnostic', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:timeAgnosticNetworkJson }).then(function(){console.log('HI')})
	}
	*/


	
	//CCUTL
	//POPULATE DATA
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
	timer(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2*2), 1000*5*12*5*6*2*2*3*2*2);//24hr

	//UPDATE REAL BALANCES.. UPDATE THIS-- REFACTOR.. MEH
	timer(dataService.returnBalances.bind(null, '5a83602d5ac735000488e8f7'), 1000*5*6);//30 seconds*/
	
	//CCUTL2
	//REALTIME TRADES & ORDERBOOK
	//dataService.ticker();

	//CULL DATA
	//timer(dataService.cullData.bind(null, '1000', 30*60*1000), 100000);//second
	/*timer(dataService.cullData.bind(null, '5000', 3*60*60*1000), 100000);//5 seconds
	timer(dataService.cullData.bind(null, '30000', 24*60*60*1000), 100000);//30seconds
	timer(dataService.cullData.bind(null, '60000', 7*24*60*60*1000), 100000);//60sec
	timer(dataService.cullData.bind(null, '300000', 2*7*24*60*60*1000), 100000);//5min
	timer(dataService.cullData.bind(null, '1800000', 2*2*7*24*60*60*1000), 7200000);//30min
	timer(dataService.cullData.bind(null, '3600000', 2*2*7*24*60*60*1000), 7200000);//1hr
	timer(dataService.cullData.bind(null, '7200000', 2*2*2*7*24*60*60*1000), 7200000);//2hr
	timer(dataService.cullData.bind(null, '14400000', 2*2*2*2*7*24*60*60*1000), 7200000);//4hr
	timer(dataService.cullData.bind(null, '21600000', 2*2*2*7*24*60*60*1000), 7200000);//6hr
	timer(dataService.cullData.bind(null, '43200000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//12hr
	timer(dataService.cullData.bind(null, '86400000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//24hr*/

	//timer(dataService.cullTrade.bind(null, 86400000), 100000);//keep for one day




	//NEURALNETWORKS
	//POPULATE NETWORKS
    //TODO:check
    //combined neural net? --> def
    //var initNetwork = new Architect.Perceptron(2, 4, 3, 2);
    //NeuralNetwork.create({title:'1 min btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'5 min btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'30 min btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'1 hr btc network', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'1 hr market', delta:'60000', networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})

    //combined neural net experiment? --> def
    //NeuralNetwork.create({title:'experimental time agnostic total market network, delta:'experimental', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
    //NeuralNetwork.create({title:'experimental time agnostic total btc network, delta:'experimental', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:experimentalNetworkJson }).then(function(){console.log('HI')})
  
    /*
    for (x in tradingPairs){
		//var initNetwork = new Architect.Perceptron(2, 4, 3, 2);
		var initNetwork = new Architect.Perceptron(2, 10, 8, 6, 4, 2);
		var experimentalNetwork = new Architect.Perceptron(3, 10, 8, 6, 4, 2);
		//lol var experimentalNetwork = new Architect.Perceptron(500, 750, 1000, 1250, 1500, 1250, 1000, 750, 500, 250, 150, 100, 50, 25, 15, 10, 8, 5, 3, 100);

		//pdf nerural net has 2k output
		//train by solving top 3 (n) pick assets at time delta.. 
		//need to figure the ideal output
		//general idea pdf .. -- based on known picks and reverse solving of attractive pdf
		//aka these are the known best picks -- this is the known attractive fxn -- what then are the pdf(s)
		//lol var experimentalNetwork = new Architect.Perceptron(500, 750, 1000, 1250, 1500, 1250, 1000, 750, 500, 250, 150, 100, 50, 25, 15, 10, 8, 5, 3, 100);

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
	}
	*/



};