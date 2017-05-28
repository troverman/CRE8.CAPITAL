var Q = require('q');
var request = require('request');
var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;


//refactor for global fn
function getPairData(asset1, asset2){
	var deferred = Q.defer();
	var url = "https://api.bitfinex.com/v1/pubticker/"+asset1+asset2;
	request({url: url, json: true }, function (error, response, body) {
		//console.log(body)
	    if (!error && response.statusCode === 200) {
	        deferred.resolve(body);
	    }
	});
	return deferred.promise;
};

module.exports = {

	getCurrentPrediction: function(req, res) {

		var predictionTime = req.query.predictionTime;
		var asset1 = req.query.asset1;
		var asset2 = req.query.asset2;

		console.log('test')

		NeuralNetwork.find({predictionTime:predictionTime, asset1: asset1, asset2:asset2})
		.then(function(neuralNetworkModel) {
			console.log('1234')
			//console.log(neuralNetworkModel[0].networkJson)
			var myNetwork = Network.fromJSON(neuralNetworkModel[0].networkJson);
			//console.log(myNetwork)

			//get current price to denormalize
			getPairData(asset1, asset2).then(function(currentData){

				var model = {};
				model.currentData = currentData;

				//make more accuralte with market inferance --~>
				/*
				var normalizedBidInput = (output.bid)/(maxBidInput-minBidInput);
				if (isNaN(normalizedBidInput)){normalizedBidInput=0}
				var normalizedAskInput = (btcData.ask-minAskInput)/(maxAskInput-minAskInput);
				if (isNaN(normalizedAskInput)){normalizedAskInput=0}

				var latestInput = [normalizedBidInput, normalizedAskInput];
				var output = myNetwork.activate(latestInput);
				var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
				var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
				*/

				//gotta normalize with appropiate data..?
				//save data to a data model -- with currency pairs etc. --> get resutls withing the past x time -- to normalize.....

				//Prediction.find({predictionTime:predictionTime, asset1: asset1, asset2: asset2})
				//get the latest normilazation data...... ----> :>

				Prediction
				.find({predictionTime:predictionTime})
				.limit(1)
				.sort('createdAt DESC')
				.then(function(lastestPrediction){

					console.log(lastestPrediction)

					var normalizedBidInput = (model.currentData.bid)/(model.currentData.ask-model.currentData.bid);
					var normalizedAskInput = (model.currentData.ask)/(model.currentData.ask-model.currentData.bid);
					var latestInput = [0.5, 0.5];
					console.log(latestInput)

					var output = myNetwork.activate(latestInput);
					console.log(output)

					//var denormalizeBid = model.currentData.bid*-1*output[0]+model.currentData.bid+output[0]*model.currentData.bid;
					//var denormalizeAsk =  model.currentData.ask*-1*output[1]+model.currentData.ask+output[1]*model.currentData.ask;
					//console.log(denormalizeBid, denormalizeAsk)

					model.output = [output[0]/0.5 * model.currentData.bid, output[1]/0.5 * model.currentData.ask];
					console.log(model)
					res.json(model);


				})

			});

		})
		.fail(function(err) {
			// res.send(404);
		});
	},


	getAll: function(req, res) {
		Prediction.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Prediction.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	getSome: function(req,res){
		Prediction.find()
		.limit(req.query.limit)
		.skip(req.query.skip)
		.sort(req.query.sort)
		.where(JSON.parse(req.query.filter))
		.then(function(predictionModel){
			res.json(predictionModel);
		});

	},

	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			first_name: req.param('first_name')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};