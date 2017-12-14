module.exports = {

	getAll: function(req, res) {
		NeuralNetwork.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		NeuralNetwork.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	getSome: function(req,res){
		NeuralNetwork.find()
		.limit(req.query.limit)
		.skip(req.query.skip)
		.sort(req.query.sort)
		.where(JSON.parse(req.query.filter))
		.then(function(predictionModel){
			res.json(predictionModel);
		});

	},

	create: function (req, res) {
		NeuralNetwork.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				Network.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};