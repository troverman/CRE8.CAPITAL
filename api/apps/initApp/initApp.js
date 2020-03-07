var App = {
	init: async function(){
		
		intervalServiceApp.init();
		await passportApp.loadStrategies();
		await emailServiceApp.loadTemplates();

		var treeObj = analysisApp.recursivePowersetDecompose({
			input:{
				data:['A', 'B', 'C', 'D'], // 'E', 'F', 'G', 'H'],
				params:{
					size:1,
					recursion:3,
				},
			},	
		});
		console.dir(treeObj, { depth: null });

	}
};
module.exports = App;
