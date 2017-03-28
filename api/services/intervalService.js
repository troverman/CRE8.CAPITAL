var request = require('request');
var Q = require('q');
var async = require('async');

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

function getBTC(){
	var deferred = Q.defer();
	var url = "https://cex.io/api/ticker/BTC/USD";
	request({url: url, json: true }, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        deferred.resolve(body);
	    }
	});
	return deferred.promise;
};

function Loopin(intervalDelay){
	var deferred = Q.defer();
	var array = [];
	var test = [1,2,3,4,5,6,7,8,9,10];
	async.eachSeries(test, function (iterator, nextIteration){ 
		getBTC().then(function(model){
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


function ioGrab(intervalDelay, biggerDelay){
	var trainingData = {};
	var deferred = Q.defer();
	Loopin(intervalDelay).then(function(inputData){
		trainingData.input = inputData;
		setTimeout(function () {
			Loopin(intervalDelay).then(function(outputData){
				trainingData.output = outputData;
				deferred.resolve(trainingData);
			});
		}, biggerDelay);
	});
	return deferred.promise;
};


function neuralNet(intervalDelay, biggerDelay){
	var synaptic = require('synaptic');
	var Neuron = synaptic.Neuron,
		Layer = synaptic.Layer,
		Network = synaptic.Network,
		Trainer = synaptic.Trainer,
		Architect = synaptic.Architect;
	var myNetwork = new Architect.Perceptron(2, 4, 3, 2);
	var trainer = new Trainer(myNetwork);

	ioGrab(intervalDelay, biggerDelay).then(function(trainingData){
		console.log(intervalDelay+' : '+ biggerDelay)

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

		//console.log(trainingData);
		console.log(trainingSet);
		trainer.train(trainingSet, {
			rate: .1,
			iterations: 2000000,
			error: -10000000,
			shuffle: false,
			log: 10000,
			cost: Trainer.cost.MSE,
			schedule: {
				every: 500,
				do: function(data) {
					console.log(data)
				}
			}
		});

		getBTC().then(function(input){
			var normalizedBidInput = (input.bid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (input.ask-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var latestInput = [normalizedBidInput, normalizedAskInput];
			console.log(input)
			console.log('USING THE TRAINED NETWORK TO PREDICT... this is given: ' + latestInput)
			var output = myNetwork.activate(latestInput);
			console.log(output);//convert to price again
			console.log('BID / ASK ONE TIME INTERVAL FROM NOW PREDICTION: ' + biggerDelay);
			var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
			var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
			console.log(denormalize, denormalizeAsk);

		});

		console.log('USING THE TRAINED NETWORK TO PREDICT... this is given a static input, max range. non current data. [0,1]')
		var input = [0, 1];
		var output = myNetwork.activate(input);
		console.log(output);//convert to price again
		console.log('BID / ASK ONE TIME INTERVAL FROM NOW PREDICTION: ' + biggerDelay);
		var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
		var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
		console.log(denormalize, denormalizeAsk);

	});

};



module.exports.intervalService = function(){
	//neuralNet(50000,80000);
	//neuralNet(30000,60000*5);
	//neuralNet(30000/5,60000);
	setInterval(neuralNet.bind(null, 6000, 60000),60000)
};