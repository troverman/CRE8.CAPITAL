module.exports = {

	getSome: async function(req, res) {
		if (req.query.type=='username'){
			var model = await User.find({username:req.query.filter}).limit(req.query.limit).skip(req.query.skip).sort(req.query.sort)
			res.json(model[0]);
		}
		else{res.json({})}
	},

	update: async function (req, res) {
		var id = req.session.user.id
		var model = {
			username: req.param('username'),
			firstName: req.param('firstName'),
			lastName: req.param('lastName'),

			//LOL
			poloniexApiKey: req.param('poloniexApiKey'),
			poloniexApiSecret: req.param('poloniexApiSecret'),
			btcWalletAddress: req.param('btcWalletAddress'),
			ltcWalletAddress: req.param('ltcWalletAddress'),

		};
		var model = await User.update({id:id}, model);
		User.publishCreate(model);
		res.json(model);	
	},

	create: async function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			firstName: req.param('firstName'),
			lastName: req.param('lastName')
		};
		var model = await User.create(model);
		User.publishCreate(model.toJSON());
		res.json(model);	
	}
};