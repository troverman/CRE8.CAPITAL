module.exports = {


	getAll: function(req, res) {
		Network.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Network.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	getSome: function(req,res){
		Network.find()
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

		Network.create(model)
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