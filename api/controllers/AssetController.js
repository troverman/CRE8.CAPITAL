module.exports = {

	getOne: function(req, res) {
		Asset.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	getSome: function(req, res) {
		Asset.find({user: req.query.user})
		.then(function(model){
			res.json(model);
		});
	},

	getAll: function(req, res) {
		Asset.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			first_name: req.param('first_name')
		};

		Asset.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				Asset.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};