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
		.sort('updatedAt DESC')
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
	}

};