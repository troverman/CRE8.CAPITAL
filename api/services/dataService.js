var request = require('request');
//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  
var Poloniex = require('poloniex-api-node');
var movingAverages = require('moving-averages');
var bollingerBands = require('bollinger-bands').boll;
var tulind = require('tulind');
var Q = require('q');


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

	//TODO: REFACTOR AND PACKAGE
	createOrder: function(model, user, type){

		var poloniex = new Poloniex('2QVU6DC3-N2H1KRGS-UX29G3S3-LX06N7DF', 'fe4137fa70b12d72b80fcb881bf4ffa9675a7ceec0aff0ffe33f867eeb850c6c01076d809062efaabeed7f54aa9d540ea8ebc7cba9aeaeda9f0eb5f4eecf1206');  

		var orderModel = {};
		orderModel.assetPair = model.assetPair;
		orderModel.asset1 = model.asset1;
		orderModel.asset2 = model.asset2;
		orderModel.price = model.price;
		orderModel.delta = delta;
		orderModel.type = type;

		//maker, taker
		//poloniex.buy('BTC_LTC', '0.001841667', '1', 0, 0, 1, function(err, model){
		//	console.log(model);
		//});

		//BUY
        //may be better to call poloniex balance vs interal storage?  --> does this need to persist? 
        //TODO: BRIDGE REAL - AND SIMUL
        //TODO: REFACTOR!!!
        if (orderModel.type=='BUY'){
	        Asset.find({user: user, symbol: models[0].asset1}).then(function(asset){
	            orderModel.amount = (asset[0].amount*0.15)/orderModel.price;//--> this is up to the market maker.. fillOrKill rn. 
	            var asset1Amount = asset[0].amount*0.15;
				Order.create(orderModel).then(function(orderModel){
	            	console.log(orderModel)
	            });

	            poloniex.buy(orderModel.assetPair, orderModel.price.toString(), orderModel.amount.toString(), 1, 0, 0, function(err, model){
					console.log(model);
				});

				Asset.update({user: user, symbol: models[0].asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
				Asset.find({user: user, symbol: models[0].asset2}).then(function(asset){

					//FACTOR IN FEES
					var updateAmount = (asset[0].amount + orderModel.amount) - (orderModel.amount)*0.0025;//TAKER; maker is 0.0015
					Asset.update({user: user, symbol: models[0].asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
					emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'REAL BUY ' + models[0].asset2, {data: orderModel});

	            });
	        });
		}

        //SELL
		if (orderModel.type=='SELL'){
       		Asset.find({user: user, symbol: models[0].asset2}).then(function(asset){
	        	orderModel.amount = asset[0].amount*0.15;
	        	var asset1Amount = orderModel.amount*orderModel.price;
				Order.create(orderModel).then(function(orderModel){
	            	console.log(orderModel);
	            });	

	            poloniex.sell(orderModel.assetPair, orderModel.price.toString(), orderModel.amount.toString(), 1, 0, 0, function(err, model){
					console.log(model);
				});

				Asset.update({user: user, symbol: models[0].asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
				Asset.find({user: user, symbol: models[0].asset1}).then(function(asset){

					var updateAmount = (asset[0].amount + orderModel.amount) - (orderModel.amount)*0.0025;//TAKER; maker is 0.0015
					Asset.update({user: user, symbol: models[0].asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
					emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'REAL SELL ' + models[0].asset2, {data: orderModel});

	            });	
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
			            .limit(2)
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
			                orderModel.price = model.price;
							orderModel.delta = delta;
			                var emailList = ['lourens1@ad.unc.edu', 'camcook88@gmail.com', 'jawestgard@gmail.com', 'vazio92@gmail.com', 'evolvedus@gmail.com', 'lahari.ganti.19@gmail.com', 'troverman@gmail.com'];

			                //TODO REFACTOR THIS ALL!!
			                //IT SHOULD BE BASED ON ORDER N STUFF # too COMPLEX
			       
			                //BUY LOW
			                if (model.percentChange < -0.15){
								console.log('BUY LOW')
								for (x in emailList){
									emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE: BUY, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
			                    }

			                    orderModel.type = 'BUY';
								//TODO: REFACTOR
			                    Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){
				                    orderModel.amount = (asset[0].amount*0.15)/orderModel.price;
				                    var asset1Amount = asset[0].amount*0.15;
									Order.create(orderModel).then(function(orderModel){
				                    	console.log(orderModel)
				                    });	
									Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
									Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
										var updateAmount = asset[0].amount + orderModel.amount;
										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
										emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: BUY LOW ' + models[0].asset2, {data: orderModel});
				                    });
				                });

				                //THIS IS LIVE ~ OOO
								dataService.createOrder(orderModel, '5a83602d5ac735000488e8f7', 'BUY');

			                }

			                //SELL HIGH
			                if (model.percentChange > 0.15){
			                	console.log('SELL HIGH')
			                    for (x in emailList){
									emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
			                    }

			                    orderModel.type = 'SELL';
								//TODO: REFACTOR
			                    Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
			                    	orderModel.amount = asset[0].amount*0.15;
			                    	var asset1Amount = orderModel.amount*orderModel.price;
									Order.create(orderModel).then(function(orderModel){
				                    	console.log(orderModel);
				                    });	
									Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
									Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){
										var updateAmount = asset[0].amount + asset1Amount;
										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
										emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: SELL HIGH ' + models[0].asset2, {data: orderModel});
				                    });	
			                    });

			                    //THIS IS LIVE ~ OOO
								dataService.createOrder(orderModel, '5a83602d5ac735000488e8f7', 'SELL');


			                }


			                //5 MIN
			                if (delta == '300000'){
			                	//BUY LOW
								if (model.percentChange <= -0.035){
									console.log('BUY LOW');
									for (x in emailList){
										emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE: BUY, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
				                    }

									orderModel.type = 'BUY';
									//TODO: REFACTOR
				                    Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){
					                    orderModel.amount = (asset[0].amount*0.15)/orderModel.price;
					                    var asset1Amount = asset[0].amount*0.15;
										Order.create(orderModel).then(function(orderModel){
					                    	console.log(orderModel)
					                    });	
										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
										Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
											var updateAmount = asset[0].amount + orderModel.amount;
											Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
											emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: BUY LOW ' + models[0].asset2, {data: orderModel});
					                    });
					                });
			                	}

			                	//SELL HIGH
								if (model.percentChange >= 0.05){
				                	console.log('SELL HIGH');
				                    for (x in emailList){
										emailService.sendTemplate('marketUpdate', emailList[x], 'MARKET UPDATE, '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
				                    }

				                    orderModel.type = 'SELL';
									//TODO: REFACTOR
				                    Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
				                    	orderModel.amount = asset[0].amount*0.35;
				                    	var asset1Amount = orderModel.amount*orderModel.price;
										Order.create(orderModel).then(function(orderModel){
					                    	console.log(orderModel);
					                    });	
										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
										Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){
											var updateAmount = asset[0].amount + asset1Amount;
											Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
											emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: SELL HIGH '+ models[0].asset2, {data: orderModel});
					                    });	
				                    });
								}

			                }

			                //FLASH CRASH LOGIC
			                //DO THIS LOL IT HAPPENS LIKE ONCE A DAY
			                //30 SEC
			                //TODO: REFACTOR ASSET ISH
			                if (delta == '30000'){

			                	//BUY FLASHDIP
								if (model.percentChange <= -0.035 && model.percentChange > -0.10){
									emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'FLASH DIP: '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
									orderModel.type = 'BUY';

									Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){

					                    orderModel.amount = (asset[0].amount*0.5)/orderModel.price;
					                    var asset1Amount = asset[0].amount*0.5;

										Order.create(orderModel).then(function(orderModel){
					                    	console.log(orderModel)
					                    });	

										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
										Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
											var updateAmount = asset[0].amount + orderModel.amount;
											Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
											emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: DIP' + models[0].asset2, {data: orderModel});
					                    });	

					                });

								}

								//BUY FLASH CRASH
								if (model.percentChange <= -0.10){
									for (x in emailList){
										emailService.sendTemplate('marketUpdate', emailList[x], 'FLASH CRASH: '+ model.assetPair+' has changed '+model.percentChange*100+'% in '+model.delta/1000+' seconds', {data: model});
					               	}
					               	orderModel.type = 'BUY';

									//TODO: IMPROVE.. MB SLOW
					                Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){

					                	//ALL IN -- do... 88%
					                    //do % by model.percentChange..:D
					                    orderModel.amount = (asset[0].amount*0.5)/orderModel.price;
					                    var asset1Amount = asset[0].amount*0.5;
					                    //TODO -- subtract fees..

					                    //TODO:ORDER USERID
										Order.create(orderModel).then(function(orderModel){
					                    	console.log(orderModel)
					                    });	

										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:asset1Amount}).then(function(model){console.log(model)});
										Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
											var updateAmount = asset[0].amount + orderModel.amount;
											Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:updateAmount}).then(function(model){console.log(model)});
											emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: CRASH ' + models[0].asset2, {data: orderModel});
					                    });	

					                });

									//THIS IS LIVE ~ OOO
									dataService.createOrder(orderModel, '5a83602d5ac735000488e8f7', 'BUY');

								}

								//SELL HIGH
								//REFACTOR..
								//REDO FOR FLASH CRASH.
								if (model.percentChange >= 0.05){//|| or totoal price incease is some amount of profit
									orderModel.type = 'SELL';
				                    Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){
				                    	orderModel.amount = asset[0].amount*0.5;
				                    	var asset1Amount = orderModel.amount*orderModel.price;
									
										Order.create(orderModel).then(function(orderModel){
					                    	console.log(orderModel);
					                    });	

										Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
										Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){
											var updateAmount = asset[0].amount + asset1Amount;
											Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
											emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: SELL '+models[0].asset2, {data: orderModel});
					                    });	

				                    });

				                    //THIS IS LIVE ~ OOO
									dataService.createOrder(orderModel, '5a83602d5ac735000488e8f7', 'SELL');
				                   
								}

			                }

			                //TODO: IMPROVE ~ MAKE IT LIVE ~ TURN ON THE CASH! 
			                //if last time was a flash crash?
			                //if there was an order..?
			                //this is faster than finding the last order.. but want to make sure we 'bought' b4 selling. 
			                //TODO.. THIS COULD BE MULTIPLE TIME INTERVALS AFTER ~ rather than just the next. take profit if..?
			                //TODO: LOGIC.. CANT SELL IF DIDNT BUY OR HAVE THE ASSET. 
			                //TODO: REAL $
			                if (models[1].percentChange < -0.05){

								if (models[1].delta == '5000' || models[1].delta == '30000' || models[1].delta == '300000'){

									//if multiple intervals --> create profit taking logic 
									//GET PROTFOLIO.. SAMPLE. to make trading logic.
									if (model.percentChange > 0.05){//|| or totoal price incease is some amount of profit
										//mb hold hold -- 50/50 if 5000-> for more gain
										orderModel.type = 'SELL';

					                    //TODO: SYSTEM WIDE?? PERCENT
					                    Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}).then(function(asset){

					                    	//ALL IN -- do... 88%
					                    	//do % by model.percentChange..:D
					                    	orderModel.amount = asset[0].amount*0.88;
					                    	var asset1Amount = orderModel.amount*orderModel.price;
					                    	//TODO -- subtract fees..
											//for (x in emailList){
					                    		emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'YOU BOUGHT THE DIP! :D YOU TOOK ' + model.percentChange*100 +'% profit', {data: model});
											//}
											//TODO: FOR REAL MONEY.. CHECK IF PRICE IS WITHIN RANGE STILL (there will be a few (s) change -- and take the market.. factor in fees, make the market? + .00001 or -.00001; not good for fast tho. so take
											Order.create(orderModel).then(function(orderModel){
						                    	console.log(orderModel);
						                    });	

											Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset2}, {amount:orderModel.amount}).then(function(model){console.log(model)});
											Asset.find({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}).then(function(asset){
												var updateAmount = asset[0].amount + asset1Amount;
												Asset.update({user:'591a95d935ab691100c584ce', symbol: models[0].asset1}, {amount:updateAmount}).then(function(model){console.log(model)});
												emailService.sendTemplate('orderCreate', 'troverman@gmail.com', 'CREATE ORDER: SELL ' + models[0].asset2, {data: orderModel});
						                    });	

					                    });
					                    
									}
	
								}

			                }

			            });

					});

				}

			}

		});

	},

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




