var request = require('request');
module.exports = {
	getCurrency: function(req, res) {
		var model= {
			url: 'http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json',
			json: true
		};
		request(model , function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        var currencyData = body.list.resources;
		        var nodeArray = [{name: 'USD', price:1}];
		        var linkArray = [];
				for (var key in currencyData) {
		        	var pairData = currencyData[key].resource.fields;
					var name = pairData.name.split("/");
					var price = pairData.price;
					var symbol = pairData.symbol;
					var timeStamp = pairData.ts;
					var utctime = pairData.utctime;
					//if (nodeArray.indexOf({name: name[0]}) != -1){
						//nodeArray.push({name: name[0]});
					//}
					//if (nodeArray.indexOf({name: name[1]}) != -1){
						//nodeArray.push({name: name[1]});
					//}
					nodeArray.push({name: name[1], price: price});
					linkArray.push({source: 0, target: parseInt(key) + 1, value: 1});
		    	}
				//linkArray.push({source: 0, target: 1, value: 1});
		    	console.log(nodeArray.length);
		    	console.log(linkArray.length)

				var model = {nodes:nodeArray, links:linkArray}
		    }
			res.json(model);
		});
	},

};