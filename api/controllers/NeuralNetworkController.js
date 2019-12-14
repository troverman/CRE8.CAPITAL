module.exports = {

	getSome: async function(req,res){
		var neuralNetworkModell = await NeuralNetwork.find().limit(req.query.limit).skip(req.query.skip).sort(req.query.sort).where(JSON.parse(req.query.filter))
		res.json(neuralNetworkModell);
	},

	create: async function (req, res) {
		var model = await NeuralNetwork.create(model);
		Network.publishCreate(model.toJSON());
		res.json(model);
	}

};