var request = require('request');
var Q = require('q');
var async = require('async');
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;
//import regression from 'regression';
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

function analyze(){
	Prediction.find({asset1:'ETH', asset2:'BTC'})
	.sort('createdAt DESC')
	.then(function(models){
		console.log(models[0]);
	});
};



module.exports.intervalService = function(){

	//var dataService = {};
	//sails.services.dataservice = dataService;
	//analyze();
	//dataService.ticker();
	//get the data
	setInterval(dataService.tickerREST.bind(null, 1000), 1000);//second
	setInterval(dataService.tickerREST.bind(null, 1000*5), 1000*5);//5 seconds
	setInterval(dataService.tickerREST.bind(null, 1000*5*6), 1000*5*6);//30 seconds
	setInterval(dataService.tickerREST.bind(null, 1000*5*12), 1000*5*12);//60 seconds
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5), 1000*5*12*5);//5min
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6), 1000*5*12*5*6);//30min
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2), 1000*5*12*5*6*2);//1hr
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2), 1000*5*12*5*6*2*2);//2hr
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*2), 1000*5*12*5*6*2*2*2);//4hr
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3), 1000*5*12*5*6*2*2*3);//6hr
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2), 1000*5*12*5*6*2*2*3*2);//12hr
	setInterval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2*2), 1000*5*12*5*6*2*2*3*2*2);//24hr

	//Data.find().limit(100).then((model)=>console.log(model))
	//dataService.cullData('1000', 6*60*60*1000)

	//cull the data.. 
	setInterval(dataService.cullData.bind(null, '1000', 6*60*60*1000), 7200000);//second
	setInterval(dataService.cullData.bind(null, '5000', 24*60*60*1000), 7200000);//5 seconds
	setInterval(dataService.cullData.bind(null, '30000', 7*24*60*60*1000), 7200000);//30seconds
	setInterval(dataService.cullData.bind(null, '60000', 2*7*24*60*60*1000), 7200000);//60sec
	setInterval(dataService.cullData.bind(null, '300000', 2*7*24*60*60*1000), 7200000);//5min
	setInterval(dataService.cullData.bind(null, '1800000', 2*2*7*24*60*60*1000), 7200000);//30min
	setInterval(dataService.cullData.bind(null, '3600000', 2*2*7*24*60*60*1000), 7200000);//1hr
	setInterval(dataService.cullData.bind(null, '7200000', 2*2*2*7*24*60*60*1000), 7200000);//2hr
	setInterval(dataService.cullData.bind(null, '14400000', 2*2*2*2*7*24*60*60*1000), 7200000);//4hr
	setInterval(dataService.cullData.bind(null, '21600000', 2*2*2*7*24*60*60*1000), 7200000);//6hr
	setInterval(dataService.cullData.bind(null, '43200000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//12hr
	setInterval(dataService.cullData.bind(null, '86400000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//24hr


	//setInterval(dataService.dataService, 14400000);
	//setInterval(ticker, 6000);

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


	assetArrayLinearCombinationEquality();

	NeuralNetwork.find()
    .then(function (models) {

    	//neuralNet(models[0].predictionTime/10, models[0].predictionTime, models[0],	models[0].asset1, models[0].asset2)
		for (x in models){
			//if (models[x].predictionTime==1800000){
				//console.log(models[x].predictionTime)
				setInterval(neuralNet.bind(null, models[x].predictionTime/10, models[x].predictionTime, models[x],	models[x].asset1, models[x].asset2), models[x].predictionTime);
			//}
		}
    });

	
    var dataArray = [];
    //var csvWriter = require('csv-write-stream');
	//var writer = csvWriter({ headers: ["date", "price"]});
    //writer.pipe(fs.createWriteStream('BTC_LTC.csv'));
	var now = new Date(), start = new Date(now.getTime() - (24 * 1 * 60 * 60 * 1000));
	var yesterday = Date.parse(start);
    Data.find({assetPair:'BTC_LTC', delta:'1000'})
    .sort('createdAt ASC')
    .then(function(models){
    	for (x in models){

			var price = models[x].price;
    		var date = Date.parse(models[x].createdAt);
    		var update = date - yesterday;
    		if (update > 0){
				//writer.write([update/1000, price]);
				dataArray.push([update/1000, price*10000]);

    		}

    	}
    
		//writer.end();
    	//console.log(dataArray);
    	//var result = regression.polynomial(dataArray, { order: 8, precision: 200 })
    	//console.log(result);
    	//console.log((Date.parse(new Date()) - yesterday)/1000);
    	//var predict = result.predict((Date.parse(new Date()) - yesterday)/1000-1000);
    	//console.log(predict)
    	//console.log(models);

    });


    /*
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
		neuralNet(6000, 60000, networkArray[x].network1, new Trainer(networkArray[x].network1), networkArray[x].pair[0], networkArray[x].pair[1])
		//setInterval(neuralNet.bind(null, 6000, 60000, networkArray[x].network1, new Trainer(networkArray[x].network1), networkArray[x].pair[0], networkArray[x].pair[1]), 60000);
		//setInterval(neuralNet.bind(null, 30000, 300000, networkArray[x].network2, new Trainer(networkArray[x].network2), networkArray[x].pair[0], networkArray[x].pair[1]), 300000);
		//setInterval(neuralNet.bind(null, 1800000, 1800000, networkArray[x].network3, new Trainer(networkArray[x].network3), networkArray[x].pair[0], networkArray[x].pair[1]), 1800000);
		//setInterval(neuralNet.bind(null, 5400000, 5400000, networkArray[x].network4, new Trainer(networkArray[x].network4), networkArray[x].pair[0], networkArray[x].pair[1]), 5400000);
		//setInterval(neuralNet.bind(null, 43200000, 43200000, networkArray[x].network5, new Trainer(networkArray[x].network5), networkArray[x].pair[0], networkArray[x].pair[1]), 43200000);
		
	}
	*/



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