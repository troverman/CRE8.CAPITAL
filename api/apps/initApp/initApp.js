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

		//REUDCE TREE TO LIST ITERATE AND CREATE :: 
		//Market :: [] Assets (pow set of assets)
		//Association :: non reflective 

	}
};
module.exports = App;
