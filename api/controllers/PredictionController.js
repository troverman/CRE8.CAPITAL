module.exports = {
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

		console.log(req.query.filter)
		Prediction.find()
		.limit(req.query.limit)
		.skip(req.query.skip)
		.sort(req.query.sort)
		.where(req.query.filter)

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