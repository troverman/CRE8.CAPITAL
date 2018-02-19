var request = require('request');
//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  
var Poloniex = require('poloniex-api-node');
var movingAverages = require('moving-averages');
var bollingerBands = require('bollinger-bands').boll;
var tulind = require('tulind');
var Q = require('q');

var tradingPairs = [
    'XRP/BTC',
    'ETH/BTC',
    'BTC/USDT',
    'LTC/BTC',
    'BCH/BTC',
	'STR/BTC',
    'XRP/USDT',
    'ETH/USDT',
    'BCH/USDT',
    'XMR/BTC',
    'ZEC/BTC',
    'LTC/USDT',
    'DASH/BTC',
    'ETC/BTC',
    'XEM/BTC',
    'ZEC/USDT',
    'FCT/BTC',
    'ETC/USDT',
    'BTS/BTC',
    'LSK/BTC',
    'DGB/BTC',  
    'EMC2/BTC',
    'NXT/BTC',
    'SC/BTC',
    'POT/BTC',  
    'STRAT/BTC',
    'NXT/USDT',
    'DOGE/BTC',
    'DASH/USDT',
    'XMR/USDT',
    'BCH/ETH',
    'ZRX/BTC',  
    'ARDR/BTC',
    'VTC/BTC',
    'BTM/BTC',  
    'OMG/BTC',
    'MAID/BTC',
    'VRC/BTC',  
    'GNT/BTC',  
    'GAME/BTC',
    'CVC/BTC',  
    'REP/BTC',
    'STEEM/BTC',
    'SYS/BTC',
    'BCN/BTC',
    'LBC/BTC',
    'DCR/BTC',
    'ZEC/ETH',
    'REP/USDT',
    'ETC/ETH',
    'LTC/XMR',
    'ZRX/ETH',
    'RIC/BTC',
    'GNO/BTC',
    'PPC/BTC',
    'GAS/BTC',
    'BURST/BTC',
    'PASC/BTC', 
    'VIA/BTC',
    'FLO/BTC',
    'FLDC/BTC',
    'NEOS/BTC', 
    'OMG/ETH',
    'STORJ/BTC',
    'GNT/ETH',
    'CLAM/BTC', 
    'NAV/BTC',
    'XCP/BTC',
    'LSK/ETH',
    'XBC/BTC',
    'AMP/BTC',
    'OMNI/BTC', 
    'EXP/BTC',
    'GRC/BTC',
    'BLK/BTC',  
    'SBD/BTC',
    'PINK/BTC',
    'NMC/BTC',
    'RADS/BTC', 
    'GNO/ETH',
    'NXC/BTC',
    'XVC/BTC',
    'CVC/ETH',
    'BELA/BTC',
    'NXT/XMR',
    'ZEC/XMR',
    'XPM/BTC',
    'BTCD/BTC', 
    'REP/ETH',
    'BCY/BTC',
    'MAID/XMR', 
    'DASH/XMR', 
    'HUC/BTC',
    'STEEM/ETH',
    'BCN/XMR',
    'BTCD/XMR', 
    'BLK/XMR'
];

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

	//TODO: -- get list of TSF - w periods - for pairs
	//USE IN SOLVER!
	//wanna get the pick(s) for next time delta. :~)
	//wanna start by doing this for the next hour time delta.. start making manual bets..
	getTSF: function(data, period, type){
		var deferred = Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.tsf.indicator([price], [period], function(err, results) {
			//console.log(period)
			//deferred.resolve(results[0]);
			//console.log(results[0][results[0].length-1])
			deferred.resolve(results[0][results[0].length-1])
		});
		return deferred.promise;
	},

	getFOSC: function(data, period, type){
		var deferred = Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.fosc.indicator([price], [period], function(err, results) {
			deferred.resolve(results)
		});
		return deferred.promise;
	},

	getBband: function(data, period, sD){
		var deferred = Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.bbands.indicator([change], [period, sD], function(err, results) {
			deferred.resolve({lower:results[0], middle:results[1], upper:results[2]})
		});
		return deferred.promise;
	},

	getEMA: function(data, period, type){
		var deferred = Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.ema.indicator([price], [period], function(err, results) {
			deferred.resolve(results[0]);
		});
		return deferred.promise;
	},

	getMACD: function(data, shortPeriod, longPeriod, signalPeriod, type){
		var deferred = Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.macd.indicator([price], [shortPeriod, longPeriod, signalPeriod], function(err, results) {
			deferred.resolve(results);
		});
		return deferred.promise;
	},

	getRSI: function(data, period, type){
		var deferred = Q.defer();
		var price = data.map(function(obj){return obj.price});
		var change = data.map(function(obj){return obj.percentChange});
		tulind.indicators.rsi.indicator([price], [period], function(err, results) {
			deferred.resolve(results);
		});
		return deferred.promise;
	},

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
		.limit(10000)
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


	//createOrderContinual:function(){
		//create order with 15% down on price at every delta. 
		//cancel last order id if not fuilfilled--> atomic switch to the next. 
	//}

	//TODO: REFACTOR AND PACKAGE
	//I can place continuous orders at the bband indicator
	//-->when filled 'cre8 the order'
	createOrderPoloniex: function(model, user, type){

		var poloniex = new Poloniex('2QVU6DC3-N2H1KRGS-UX29G3S3-LX06N7DF', 'fe4137fa70b12d72b80fcb881bf4ffa9675a7ceec0aff0ffe33f867eeb850c6c01076d809062efaabeed7f54aa9d540ea8ebc7cba9aeaeda9f0eb5f4eecf1206');  

		var orderModel = model;
		orderModel.assetPair = model.assetPair;
		orderModel.asset1 = model.asset1;
		orderModel.asset2 = model.asset2;
		orderModel.price = model.price;
		orderModel.delta = model.delta;
		orderModel.type = type;

		console.log(orderModel);

		//maker, taker
		//poloniex.buy('BTC_LTC', '0.001841667', '1', 0, 0, 1, function(err, model){
		//	console.log(model);
		//});

		//BUY
        //may be better to call poloniex balance vs interal storage?  --> does this need to persist? 
        //TODO: BRIDGE REAL - AND SIMUL
        //TODO: REFACTOR!!!
        if (orderModel.type=='BUY'){
	        Asset.find({user: user, symbol: orderModel.asset1}).then(function(asset){
	            orderModel.amount = (asset[0].amount*0.15)/orderModel.price;//--> this is up to the market maker.. fillOrKill rn. 
	            var asset1Amount = asset[0].amount*0.15;
				//only buy if more than .0001 btc
				//if statements here
				if (orderModel.amount>0){

					//maker taker ... 
					//let's do -->immediateOrCancel
					//or place a market order .. just a lil higher. 
					//check out orderBook
					//dataService.returnOrderBook(orderModel.assetPair, 10)
		            poloniex.buy(orderModel.assetPair, orderModel.price.toString(), orderModel.amount.toString(), 0, 1, 0, function(err, model){

						console.log('REAL BUY -- THIS IS FOR DEBUG');
						Data.find({asset1:orderModel.asset1, asset2:orderModel.asset2, delta:orderModel.delta}).limit(1).sort('createdAt DESC').then(function(model){console.log('check the logs -- bid ask spread..'); console.log(model); console.log(orderModel)})
						console.log(model);
						console.log('REAL BUY -- THIS IS FOR DEBUG');

						//if fuilfilled --> 

						Order.create(orderModel).then(function(orderModel){
	            			console.log(orderModel)
	            		});

						Asset.update({user: user, symbol:orderModel.asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
						Asset.find({user: user, symbol: orderModel.asset2}).then(function(asset){

							//FACTOR IN FEES
							var updateAmount = (asset[0].amount + orderModel.amount) - (orderModel.amount)*0.0025;//TAKER; maker is 0.0015
							Asset.update({user: user, symbol: orderModel.asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
							emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'REAL BUY ' + orderModel.asset2, {data: orderModel});

			            });

					});

				}
	        });
		}

        //SELL
		if (orderModel.type=='SELL'){
       		Asset.find({user: user, symbol:orderModel.asset2}).then(function(asset){
	        	orderModel.amount = asset[0].amount*0.15;
	        	var asset1Amount = orderModel.amount*orderModel.price;
	        	//TODO: order percent system wide. re:duplic8
				//only sell if more than .0001 asset
				//if statements here
				//if (orderModel.amount>0){

					//maker taker ... 
					//let's do -->immediateOrCancel --> better than foK
					//or place a market order .. just a lil higher. 
		            poloniex.sell(orderModel.assetPair, orderModel.price.toString(), orderModel.amount.toString(), 0, 1, 0, function(err, model){
						console.log('REAL SELL -- THIS IS FOR DEBUG');
						Data.find({asset1:orderModel.asset1, asset2:orderModel.asset2, delta:orderModel.delta}).limit(1).sort('createdAt DESC').then(function(model){console.log('check the logs -- bid ask spread..'); console.log(model); console.log(orderModel)})
						console.log(model);
						console.log('REAL SELL -- THIS IS FOR DEBUG');
						//if fuilfilled --> 

						Order.create(orderModel).then(function(orderModel){
	            			console.log(orderModel);
	            		});	
						Asset.update({user: user, symbol: orderModel.asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
						Asset.find({user: user, symbol: orderModel.asset1}).then(function(asset){

							var updateAmount = (asset[0].amount + orderModel.amount) - (orderModel.amount)*0.0025;//TAKER; maker is 0.0015
							Asset.update({user: user, symbol: orderModel.asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
							emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'REAL SELL ' + orderModel.asset2, {data: orderModel});

			            });	
					});

				//}
	        });
    	}
        
		//poloniex.sell('BTC_LTC', '.001', 1, fillOrKill, immediateOrCancel,){
		//});

		//poloniex.returnActiveLoans(function(err, model){
		//	console.log(model);
		//})

		//INIT NEW ACCT W REAL BALANCES
		//console.log('sup')
		//poloniex.returnCompleteBalances('all', function(err, model){
		/*poloniex.returnBalances(function(err, model){
			console.log(model)
			for (x in Object.keys(model)){
				var assetModel = {
					user: '5a83602d5ac735000488e8f7',
					symbol: Object.keys(model)[x],
					amount: parseFloat(model[Object.keys(model)[x]]),
				};
				if (assetModel.amount != 0){
					//console.log(assetModel);
					Asset.update({user:assetModel.user, symbol: assetModel.symbol}, assetModel).then(function(model){
						console.log(model)
					})
				}
			}
		});*/

		//returnTradableBalances - margin
		//poloniex.returnTradableBalances(function(err, model){
		//	console.log(model);
		//})

		//marginBuy(currencyPair, rate, amount, lendingRate [, callback])
		//buy(currencyPair, rate, amount, fillOrKill, immediateOrCancel, postOnly [, callback])
		//sell(currencyPair, rate, amount, fillOrKill, immediateOrCancel, postOnly [, callback])
		//cancelOrder(orderNumber [, callback])

		//ex if flash crash --- SUPER MARGIN BUY LOL

	},

	createOrderSimulation: function(model, user, percent){

		var orderModel = model;
		orderModel.assetPair = model.assetPair;
		orderModel.asset1 = model.asset1;
		orderModel.asset2 = model.asset2;
		orderModel.price = model.price;
		orderModel.delta = model.delta;
		orderModel.user = user;

		//TODO: PACKAGE THIS INTO MAIN ORDER PRICE FXN
    	Data.find({delta:orderModel.delta.toString(), asset1:orderModel.asset1, asset2:orderModel.asset2})
		.limit(1)
		.sort('createdAt DESC')
		.then(function(model){

			console.log('FOR DEBUG');
			console.log('BID:', model[0].currentBid); 
			console.log('ASK:', model[0].currentAsk); 
			console.log('SPREAD:', parseFloat(model[0].currentBid) - parseFloat(model[0].currentAsk));
			console.log('ORDER PRICE:', orderModel.price);

			// SELL price needs to be below highest bid
			if (orderModel.type == 'SELL'){
				console.log('SELL');
				console.log('BID PRICE', model[0].currentBid);
				console.log('NEW PRICE', parseFloat(model[0].currentBid) - parseFloat(model[0].currentBid)*.001); //LOOK AT ORDER BOOK! -- take price of closest order
			}

			//BUY price needs to be above lowest ask; dependant on type
			if (orderModel.type == 'BUY'){
				console.log('BUY');
				console.log('ASK PRICE', model[0].currentAsk);
				console.log('NEW PRICE', parseFloat(model[0].currentAsk) + parseFloat(model[0].currentAsk)*.001); //LOOK AT ORDER BOOK! -- take price of closest order
			}

			//OR PLACE ORDER BTW THE SPREAD FOR GOOD 'MARKET ORDER'

			//TEST
			dataService.returnOrderBook(orderModel.assetPair, 10)

		});

		if (orderModel.type == 'SELL'){
	        Asset.find({user:user, symbol: orderModel.asset2}).then(function(asset){
	        	orderModel.amount = asset[0].amount*percent;
	        	var asset1Amount = orderModel.amount*orderModel.price;
				Order.create(orderModel).then(function(orderModel){
	            	console.log(orderModel);
	            });	
				Asset.update({user:user, symbol: orderModel.asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
				Asset.find({user:user, symbol: orderModel.asset1}).then(function(asset){
					var updateAmount = asset[0].amount + asset1Amount;
					Asset.update({user:user, symbol: orderModel.asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
					emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: SELL ' + orderModel.asset2, {data: orderModel});
	            });	
	        });
    	}

		if (orderModel.type == 'BUY'){
	        Asset.find({user:user, symbol: orderModel.asset1}).then(function(asset){
	            orderModel.amount = (asset[0].amount*percent)/orderModel.price;
	            var asset1Amount = asset[0].amount*percent;
				Order.create(orderModel).then(function(orderModel){
	            	console.log(orderModel)
	            });	
				Asset.update({user:user, symbol: orderModel.asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
				Asset.find({user:user, symbol: orderModel.asset2}).then(function(asset){
					var updateAmount = asset[0].amount + orderModel.amount;
					Asset.update({user:user, symbol: orderModel.asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
					emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: BUY ' + orderModel.asset2, {data: orderModel});
	            });	
	        });
    	}
	},

	//save order book? --> orderbook analysis.. can manipulate the price.. hmmm  ie. how real is book
	returnOrderBook: function(assetPair, depth){
		var poloniex = new Poloniex();  
		poloniex.returnOrderBook(assetPair, depth, function(err, data){
			//return data;
			console.log(data);
			//for (x in data.bids){
			//	console.log('bid BTC', data.bids[x][0], 'amount LTC', data.bids[x][1])
			//}
			//for (x in data.asks){
			//	console.log('ask BTC', data.asks[x][0], 'amount LTC', data.asks[x][1])
			//}

			console.log(assetPair, 'highestBid', data.bids[0][0], data.bids[0][1]);
			console.log(assetPair, 'lowestAsk', data.asks[0][0], data.asks[0][1]);

			//SELL price needs to be below highest bid
			console.log('TEST SELL', parseFloat(data.bids[0][0])-parseFloat(data.bids[0][0])*.001);

			//BUY price needs to be above lowest ask; dependant on type 
			//-- gotta make sure there is enought volume on book
			console.log('TEST BUY', parseFloat(data.asks[0][0])+parseFloat(data.asks[0][0])*.001);

			//PLACE MARKET ORDER ABOUT PRICE IN FLASH CRASH TO FUILFIL. TOOMUCH

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
						//baseVolume:baseVolume
						//quoteVolume:quoteVolume
					};
					Data.create(model).then(function(model){
						Data.publishCreate(model);
			            Data.find({assetPair:model.assetPair, delta: model.delta})
			            .sort('createdAt DESC')
			            .limit(2)//change this to 100 --> to get trend.. 
			            .then(function (models) {
			                model.absoluteChange = model.price - models[1].price;
			                model.percentChange = model.absoluteChange/model.price;
			                model.absoluteChangeChange = model.absoluteChange - models[1].absoluteChange;
			                //model.percentChangeChange = (model.absoluteChange - models[1].absoluteChange)/model.absoluteChange;
			                Data.update({id:model.id}, model).exec(function afterwards(err, updated){/*console.log(updated[0]);*/});

			          
							//TODO: WORK ON ORDER....
							//TODO: FLASH CRASH LOGIC!
							//TODO: INJECT SOME INDICATORS?? ANALYIS ~ PDF? --> if saved..
							//THIS IS THE HEARTBEAT.. EVERY DELTA
							//IF STRONG CONFIDENCE
			                var orderModel = {};
			                orderModel.assetPair = model.assetPair;
			                orderModel.asset1 = model.asset1;
			                orderModel.asset2 = model.asset2;
							orderModel.delta = model.delta;
			                orderModel.price = model.price; // this has to do with current bid ask spread.. place order price above/at highest/lowest bid/ask 
			                								// look at market depth -- > to fill order w confidence
			                								// BUY price needs to be above lowest ask
			                								// SELL price needs to be below highest bid
							orderModel.delta = delta;
			                var emailList = ['mphillipsmusic@gmail.com', 'lourens1@ad.unc.edu', 'camcook88@gmail.com', 'jawestgard@gmail.com', 'vazio92@gmail.com', 'evolvedus@gmail.com', 'lahari.ganti.19@gmail.com', 'troverman@gmail.com'];

							//TODO:REFACTOR SECTION..
			                //if model.percentChange < average of last 60 --> floating point
			                //this is based on delta.. do period calc. 
			                //tier based on sD..
			                //dataService.getBband...
			                //mb mix too.
							//IT SHOULD BE BASED ON ORDER N STUFF # too COMPLEX
							//Order.find().limit(10)//-->get last 10 orders with pair 

			                //BUY LOW
			                if (model.percentChange < -0.15){
								for (x in emailList){
									emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE: BUY, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
			                    }
			                    orderModel.type = 'BUY';
			                    //SIMULATION -- could do percent risk based on indicators
								dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.15);
				                //LIVE -- TODO: 
								dataService.createOrderPoloniex(orderModel, '5a83602d5ac735000488e8f7', 'BUY');//type --> FoK, IoC, MO, percent rish
			                }

			                //SELL HIGH
			                if (model.percentChange > 0.15){
			                    for (x in emailList){
									emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
			                    }
			                    orderModel.type = 'SELL';			                  
			                    //SIMULATION
								dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.15);
			                    //LIVE
								dataService.createOrderPoloniex(orderModel, '5a83602d5ac735000488e8f7', 'SELL');
			                }

			                //5 MIN
			                if (delta == '300000'){
			                	//BUY LOW
								if (model.percentChange <= -0.035){
									for (x in emailList){
										emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE: BUY, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
				                    }
									orderModel.type = 'BUY';
									//SIMULATION
									dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.15);
			                	}
			                	//SELL HIGH
								if (model.percentChange >= 0.05){
				                    for (x in emailList){
										emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
				                    }
				                    orderModel.type = 'SELL';
									//SIMULATION
									dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.35);
								}
			                }

			                //FLASH CRASH LOGIC
			                //TODO: REFACTOR
							//30 SEC
			                if (delta == '30000'){
			                	//BUY LOW FLASH DIP
								if (model.percentChange <= -0.035 && model.percentChange > -0.10){
									emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'FLASH DIP: '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
									orderModel.type = 'BUY';
									//SIMULATION
									dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.5);
								}
								//BUY LOW FLASH CRASH
								if (model.percentChange <= -0.10){
									for (x in emailList){
										emailService.sendTemplate('marketUpdate', emailList[x], 'FLASH CRASH: '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
					               	}
									orderModel.type = 'BUY';
					               	//SIMULATION
									dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.5);
									//LIVE
									dataService.createOrderPoloniex(orderModel, '5a83602d5ac735000488e8f7', 'BUY');
									//User.find().then(function(userModel){
										//dataService.createOrder(orderModel, userModel, 'BUY');
									//})
								}
								//SELL HIGH
								if (model.percentChange >= 0.08){//|| or total price incease is some amount of profit
									orderModel.type = 'SELL';
									//SIMULATION
									dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.5);
									//LIVE
									dataService.createOrderPoloniex(orderModel, '5a83602d5ac735000488e8f7', 'SELL');
								}
			                }

			                //TODO.. THIS COULD BE MULTIPLE TIME INTERVALS AFTER ~ rather than just the next. take profit if..?
			                //TODO: LOGIC.. CANT SELL IF DIDNT BUY OR HAVE THE ASSET. 
			                //delta
			                //Order.find({asset1:orderModel.asset1, asset2:orderModel.asset2}).sort('createdAt DESC').limit(2).then(function(order){
			                //});

			                if (models[1].percentChange < -0.05){
								if (models[1].delta == '5000' || models[1].delta == '30000' || models[1].delta == '300000'){
									//if multiple intervals --> create profit taking logic 
									//GET PROTFOLIO.. SAMPLE. to make trading logic.
									if (model.percentChange > 0.05){//|| or totoal price incease is some amount of profit
										//mb hold hold -- 50/50 if 5000-> for more gain
										for (x in emailList){
											emailService.sendTemplate('marketUpdate', emailList[x], 'YOU BOUGHT THE DIP AND TOOK ' + model.percentChange*100 +'% profit', {data: model});
			                    		}
										orderModel.type = 'SELL';
										//SIMULATION,
										//TODO: SYSTEM WIDE?? PERCENT
										dataService.createOrderSimulation(orderModel, '591a95d935ab691100c584ce', 0.88);
									}
								}
			                }

			            });
					});

				}

			}

		});

	},

	//IM GETTING INFINTE GRANULARITY.
	ticker: function(){
	    var poloniex = new Poloniex();  

		//poloniex.returnCompleteBalances('all', (data) => {
		//	console.log(data);
		//});

		//poloniex.returnBalances((data) => {
		//	console.log(data);
		//});

		//poloniex.returnActiveLoans((data) => {
		//	console.log(data);
		//});

		//poloniex.subscribe('footer');
		//poloniex.subscribe('BTC_ETH');
		//poloniex.subscribe('ticker');

		for (x in tradingPairs){
			poloniex.subscribe(tradingPairs[x].split('/')[1]+'_'+tradingPairs[x].split('/')[0]);
		}

		var sum = 0;
		//TODO: SAVE DATA based on TRANSACTION / TICKER -- with caviet of type TICKER / TRANSACTION
		//for delta delieniations cnahge the query logic
		poloniex.on('message', (channelName, data, seq) => {

			//if (channelName === 'BTC_ETH') {
				for (x in data){
					//console.log(data[x])
					if (data[x].type=='orderBook'){
						//console.log(data[x])
					}
					if (data[x].type=='orderBookModify'){
						//data[x].data.type;
						//data[x].data.rate;
						//data[x].data.amount;
					}
					if (data[x].type=='orderBookRemove'){
						//data[x].data.type;
						//data[x].data.rate;
						//data[x].data.amount;
					}
					if (data[x].type=='newTrade'){
						var orderModel = {
							tradeId: data[x].data.tradeID,
							type: data[x].data.type,
							rate: data[x].data.rate,
							amount: data[x].data.amount,
							total: data[x].data.total,
						}
						sum++;
						console.log(sum);
						//console.log(orderModel.type, orderModel.rate, orderModel.amount, orderModel.total);
						if (orderModel.type == 'buy'){
							console.log('BUY', orderModel.amount, channelName.split('_')[1], '@', orderModel.rate, 'total', channelName.split('_')[0], orderModel.total);
						}
						if (orderModel.type == 'sell'){
							console.log('SELL', orderModel.amount, channelName.split('_')[1], '@', orderModel.rate, 'total', channelName.split('_')[0], orderModel.total);
						}
					}
				}
			
			//}

			if (channelName === 'footer') {
				//console.log(data)
			}

			//too slow
			//or it's for every change?? on the market?? -- store a db here/ 
			if (channelName === 'ticker') {
				//if (data.currencyPair == 'BTC_ETH'){
					//console.log(data);
					//sum++;
					//console.log(sum);
				//}
			}

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




