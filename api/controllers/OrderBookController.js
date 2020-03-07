var App = {
	//! DEFINE AS CONNECTIONS !
	//COMPUTED AND SAVE STRUCURES
		//EVENTS (ORDERS / VALIDATIONS) --> BINARY ASSOCIATION COMPLEXES (ORDER BOOK)
			//DIRECT SINGLE ASSOCIATION ASSOCIATIONS TREES 
			//REDUCE TO ASSOCIATION ; SET = SET (COMPLEX) ASSOCIATION
	get: async function(input, output) {
		var asset1 = input.query.asset1;
		var asset2 = input.query.asset2;
		var limit = input.query.limit;
		var skip = input.query.skip;
		var sort = 'createdAt DESC';
		console.log('orderBook.get', utilityServiceApp.guid(), input);
		var model = await OrderBook.find({asset1:asset1, asset2:asset2}).limit(limit).skip(skip).sort(sort);
		output.json(model);
	}
};
module.exports = App;