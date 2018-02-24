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

	getMine: function(req,res){
		if (req.user){
			var id = req.session.user.id
			User.find({id:id})
			.populate('passports')
			.then(function(user){
				return res.json(user);
			})
			.catch(function(err){
				return res.negotiate(err);
			});
		}
		else{return res.json();}
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
		console.log(model)
		User.update({id:id}, model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model);
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