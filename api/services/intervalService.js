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
	['BTC','USD'],
	['ETH','USD'],
	['ETH','BTC'],	
	['ETC','USD'],
	['ETC','BTC'],
	['ZEC','USD'],	
	['ZEC','BTC'],
	['XMR','USD'],
	['XMR','BTC'],
	['LTC','USD'],
	['LTC','BTC'],
	/*['DASH','USD'],
	['DASH','BTC'],
	['RRT','USD'],
	['RRT','BTC'],
	['BCC','USD'],
	['BCC','BTC'],
	['BCU','USD'],
	['BCU','BTC'],*/
];


var tradingPairsNew = [
    'XRP/BTC',
    'ETH/BTC',
    'BTC/USDT',
    'LTC/BTC',
    'BCH/BTC',
    'XRP/USDT',
    'XLM/BTC',
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
		getPairData(tradingPair[0], tradingPair[1]).then(function(currencyData){
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



function ticker(){
	var url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json"
	//https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fd%2Fquotes.csv%3Fe%3D.csv%26f%3Dnl1d1t1%26s%3Dusdeur%3DX%22%3B&format=json&callback=
	request({url: url,json: true}, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        var currencyData = body.list.resources;
			for (var key in currencyData) {
	        	var pairData = currencyData[key].resource.fields;
				var name = pairData.name.split("/");
				var price = pairData.price;
				var symbol = pairData.symbol;
				var timeStamp = pairData.ts;
				var utctime = pairData.utctime;
				//sails.log(name);
				if (name[0] == 'USD'){
					sails.log(name[1]);
				}
				//sails.log(price);
				//sails.log(timeStamp);
	    	}
	    }
	});
};

function getPairData(asset1, asset2){
	var deferred = Q.defer();
	var url = "https://api.bitfinex.com/v1/pubticker/"+asset1+asset2;
	request({url: url, json: true }, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        deferred.resolve(body);
	    }
	    else{deferred.resolve(error)}
	});
	return deferred.promise;
};

function Loopin(intervalDelay, asset1, asset2){
	var deferred = Q.defer();
	var array = [];
	var test = [1,2,3,4,5,6,7,8,9,10];
	async.eachSeries(test, function (iterator, nextIteration){ 
		getPairData(asset1, asset2).then(function(model){
			setTimeout(function () {
				array.push(model);
				process.nextTick(nextIteration);
			}, intervalDelay);
		})
	}, 
	function(err) {
		deferred.resolve(array);
	});
	return deferred.promise;
};


function ioGrab(intervalDelay, biggerDelay, asset1, asset2){
	var trainingData = {};
	var deferred = Q.defer();
	Loopin(intervalDelay, asset1, asset2).then(function(inputData){
		trainingData.input = inputData;
		setTimeout(function () {
			Loopin(intervalDelay, asset1, asset2).then(function(outputData){
				trainingData.output = outputData;
				deferred.resolve(trainingData);
			});
		}, biggerDelay);
	});
	return deferred.promise;
};



//experimental neural net where time is a variable'
//experimental neural net where currency pair are variable arrays -- > abstract

function neuralNet(intervalDelay, biggerDelay, networkModel, asset1, asset2){

	var myNetwork = Network.fromJSON(networkModel.networkJson);
	var trainer =  new Trainer(myNetwork);

	ioGrab(intervalDelay, biggerDelay, asset1, asset2).then(function(trainingData){

		var trainingSet = [];

		var minBidInput = Math.min.apply(Math, trainingData.input.map(function(obj){return obj.bid}));
		var maxBidInput = Math.max.apply(Math, trainingData.input.map(function(obj){return obj.bid}));

		var minAskInput = Math.min.apply(Math, trainingData.input.map(function(obj){return obj.ask}));
		var maxAskInput = Math.max.apply(Math, trainingData.input.map(function(obj){return obj.ask}));

		var minBidOutput = Math.min.apply(Math, trainingData.output.map(function(obj){return obj.bid}));
		var maxBidOutput = Math.max.apply(Math, trainingData.output.map(function(obj){return obj.bid}));

		var minAskOutput = Math.min.apply(Math, trainingData.output.map(function(obj){return obj.ask}));
		var maxAskOutput = Math.max.apply(Math, trainingData.output.map(function(obj){return obj.ask}));

		for (x in trainingData.input){
			//normalize to 0-1
			var normalizedBidInput = (trainingData.input[x].bid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (trainingData.input[x].ask-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var normalizedBidOutput = (trainingData.output[x].bid-minBidOutput)/(maxBidOutput-minBidOutput);
			if (isNaN(normalizedBidOutput)){normalizedBidOutput=0}
			var normalizedAskOutput = (trainingData.output[x].ask-minAskOutput)/(maxAskOutput-minAskOutput);
			if (isNaN(normalizedAskOutput)){normalizedAskOutput=0}

			trainingSet.push({input:[normalizedBidInput, normalizedAskInput], output:[normalizedBidOutput, normalizedAskOutput]});

		}

		return {
			trainingSet:trainingSet, 
			minBidInput:minBidInput,  
			maxBidInput:maxBidInput,  
			minAskInput:minAskInput,  
			maxAskInput:maxAskInput,  
			minAskOutput:minAskOutput,  
			maxAskOutput:maxAskOutput,  
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

		trainer.train(dataSet.trainingSet, {
			rate: .1,
			iterations: 2000000,
			error: -10000,
			shuffle: false,
			log: 1000000,
			cost: Trainer.cost.MSE,
			schedule: {
				every: 5000,
				do: function(data) {
					//console.log(data)
				}
			}
		});

		var networkJson = myNetwork.toJSON();

		NeuralNetwork.update({id: networkModel.id}, {network:networkJson}).then(function(){console.log('HI')})

		getPairData(asset1, asset2).then(function(btcData){

			var normalizedBidInput = (btcData.bid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (btcData.ask-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var latestInput = [normalizedBidInput, normalizedAskInput];
			var output = myNetwork.activate(latestInput);
			var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
			var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
			
			var predictionModel = {
				normalizeData: {minBidInput:minBidInput, maxBidInput:maxBidInput, minAskInput:minAskInput, maxAskInput:maxAskInput, minPrice:null, maxPrice:null},
				assetPair: [asset1, asset2],
				asset1: asset1,
				asset2: asset2,
				predictionTime: biggerDelay,
				currentBid: btcData.bid,
				currentAsk: btcData.ask,
				predictedBid: denormalizeBid,
				predictedAsk: denormalizeAsk,
				timeStamp: new Date(),
				actualBid: null,
				actualAsk: null,
			};
			console.log(predictionModel)
			Prediction.create(predictionModel).then(function(predictionModel){
				console.log(predictionModel)
				Prediction.publishCreate(predictionModel);

				//if prediction hits the lowest in some time scale....
				//place buy order

				//if prediction hits the highest in some time scale.... (and then go down)
				//find actual pair time-->

				setTimeout(function () {
					getPairData(asset1,asset2).then(function(btcData){
						Prediction.update({id:predictionModel.id}, {actualBid: btcData.bid, actualAsk: btcData.ask }).then(function(predictionModel){
							Prediction.publishUpdate(predictionModel[0].id, predictionModel[0]);
						});
					});
				}, predictionModel.predictionTime);
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



module.exports.intervalService = function(){

	var dataService = {};
	dataService = sails.services.dataservice;
	//order();
	//timer(dataService.tickerREST.bind(null, 1000), 1000);
	//timer(dataService.tickerREST, 1000);

	/*Data.find({delta:'1000'}).sort('createdAt ASC').limit(1000000)
    .exec(function (err, data) {
    	for (x in data){
    		Data.destroy({id:data[x].id}).then(function(model){console.log(model)});
    	}
    }); */

	timer(dataService.tickerREST.bind(null, 1000), 1000);//second
	timer(dataService.tickerREST.bind(null, 1000*5), 1000*5);//5 seconds
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

	//cull the data.. 
	timer(dataService.cullData.bind(null, '1000', 30*60*1000), 100000);//second
	timer(dataService.cullData.bind(null, '5000', 3*60*60*1000), 500000);//5 seconds
	timer(dataService.cullData.bind(null, '30000', 24*60*60*1000), 2500000);//30seconds
	timer(dataService.cullData.bind(null, '60000', 7*24*60*60*1000), 5000000);//60sec
	timer(dataService.cullData.bind(null, '300000', 2*7*24*60*60*1000), 7200000);//5min
	timer(dataService.cullData.bind(null, '1800000', 2*2*7*24*60*60*1000), 7200000);//30min
	timer(dataService.cullData.bind(null, '3600000', 2*2*7*24*60*60*1000), 7200000);//1hr
	timer(dataService.cullData.bind(null, '7200000', 2*2*2*7*24*60*60*1000), 7200000);//2hr
	timer(dataService.cullData.bind(null, '14400000', 2*2*2*2*7*24*60*60*1000), 7200000);//4hr
	timer(dataService.cullData.bind(null, '21600000', 2*2*2*7*24*60*60*1000), 7200000);//6hr
	timer(dataService.cullData.bind(null, '43200000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//12hr
	timer(dataService.cullData.bind(null, '86400000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//24hr

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