var App = {
	get: async function(input, output) {
		if (input.query.type=='username'){
			var model = await User.find({username:input.query.filter}).limit(input.query.limit).skip(input.query.skip).sort(input.query.sort)
			output.json(model[0]);
		}
		else{
			var models = await User.find()
         	//STRIP SECRET INFO
            for (x in models){delete models[x].poloniexApiKey; delete models[x].poloniexApiSecret;}
			output.json(models);
		}
	},
	create: async function (input, output) {
		var model = {username: input.param('username'), email: input.param('email'), firstName: input.param('firstName'), lastName: input.param('lastName')};
		var model = await User.create(model);
		User.publishCreate(model.toJSON());
		output.json(model);	
	},
	update: async function (input, output) {
		var id = input.session.user.id
		var model = {
			username: input.param('username'),
			firstName: input.param('firstName'),
			lastName: input.param('lastName'),

			//LOL
			poloniexApiKey: input.param('poloniexApiKey'),
			poloniexApiSecret: input.param('poloniexApiSecret'),
			btcWalletAddress: input.param('btcWalletAddress'),
			ltcWalletAddress: input.param('ltcWalletAddress'),

		};
		var model = await User.update({id:id}, model);
		User.publishCreate(model);
		output.json(model);	
	},
};
module.exports = App;