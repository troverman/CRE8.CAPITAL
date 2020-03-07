var App = {
	get: async function(input, output) {
		var delta = input.query.delta;
		var asset1 = input.query.asset1;
		var asset2 = input.query.asset2;
		var user = input.query.user; //mb..--> system wide trading 
		var type =  input.query.type;
		var limit = input.query.limit;
		var skip = input.query.skip;
		var sort = 'createdAt DESC'; //input.query.filter;
		console.log('orderApp.get', utilityServiceApp.guid(), input);
		//hak --> clean up if we want #cre8
		if (asset1 && asset2){
			var model = await Order.find().where({asset1:asset1, asset2:asset2}).limit(limit).skip(skip).sort(sort)
			output.json(model);
		}
		if (asset1 && !asset2){
			var model = await Order.find().where({asset1:asset1}).limit(limit).skip(skip).sort(sort)
			output.json(model);
		}
		else{
			var model = await Order.find().limit(limit).skip(skip).sort(sort)
			output.json(model);
		}
	},
	create: async function (input, output) {
		var model = {
			asset1: input.param('asset1'),
			asset2: input.param('asset2'),
			price: input.param('price'),
			amount: input.param('amount'),
			status: input.param('status'),
		};
		var newOrder = await Order.create(model);
		Order.publishCreate(model.toJSON());
		output.json(model);
	}
};
module.exports = App;