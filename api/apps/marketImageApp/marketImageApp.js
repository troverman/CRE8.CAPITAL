//MARKET IMAGE APP
const ccxt = require ('ccxt')
const Q = require('q');
var App = {
	import:{
		ccxt:require('ccxt'),
		Q:require('q')
	},
	build: async function(){
		var defered = App.import.Q.defer();
		const marketObj = {};
		const orderBook = [{
	        name: 'BTC',
	        data:[
	            {name:'LTC', orderBooks:[
	            	{name:'EXHANGE', information:{}, bids:[], asks:[]}
	            ]},
	            {name:'XMR', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
	            {name:'XRP', orderBooks:[{name:'EXHANGE', information:{}, bids:[], asks:[]}]},
	        ],
	    }];
	    const orderBookTensorObj = [];
		const marketImage = [];
		//var exchanges = App.import.ccxt.exchanges.diff(['yunbi','coingi','bcex','allcoin','bibox','wex','flowbtc','xbtce','cointiger','bitfinex'])
		var initPromiseSet = [];
		for (x in App.import.ccxt.exchanges){
			//if (App.import.ccxt.exchanges[x] != 'bitfinex'){
			if (App.import.ccxt.exchanges[x] == 'poloniex'){
				const exchange = new App.import.ccxt[App.import.ccxt.exchanges[x]]();
				//console.log(App.import.ccxt.exchanges[x]);
				if (exchange.hasFetchOrderBook){
					initPromiseSet.push(exchange.loadMarkets().catch((err) => {console.log('shh', exchange.id)}));
					exchange.orderBooks = [];
					marketImage.push(exchange);
				}
			}
		}
		var initPromiseSet = await App.import.Q.all(initPromiseSet);
		var marketSpace = [];

		for (x in marketImage){

			if (marketImage[x].markets){

				var markets = Object.keys(marketImage[x].markets).map((obj)=>obj.split('/'));
				//Flatten
				markets = [].concat.apply([], markets);
				marketSpace.push(markets);

				//MIGHT DEPRECIATE
				var uniqueMarkets = Object.keys(marketImage[x].markets).map((obj)=>obj.split('/'));
				//Flatten
				uniqueMarkets = [].concat.apply([], uniqueMarkets);
				//REMOVE DUPS
				uniqueMarkets = Array.from(new Set(uniqueMarkets));
				marketImage[x].uniqueMarkets = uniqueMarkets;

				//1st order books leaning into 2nd order traversals. 
				//TODO: RATE LIMIT.. ASYNC ETC.
				var orderBookPromiseSet = [];

				for (const z in Object.keys(marketImage[x].markets)){
					//if (z < 2){
					//STORE IN MARKET IMAGE DUDE
					//REPRESENT AS MAPPINGS | ie math; soon
					var data = await marketImage[x].fetchOrderBook(Object.keys(marketImage[x].markets)[z])
					var obj = {
						market:Object.keys(marketImage[x].markets)[z], 
						data:data, 
						exchange:marketImage[x].id
					};
					marketImage[x].orderBooks.push(obj);

				}
			}
		}

		marketSpace = [].concat.apply([], marketSpace);
		//REMOVE DUPS
		marketSpace = Array.from(new Set(marketSpace));

		//BUILD TENSOR
		for (y in marketSpace){
			orderBookTensorObj.push({name:marketSpace[y], data:[]});
			for (z in marketSpace){orderBookTensorObj[y].data.push({name:marketSpace[z], orderBooks:[]})}
		}

		var orderBooks = await App.import.Q.all(orderBookPromiseSet);

		//OLD REFRENCE
		//ABSTRACT --> LINKAGES FOR 2ND ORDER

		//TODO: IMPROVE EFFFECIENCY
		for (x in marketImage){
			for (y in marketImage[x].uniqueMarkets){
				var rootIndex = orderBookTensorObj.map(obj=>(obj.name)).indexOf(marketImage[x].uniqueMarkets[y]);
				for (z in marketImage[x].uniqueMarkets){
					var pairIndex = orderBookTensorObj[rootIndex].data.map(obj=>(obj.name)).indexOf(marketImage[x].uniqueMarkets[z]);
					
					var pair = marketImage[x].uniqueMarkets[y]+'/'+marketImage[x].uniqueMarkets[z];
					var pairInverse = marketImage[x].uniqueMarkets[z]+'/'+marketImage[x].uniqueMarkets[y];

					var orderBookIndex = marketImage[x].orderBooks.map(obj=>(obj.market)).indexOf(pair);
					var orderBookIndexInverse = marketImage[x].orderBooks.map(obj=>(obj.market)).indexOf(pairInverse);

					//THIS IS 1ST ORDER
					if (orderBookIndex != -1){
						orderBookTensorObj[rootIndex].data[pairIndex].orderBooks.push({
							name:marketImage[x].id, 
							information:{}, 
							bids:marketImage[x].orderBooks[orderBookIndex].data.bids, 
							asks:marketImage[x].orderBooks[orderBookIndex].data.asks
						});
					}
					if (orderBookIndexInverse != -1){
						//console.log(orderBookIndex, pair)
						orderBookTensorObj[rootIndex].data[pairIndex].orderBooks.push({
							name:marketImage[x].id, 
							information:{}, 
							//1/ swap.. rn same.
							//THIS IS NOT ALWAYS GOOD.............
							bids:marketImage[x].orderBooks[orderBookIndexInverse].data.asks.map(obj=>{return 1/obj[0]}), 
							asks:marketImage[x].orderBooks[orderBookIndexInverse].data.bids.map(obj=>{return 1/obj[0]})
						});
					}


				}
			}
		}

		//console.log(orderBookTensorObj);
		//console.dir(orderBookTensorObj,{depth:null});
		//console.log(JSON.stringify(orderBookTensorObj, null, 4));

		defered.resolve(orderBookTensorObj);
		return defered.promise;

		//TODO: AFTER WE HAVE THE OBJECT BUILT
		//TODO: CONNECT SOCKETS: BUILD WITH TICKERS;
		//TODO: LISTEN TO EVENTS

		//for (x in marketImage){
		//	if (marketImage[x].markets){
		//		for (y in marketImage[x].markets){
		//			console.log(marketImage[x].hasfetchTicker);
		//		}
		//	}
		//}

		//TRAVERSE THE MARKET
		//TRANS EXCHANGE . INNEREXCHANGE; 
		//if no direct. 
			//require some formalism in obj. need pluralistic concept for create; array travers do transitive mult 
				//MAP THE TIME DOMAIN
	},
	//TODO: build market tensor -- graph | SAVE EACH ASSET
	//TODO: CCXT APP
	build2: async function(){
	    const orderBookTensorObj = [];
		const marketImage = [];
		var initPromiseSet = [];
		for (x in App.import.ccxt.exchanges){
			if (App.import.ccxt.exchanges[x] == 'poloniex'){
				const exchange = new App.import.ccxt[App.import.ccxt.exchanges[x]]();
				if (exchange.hasFetchOrderBook){
					initPromiseSet.push(exchange.loadMarkets().catch((err) => {console.log('shh', exchange.id)}));
					exchange.orderBooks = [];
					marketImage.push(exchange);
				}
			}
		}
		var initPromiseSet = await App.import.Q.all(initPromiseSet);
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
					var orderBookPromise = await marketImage[x].fetchOrderBook(Object.keys(marketImage[x].markets)[z])
					var obj = {
						market:Object.keys(marketImage[x].markets)[z], 
						data:data, 
						exchange:marketImage[x].id
					};
					marketImage[x].orderBooks.push(obj)
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
		var orderBooks = await App.import.Q.all(orderBookPromiseSet);
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
		//need to sort keys by albpabetical order . . . 
		//convert to tensor :> 
		//TRAIN SOON!
		var model = {
			delta:300000,
			orderBook:orderBookTensorObj
			//change is pointwise subtraction
			//lastPrice / /
		};
		var newMarketImage = await MarketImage.create(model);
		console.log(newMarketImage);
		//I/O WITH MARKET IMAGE AND Connections / market-market []=[]
	},
};
module.exports = App;