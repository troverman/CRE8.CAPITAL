var request = require('request');
//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  
var Poloniex = require('poloniex-api-node');
var movingAverages = require('moving-averages');
var bollingerBands = require('bollinger-bands').boll;
var tulind = require('tulind');


module.exports = {

	legacyStockTicker: function(){
		var url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json"
		request({url: url,json: true}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        var currencyData = body.list.resources;
				for (var key in currencyData) {
		        	var pairData = currencyData[key].resource.fields;
					var name = pairData.name.split("/");
					var price = pairData.price;
					var symbol = pairData.symbol;
					var timeStamp = pairData.ts;
					var utctime = pairData.utctime;
					console.log(name);
					if (name[0] == 'USD'){
						//sails.log(name[1]);
					}
		    	}
		    }
		});
	},

	//ema: function(asset1, asset2, delta, limit, order, precision){
	//	var ema = require('exponential-moving-average');
	//	ema()	
	//}

	predictiveModelPolynomial: function(asset1, asset2, delta, limit, order, precision){
		var regression = require('regression');
		var ema = require('exponential-moving-average');
		var dataArray = [];	
	   	var predictions = [];
	   	var now = new Date(), start = new Date(now.getTime() - (24 * 60 * 60 * 1000));
		var yesterday = Date.parse(start);
		return Data.find({asset1:asset1, asset2:asset2, delta:delta})
	    .sort('createdAt DESC')
	    .limit(limit)
	    .then(function(models){
	    	for (x in models.reverse()){
				dataArray.push([Date.parse(models[x].createdAt) - Date.parse(models[0].createdAt), models[x].percentChange]);
	    	}
			var result = regression.polynomial(dataArray, { order: order, precision: precision });
	    	//console.log(result);
	    	//console.log(result.predict(dataArray[dataArray.length-1][0] + 100));

	    	//console.log(ema(models.map(function(obj){return obj.price})));
			//console.log(dma.ma(models.map(function(obj){return obj.percentChange}),2))
	    	//console.log(movingAverages.ma(models.map(function(obj){return obj.percentChange}),2))
	    	//console.log(movingAverages.ma([1, 2, 3, 4, 5], 2));

	    	var change = models.map(function(obj){return obj.percentChange})

	    	tulind.indicators.sma.indicator([change], [3], function(err, results) {
				//console.log("Result of sma is:");
				//console.log(results[0]);
			});  

			tulind.indicators.vidya.indicator([change], [3,7,0.5], function(err, results) {
				//console.log("Result of vidya is:");
				//console.log(results[0]);
				//for (x in results[0]){
					//dataArray.push([Date.parse(models[x].createdAt) -  Date.parse(models[0].createdAt), results[0][x]]);
	    		//}
				//var result = regression.polynomial(dataArray, { order: order, precision: precision });
	    		//console.log(result);

			});  

			console.log(tulind.indicators.bbands)

			//tulind.indicators.sma.start([change])
			//console.log(tulind.indicators.stoch.start([5,3,3]))

			//console.log(models.map(function(obj){return obj.percentChange}))

	    	return result;

	    	//Analysis.create()
	    	//insert into db??
	    	//var predict = result.predict((Date.parse(new Date()) - yesterday)/1000-1000);
	    	//console.log(predict)
	    	//console.log(models);
	    });
	},

	predictiveModelFFT: function(asset1, asset2, delta, limit){
		var fft = require('fft-js').fft;
		var forecast = require('nostradamus')
	   	var dataArray = [];	
	   	var predictions = [];
		var now = new Date(), start = new Date(now.getTime() - (24 * 60 * 60 * 1000));
		var yesterday = Date.parse(start);
	    Data.find({asset1:asset1, asset2:asset2, delta:delta})
	    .sort('createdAt DESC')
	    .limit(limit)
	    .then(function(models){
	    	for (x in models){
				var price = models[x].price;
	    		var date = Date.parse(models[x].createdAt);
	    		var update = date - Date.parse(models[0].createdAt)// - yesterday;
				dataArray.push([date, price]);
	    	}
	    	var phasors=fft(dataArray);
			var string = '';
			//F ( x ) = a /2 + a 1 cos x + b 1 sin x + a 2 cos 2 x + b 2 sin 2 x + ... + a n cos nx + b n sin nx + ...
			for (x in phasors){
				var a = phasors[x][0];
				var b = phasors[x][1];
				if(x==0){string = a+'/2'+ a +'cos(x) + '+b+'sin(x) + ';}
				else{
					//ancos(nx) + bnsin(nx)
					string+=a*x+'cos('+a*x+'*x) + ' + b*x + 'sin('+b*x+'*x) + '
				}
			}
			//console.log(dataArray[0][0], dataArray[dataArray.length-1][0])
			console.log(phasors);
			//console.log(string);
			return phasors;
			//Analysis.create()
			//store fft in db for time periods..
	    });
	},

	cullData: function(delta, time){
		var now = new Date(), start = new Date(now.getTime() - (time));
		console.log(delta, time)
		Data.find()
		.limit(1000)
	    .where({createdAt: {'<': start}, delta:delta})
	    .then(function (data) {
	    	if (data.length > 0){
	    		var idArray = data.map(function(obj) {return obj.id});
	    		console.log(idArray);
				Data.destroy(idArray, function(err, model) {
					console.log(err, model);
					console.log('deleted');
				});
	    	}
	    });  
	},

	tickerREST: function(delta){
	    var poloniex = new Poloniex();  
		poloniex.returnTicker((err, ticker) => {
			if (err) {console.log(err.message)}
			else {
				for (x in Object.keys(ticker)){
					var data = ticker[Object.keys(ticker)[x]]
					var model = {
						assetPair:Object.keys(ticker)[x],
						asset1:Object.keys(ticker)[x].split('_')[0],
						asset2:Object.keys(ticker)[x].split('_')[1],
						price:data.last,
						currentBid:data.highestBid,
						currentAsk:data.lowestAsk,
						delta:delta,
					};
					Data.create(model).then(function(model){
						Data.publishCreate(model);
			            return Data.find({assetPair:model.assetPair, delta: model.delta})
			            .sort('createdAt DESC')
			            .limit(2)
			            .then(function (models) {

			                model.absoluteChange = model.price - models[1].price;
			                model.percentChange = model.absoluteChange/model.price;
			                model.absoluteChangeChange = model.absoluteChange - models[1].absoluteChange;

			                Data.update({id:model.id}, model).exec(function afterwards(err, updated){
			                    console.log(updated[0]);
			                });

			                //TODO: INSERT BUY if delta --

			                var orderModel = {};
			                orderModel.assetPair = model.assetPair;
			                orderModel.asset1 = model.asset1;
			                orderModel.asset2 = model.asset2;
			                orderModel.price = model.price;

			                if (model.percentChange > 0.15){
			                    orderModel.type = 'SELL';
			                    orderModel.amount = 1;
			                    emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'MARKET UPDATE, '+ model.assetPair+' has changed '+model.percentChange+' percent in '+model.delta/1000+' seconds', {data: model});
			                    Order.create(orderModel).then(function(orderModel){
			                    	console.log(orderModel)
			                    });
			                }

			                if (model.percentChange < -0.15){
			                    orderModel.type = 'BUY';
			                    orderModel.amount = 1;
			                    emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'MARKET UPDATE: BUY '+ model.assetPair+' has changed '+model.percentChange+' percent in '+model.delta/1000+' seconds', {data: model});
			                    Order.create(orderModel).then(function(orderModel){
			                    	console.log(orderModel)
			                    });
			                }

			            });
					});
				}
			}
		});
	},

	ticker: function(){
	    var poloniex = new Poloniex();  
	    //var poloniex = new Poloniex('BNYQZ2FT-BQWS8X8M-QJZNJQF9-W9LSHF5I','bdff467ff8f02ee9dd9c3e4576b85b5f241b2f3dd8ed52b9247f12d40e068882a6ad2cf678e0410415c2fcea7e50c228e31aed9de92191c429975da7a1c71725');

		//poloniex.returnCompleteBalances('all', (data) => {
		//	console.log(data);
		//});

		//poloniex.returnBalances((data) => {
		//	console.log(data);
		//});

		//poloniex.returnActiveLoans((data) => {
		//	console.log(data);
		//});

		//poloniex.subscribe('ticker');
		poloniex.subscribe('BTC_ETH');
		//var test = 0;
		//var date = new Date();
		poloniex.on('message', (channelName, data, seq) => {
			//test++
			//console.log(data);
			//var date1 = new Date();
			//console.log(date1-date)
			//setTimeout(
			/*var model = {
				assetPair:data.currencyPair,
				asset1:data.currencyPair.split('_')[0],
				asset2:data.currencyPair.split('_')[1],
				price:data.last,
				currentBid:data.highestBid,
				currentAsk:data.lowestAsk,
				percentChange:data.percentChange,
			};*/

			//console.log(data.currencyPair, data.percentChange);
			//Data.create(model).then(function(model){console.log(model)});

			//if % change in past 10 min is >0 and predicted to rise.. trade into it
			//1 min% 5 min%, 
			//derivitive of exchange fxn
			//second derivitive of exchange fxn -- if positive.. buy asset.. sell when 2nd derivitive is neg-- 
			//buy order when second derivitive of asset exchange rate is positive
			//sell order when second derivitive of asset exchange rate goes from positive to negative. 
			//build fxn out of exchange fxn - build a polynominal ,, -- websocket exchange value . 
			//,1000);
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
	}

};




