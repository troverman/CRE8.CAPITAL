module.exports = {

	init: async function(){
		intervalServiceApp.init();
		await passportApp.loadStrategies();
		await emailServiceApp.loadTemplates();
	},

}