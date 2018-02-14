module.exports = {
	getAll: function(req, res) {
		User.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		User.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},

	update: function (req, res) {
		var id = req.session.user.id
		var model = {
			username: req.param('username'),
			firstName: req.param('firstName'),
			lastName: req.param('lastName'),
			poloniexApiKey: req.param('poloniexApiKey'),
			poloniexApiSecret: req.param('poloniexApiSecret'),
			btcWalletAddress: req.param('btcWalletAddress'),
			ltcWalletAddress: req.param('ltcWalletAddress'),
		};
		User.update({id:id}, model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	},

	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			firstName: req.param('firstName'),
			lastName: req.param('lastName')
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