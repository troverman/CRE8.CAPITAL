var App = {
	get: async function(input, output){
		var neuralNetworkModel = await NeuralNetwork.find().limit(input.query.limit).skip(input.query.skip).sort(input.query.sort).where(JSON.parse(input.query.filter))
		output.json(neuralNetworkModel);
	},
	create: async function (input, output) {
		var model = await NeuralNetwork.create(model);
		Network.publishCreate(model.toJSON());
		output.json(model);
	}
};
module.exports = App;