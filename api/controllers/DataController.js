var request = require('request');
var Poloniex = require('poloniex-api-node');
var tulind = require('tulind');
var Q = require('q');
const ccxt = require ('ccxt')

function getData(limit, delta, tradingPair){
    var defered = Q.defer();
    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]})
	.limit(1)
	.sort('createdAt DESC')
	.then(function(models){
		defered.resolve(models.reverse());
	});
    return defered.promise;
};


module.exports = {

	getData: function(req, res){
		var delta = req.query.delta;
		var asset1 = req.query.asset1;
		var asset2 = req.query.asset2;
		var limit = req.query.limit;
		var skip = req.query.skip;
		var sort = 'createdAt DESC';
		var indicator = req.query.indicator;
		var indicatorOption = req.query.indicatorOption;

		//TODO: max limit query size DDOS
		Data.find({delta:req.query.delta, asset1:req.query.asset1, asset2:req.query.asset2})
		.limit(limit)
		.skip(skip)
		.sort(sort)
		.then(function(dataModel){
			Data.subscribe(req, dataModel);
			Data.watch(req);
			res.json(dataModel);
		});
	},

	buildMarketImage: function(req, res){

	    const orderBookTensorObj = [];
		const marketImage = [];

		var initPromiseSet = [];
		for (x in ccxt.exchanges){
			if (ccxt.exchanges[x] == 'poloniex'){
				const exchange = new ccxt[ccxt.exchanges[x]]();
				if (exchange.hasFetchOrderBook){
					initPromiseSet.push(exchange.loadMarkets().catch((err) => {console.log('shh', exchange.id)}));
					exchange.orderBooks = [];
					marketImage.push(exchange);
				}
			}
		}

		Q.all(initPromiseSet).then(()=>{
			var marketSpace = [];
			for (x in marketImage){
				if (marketImage[x].markets){
					var markets = Object.keys(marketImage[x].markets).map((obj)=>obj.split('/'));
					markets = [].concat.apply([], markets);
					marketSpace.push(markets);
					var uniqueMarkets = Object.keys(marketImage[x].markets).map((obj)=>obj.split('/'));
					uniqueMarkets = [].concat.apply([], uniqueMarkets);
					uniqueMarkets = Array.from(new Set(uniqueMarkets));
					marketImage[x].uniqueMarkets = uniqueMarkets;
					var orderBookPromiseSet = [];
					for (const z in Object.keys(marketImage[x].markets)){
						var orderBookPromise = marketImage[x].fetchOrderBook(Object.keys(marketImage[x].markets)[z])
						.then((data)=>{
							var obj = {
								market:Object.keys(marketImage[x].markets)[z], 
								data:data, 
								exchange:marketImage[x].id
							};
							marketImage[x].orderBooks.push(obj)
							return obj;
						})
						.catch((err) => {console.log('shh', err)});
						orderBookPromiseSet.push(orderBookPromise);
					}
				}
			}

			marketSpace = [].concat.apply([], marketSpace);
			marketSpace = Array.from(new Set(marketSpace));

			for (y in marketSpace){
				orderBookTensorObj.push({name:marketSpace[y], data:[]});
				for (z in marketSpace){
					orderBookTensorObj[y].data.push({name:marketSpace[z], orderBooks:[]})
				}
			}

			Q.all(orderBookPromiseSet).then((orderBooks)=>{
				for (x in marketImage){
					for (y in marketImage[x].uniqueMarkets){
						var rootIndex = orderBookTensorObj.map(obj=>(obj.name)).indexOf(marketImage[x].uniqueMarkets[y]);
						for (z in marketImage[x].uniqueMarkets){
							var pairIndex = orderBookTensorObj[rootIndex].data.map(obj=>(obj.name)).indexOf(marketImage[x].uniqueMarkets[z]);
							var pair = marketImage[x].uniqueMarkets[y]+'/'+marketImage[x].uniqueMarkets[z];
							var pairInverse = marketImage[x].uniqueMarkets[z]+'/'+marketImage[x].uniqueMarkets[y];
							var orderBookIndex = marketImage[x].orderBooks.map(obj=>(obj.market)).indexOf(pair);
							var orderBookIndexInverse = marketImage[x].orderBooks.map(obj=>(obj.market)).indexOf(pairInverse);
							if (orderBookIndex != -1){
								orderBookTensorObj[rootIndex].data[pairIndex].orderBooks.push({
									name:marketImage[x].id, 
									information:{}, 
									bids:marketImage[x].orderBooks[orderBookIndex].data.bids, 
									asks:marketImage[x].orderBooks[orderBookIndex].data.asks
								});
							}
							if (orderBookIndexInverse != -1){
								orderBookTensorObj[rootIndex].data[pairIndex].orderBooks.push({
									name:marketImage[x].id, 
									information:{}, 
									bids:marketImage[x].orderBooks[orderBookIndexInverse].data.asks.map(obj=>{return 1/obj[0]}), 
									asks:marketImage[x].orderBooks[orderBookIndexInverse].data.bids.map(obj=>{return 1/obj[0]})
								});
							}
						}
					}
				}

				res.json(orderBookTensorObj)

			});

		});

	},

	getSomeMarketImage:function(req, res){

		var delta = toString(req.query.delta) || '300000'; //5MIN
		var limit = parseInt(req.query.delta) || 288; //PAST DAY IN 5MIN
		var skip = parseInt(req.query.delta) || 0;
		var sort = req.query.delta || 'createdAt DESC';

		console.log(delta,limit,skip,sort)

		MarketImage.find({delta:delta})
		.limit(limit)
		.skip(skip)
		.sort(sort)
		.then((marketImageModels)=>{
			res.json(marketImageModels);
		});	

	},

	getLatestData: function(req, res){
		var promises = [];
		tradingPairs = tradingPairs.filter(function(obj){
	        if (obj.split('/')[1]=='BTC'){return obj}
	    });
		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(1, '5000', tradingPair);
		    promises.push(promise);
		});
		Q.all(promises)
		.then(function(data){
			res.json(data);
		});
	},

	getExchangeMap: function(req, res){
		var promises = [];
		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(100, '5000', tradingPair);
		    promises.push(promise);
		});
		Q.all(promises)
		.then(function(data){
			res.json(data);
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

};