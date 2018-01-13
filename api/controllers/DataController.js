var request = require('request');
var Poloniex = require('poloniex-api-node');
var tulind = require('tulind');

module.exports = {

	getData: function(req, res){

		var delta = req.query.delta;
		var asset1 = req.query.asset1;
		var asset2 = req.query.asset2;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = 'createdAt DESC';//req.query.filter;
		var indicator = req.query.indicator;
		var indicatorOption = req.query.indicatorOption;

		//var filter;

		Data.find({delta:req.query.delta, asset1:req.query.asset1, asset2:req.query.asset2})
		.limit(limit)
		.skip(skip)
		.sort(sort)
		.then(function(dataModel){
			
			//var dataModel = dataModel.reverse()
			
			//TODO:seperate api calls based on indicator..
			//dataService.ema(period, data)
			var dataObject = {};
			var change = dataModel.map(function(obj){return obj.percentChange});
			var price = dataModel.map(function(obj){return obj.price});
			//console.log(price)

			//tulind.indicators.kama.indicator([price], [5], function(err, results) {
			tulind.indicators.bbands.indicator([change], [10,2], function(err, results) {
				console.log(results)
				//dataObject.ema = results[0];
				//dataObject.data = dataModel;
				for (x in results[0]){
					dataModel[x].lower = results[0][x];
					dataModel[x].middle = results[1][x];
					dataModel[x].upper = results[2][x];

					dataModel[x].ema = results[0][x];
				}
				Data.subscribe(req, dataModel);
				Data.watch(req);
				res.json(dataModel);
			});


		});

	},

	getTicker: function(req, res){

		var poloniex = new Poloniex();  
		poloniex.subscribe('ticker');
		poloniex.on('message', (channelName, data, seq) => {
			var model = {
				assetPair:data.currencyPair,
				asset1:data.currencyPair.split('_')[0],
				asset2:data.currencyPair.split('_')[1],
				price:data.last,
				currentBid:data.highestBid,
				currentAsk:data.lowestAsk,
				percentChange:data.percentChange,
			};
			//TODO:publish data here
		});

		poloniex.on('open', () => {
		  console.log('Poloniex WebSocket connection open');
		});

		poloniex.on('close', (reason, details) => {
		  console.log('Poloniex WebSocket connection disconnected:', reason, details);
		});

		poloniex.on('error', (error) => {
		  console.log('An error has occured');
		});

		poloniex.openWebSocket({ version: 2 });
		
	},

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