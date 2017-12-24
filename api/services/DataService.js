var request = require('request');
//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  
var Poloniex = require('poloniex-api-node');

module.exports = {

	legacyStockTicker: function(){
		var url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json"
		request({
			    url: url,
			    json: true
			}, function (error, response, body) {

			    if (!error && response.statusCode === 200) {
			        var currencyData = body.list.resources;
					for (var key in currencyData) {
			        	var pairData = currencyData[key].resource.fields;
						var name = pairData.name.split("/");
						var price = pairData.price;
						var symbol = pairData.symbol;
						var timeStamp = pairData.ts;
						var utctime = pairData.utctime;
						sails.log(name);
						if (name[0] == 'USD'){
							//sails.log(name[1]);
						}
			    	}
			    }
		});
	},

	cexTicker: function(){
	    var url = "https://cex.io/api/ticker/GHS/BTC";
		request({
			    url: url,
			    json: true
			}, function (error, response, body) {
			    if (!error && response.statusCode === 200) {
			        var tickerData = body;
			        console.log(tickerData);
			    }
		});
	},

	predictiveModelPolynomial: function(assetPair, delta, dataCount, order, precision){

		var regression = require('regression');
		var dataArray = [];	
	   	var predictions = [];

		return Data.find({assetPair:assetPair, delta:delta})
	    .sort('createdAt DESC')
	    .limit(dataCount)
	    .then(function(models){
	    	for (x in models){
				var price = models[x].price;
	    		var date = Date.parse(models[x].createdAt);
				dataArray.push([date, price]);
	    	}

			var result = regression.polynomial(dataArray, { order: order, precision: precision })
	    	console.log(result);
	    	console.log(result.predict(dataArray[dataArray.length-1][0] + 100));
	    	return result;
	    	
	    	//insert into db??
	    	//var predict = result.predict((Date.parse(new Date()) - yesterday)/1000-1000);
	    	//console.log(predict)
	    	//console.log(models);
	    });

	},

	predictiveModelFFT: function(){

		var fft = require('fft-js').fft;
		var forecast = require('nostradamus')
	   	var dataArray = [];	
	   	var predictions = [];
	 
		var now = new Date(), start = new Date(now.getTime() - (24 * 60 * 60 * 1000));
		var yesterday = Date.parse(start);
	    Data.find({assetPair:'BTC_LTC', delta:'1000'})
	    .sort('createdAt ASC')
	    .limit(32)
	    .then(function(models){
	    	for (x in models){

				var price = models[x].price;
	    		var date = Date.parse(models[x].createdAt);
	    		//var update = date - yesterday;
	    		//if (update > 0){
					//writer.write([update/1000, price]);
					dataArray.push([date, price]);
					//dataArray.push(price);

	    		//}

	    	}
			//var signal=ifft(dataArray);
			//console.log(signal);
			//console.log(dataArray);
	    	var phasors=fft(dataArray);
			//console.log(phasors);
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
			//console.log(string);
			//console.log(phasors);
			//store fft in db for time periods..
		
	    });
		
	},

	cullData: function(delta, time){
		var now = new Date(), start = new Date(now.getTime() - (time));
		console.log(delta, time)
		Data.find().limit(1000)
	    .where({createdAt: {'<': start}, delta:delta})
	    .exec(function (err, data) {
	    	for (x in data){
	    		console.log(data[x]);
	    		Data.destroy({id:data[x].id}).then(function(model){console.log(model)});
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
						//percentChange:data.percentChange,
						delta:delta,
					};
					Data.create(model).then(function(model){
						Data.publishCreate(model);
						/*
						 Data.find({assetPair:model.assetPair, delta: model.delta})
				        .sort('createdAt DESC')
				        .limit(2)
				        .then(function (models) {
				            var absoluteChange = model.price - models[1].price;
				            var percentChange = absoluteChange/model.price;
				            var absoluteChangeChange = model.absoluteChange - models[1].absoluteChange;
				            Data.update({id:model.id}, {percentChange:percentChange, absoluteChange:absoluteChange})
				            if (percentChange > 0.2){console.log('send email !!!')}
				        });
						*/
						console.log(model)
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




