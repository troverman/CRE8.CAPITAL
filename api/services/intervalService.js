var request = require('request');
var Q = require('q');
var async = require('async');
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  


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
	['DASH','USD'],
	['DASH','BTC'],
	['RRT','USD'],
	['RRT','BTC'],
	['BCC','USD'],
	['BCC','BTC'],
	['BCU','USD'],
	['BCU','BTC'],	
];

function getPairData(asset1, asset2){
	var deferred = Q.defer();
	var url = "https://api.bitfinex.com/v1/pubticker/"+asset1+asset2;
	request({url: url, json: true }, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        deferred.resolve(body);
	    }
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


function neuralNet(intervalDelay, biggerDelay, myNetwork, trainer, asset1, asset2){

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
		//console.log(dataSet);

		var minBidInput = dataSet.minBidInput;
		var maxBidInput = dataSet.maxBidInput;
		var minAskInput = dataSet.minAskInput;
		var maxAskInput = dataSet.maxAskInput;
		var minBidOutput = dataSet.minBidOutput;
		var maxBidOutput = dataSet.maxBidOutput;
		var minAskOutput = dataSet.minAskOutput;
		var maxAskOutput = dataSet.maxAskOutput;

		//console.log(trainingData);
		//console.log(trainingSet);
		//console.log(trainer)
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



		//update network db here

		

		//how to not hold trainer in memory? store as a seed?
		getPairData(asset1, asset2).then(function(btcData){






			//get myNetwrok




			var normalizedBidInput = (btcData.bid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (btcData.ask-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var latestInput = [normalizedBidInput, normalizedAskInput];
			var output = myNetwork.activate(latestInput);
			var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
			var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;

			/*
			console.log('---------------------------------------------------------------');
			console.log('USING THE TRAINED NETWORK TO PREDICT... ')
			console.log('BID / ASK PREDICTION IN ' + biggerDelay/1000 + ' SECONDS');
			console.log('INPUT: ' + latestInput);
			console.log('OUTPUT: '+ output);
			console.log('CURRENT BID: ' + btcData.bid + ' CURRENT ASK: ' + btcData.ask);
			console.log('PREDICTED BID: ' + denormalizeBid + ' PREDICTED ASK: ' + denormalizeAsk);
			console.log('---------------------------------------------------------------');
			*/
			
			//network has no memory ---
			//save myNetwork in session?? 

			var predictionModel = {
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



module.exports.intervalService = function(){

	//gonna have to save the trainers to a db -- aka the weighted nodes
	//meantime
	var networkArray = []
	for (x in tradingPairs){
		//var network = new Architect.Perceptron(2, 4, 3, 2);
		//var trainer = new Trainer(network);
		networkArray.push(
			{
				pair: tradingPairs[x],
				network1: new Architect.Perceptron(2, 4, 3, 2),
				network2: new Architect.Perceptron(2, 4, 3, 2),
				network3: new Architect.Perceptron(2, 4, 3, 2),
				network4: new Architect.Perceptron(2, 4, 3, 2),
				network5: new Architect.Perceptron(2, 4, 3, 2)
			}
		);
	}
	for (x in networkArray){
		//neuralNet(6000, 60000, networkArray[x].network1, new Trainer(networkArray[x].network1), networkArray[x].pair[0], networkArray[x].pair[1])
		//setInterval(neuralNet.bind(null, 6000, 60000, networkArray[x].network1, new Trainer(networkArray[x].network1), networkArray[x].pair[0], networkArray[x].pair[1]), 60000);
		setInterval(neuralNet.bind(null, 30000, 300000, networkArray[x].network2, new Trainer(networkArray[x].network2), networkArray[x].pair[0], networkArray[x].pair[1]), 300000);
		setInterval(neuralNet.bind(null, 1800000, 1800000, networkArray[x].network3, new Trainer(networkArray[x].network3), networkArray[x].pair[0], networkArray[x].pair[1]), 1800000);
		setInterval(neuralNet.bind(null, 5400000, 5400000, networkArray[x].network4, new Trainer(networkArray[x].network4), networkArray[x].pair[0], networkArray[x].pair[1]), 5400000);
		setInterval(neuralNet.bind(null, 43200000, 43200000, networkArray[x].network5, new Trainer(networkArray[x].network5), networkArray[x].pair[0], networkArray[x].pair[1]), 43200000);
		
	}


	/*
	var myNetwork = new Architect.Perceptron(2, 4, 3, 2);
	var trainer = new Trainer(myNetwork);

	var myNetwork1 = new Architect.Perceptron(2, 4, 3, 2);
	var trainer1 = new Trainer(myNetwork1);

	var myNetwork2 = new Architect.Perceptron(2, 4, 3, 2);
	var trainer2 = new Trainer(myNetwork2);

	var myNetwork3 = new Architect.Perceptron(2, 4, 3, 2);
	var trainer3 = new Trainer(myNetwork3);

	var myNetwork4 = new Architect.Perceptron(2, 4, 3, 2);
	var trainer4 = new Trainer(myNetwork4);

	//portfolio weight is 0-1 btc to usd
	////make trade? 
	var budgetNetwork = new Architect.Perceptron(2, 4, 3, 2);
	var budgetTrainer = new Trainer(budgetNetwork);

	//neuralNet(50000,80000);
	//neuralNet(30000,60000*5);
	//neuralNet(30000/5,60000);

	//1 min, 6 seconds(x10)
	//1 min to train, wait 1 min, 1 min to train
	//new prediction every 3 min
	setInterval(neuralNet.bind(null, 6000, 60000, myNetwork, trainer), 60000);

	//5 min, 30 sec(x10)
	//5 min to train, wait 5 min, 5 min to train
	//new prediction every 15min
	setInterval(neuralNet.bind(null, 30000, 300000, myNetwork1, trainer1), 300000);

	//30 min, 180 sec(x10)
	//30 min to train, wait 30 min, 30 min to train
	//new prediction every 90min
	setInterval(neuralNet.bind(null, 180000, 1800000, myNetwork2, trainer2), 1800000);

	//90 min, 540 sec(x10)
	//90 min to train, wait 90 min, 90 min to train
	//new prediction every 270min
	setInterval(neuralNet.bind(null, 540000, 5400000, myNetwork3, trainer3), 5400000);

	//720 min, 4320 sec(x10)
	//720 min to train, wait 720 min, 720 min to train
	//new prediction every 36hrs
	setInterval(neuralNet.bind(null, 4320000, 43200000, myNetwork4, trainer4), 43200000);
	*/


};