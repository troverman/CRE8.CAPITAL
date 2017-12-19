module.exports = {

	getSome: function(req, res) {
		Order.find({})
		.then(function(model) {
			res.json(model);
		})
		.fail(function(err) {
		});
	},

	create: function (req, res) {
		var model = {
			asset1: req.param('asset1'),
			asset2: req.param('asset2'),
			price: req.param('asset2'),
			amount: req.param('asset2'),
		};

		Order.create(model)
		.exec(function(err, model) {
			if (err) {return console.log(err);}
			else {
				//inject poloniex code here.
				Order.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};