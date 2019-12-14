module.exports = {
	//COMPUTED AND SAVE STRUCURES
		//EVENTS (ORDERS / VALIDATIONS) --> BINARY ASSOCIATION COMPLEXES (ORDER BOOK)
			//DIRECT SINGLE ASSOCIATION ASSOCIATIONS TREES 
			//REDUCE TO ASSOCIATION ; SET = SET (COMPLEX) ASSOCIATION
	getSome: async function(req, res) {
		//var delta = req.query.delta; -->mb save every hr; also live
		var asset1 = req.query.asset1;
		var asset2 = req.query.asset2;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = 'createdAt DESC';
		console.log(req.query);
		var model = await OrderBook.find().where({asset1:asset1, asset2:asset2}).limit(limit).skip(skip).sort(sort);
		res.json(model);
		//subscribe and broad cast live book
	}
};