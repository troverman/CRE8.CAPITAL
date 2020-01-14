
module.exports = {

	getCurrentPrediction: async function(req, res) {

		function getPairData(asset1, asset2){
			var Q = require('q');
			var request = require('request');
			var deferred = Q.defer();
			var url = "https://api.bitfinex.com/v1/pubticker/"+asset1+asset2;
			request({url: url, json: true }, function (error, response, body) {
			    if (!error && response.statusCode === 200) {
			        deferred.resolve(body);
			    }
			});
			return deferred.promise;
		};
		var synaptic = require('synaptic');
		var Neuron = synaptic.Neuron,
			Layer = synaptic.Layer,
			Network = synaptic.Network,
			Trainer = synaptic.Trainer,
			Architect = synaptic.Architect;

		var predictionTime = req.query.delta;
		var asset1 = req.query.asset1;
		var asset2 = req.query.asset2;
		var neuralNetworkModel = await NeuralNetwork.find({predictionTime:predictionTime, asset1: asset1, asset2:asset2})
		var myNetwork = Network.fromJSON(neuralNetworkModel[0].networkJson);

		//get current price to denormalize
		var currentData = await getPairData(asset1, asset2);

		var model = {};
		model.currentData = currentData;

		var lastestPrediction = await Prediction.find({predictionTime:predictionTime, asset1: asset1, asset2: asset2}).limit(1).sort('createdAt DESC')
	
		console.log(lastestPrediction[0]);

		var normalizedBidInput = (model.currentData.bid - lastestPrediction[0].normalizeData.minBidInput)/(lastestPrediction[0].normalizeData.maxBidInput - lastestPrediction[0].normalizeData.minBidInput);
		if (isNaN(normalizedBidInput)){normalizedBidInput=0}
		var normalizedAskInput = (model.currentData.ask - lastestPrediction[0].normalizeData.minAskInput)/(lastestPrediction[0].normalizeData.maxAskInput - lastestPrediction[0].normalizeData.minAskInput);
		if (isNaN(normalizedAskInput)){normalizedAskInput=0}

		var latestInput = [normalizedBidInput, normalizedAskInput];
		console.log(latestInput);

		//var normalizedBidInput = (btcData.bid-minBidInput)/(maxBidInput-minBidInput);
		//var normalizedAskInput = (btcData.ask-minAskInput)/(maxAskInput-minAskInput);
		//var latestInput = [normalizedBidInput, normalizedAskInput];

		var output = myNetwork.activate(latestInput);
		console.log(output);

		//var denormalizeBid = model.currentData.bid*-1*output[0]+model.currentData.bid+output[0]*model.currentData.bid;
		//var denormalizeAsk =  model.currentData.ask*-1*output[1]+model.currentData.ask+output[1]*model.currentData.ask;
		//console.log(denormalizeBid, denormalizeAsk)

		var denormalizeBid = lastestPrediction[0].normalizeData.minBidInput*-1*output[0]+lastestPrediction[0].normalizeData.minBidInput+output[0]*lastestPrediction[0].normalizeData.maxBidInput;
		var denormalizeAsk = lastestPrediction[0].normalizeData.minAskInput*-1*output[1]+lastestPrediction[0].normalizeData.minAskInput+output[1]*lastestPrediction[0].normalizeData.maxAskInput;

		//model.output = [output[0]/0.5 * model.currentData.bid, output[1]/0.5 * model.currentData.ask];
		model.output = [denormalizeBid, denormalizeAsk];

		console.log(model);
		res.json(model);
	
	},

	getSome: async function(req,res){
		var predictionModel = await Prediction.find().limit(req.query.limit).skip(req.query.skip).sort(req.query.sort).where(JSON.parse(req.query.filter))
		res.json(predictionModel);
		Prediction.watch(req);
		Prediction.subscribe(req, predictionModel);
	},

};