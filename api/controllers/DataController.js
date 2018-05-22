var request = require('request');
var Poloniex = require('poloniex-api-node');
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
		var sort = 'createdAt DESC';//req.query.filter;
		var indicator = req.query.indicator;
		var indicatorOption = req.query.indicatorOption;
		console.log(req.query)
		//var filter;
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