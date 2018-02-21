module.exports = {

	getSome: function(req, res) {
		//var delta = req.query.delta; -->mb save every hr; also live
		var asset1 = req.query.asset1;
		var asset2 = req.query.asset2;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = 'createdAt DESC';//req.query.filter;
		console.log(req.query)
		OrderBook.find()
		.where({asset1:asset1, asset2:asset2})
		.limit(limit)
		.skip(skip)
		.sort(sort)
		.then(function(model) {
			res.json(model);
			//subscribe and broad cast live book
		})
		.fail(function(err) {
		});
	}
};