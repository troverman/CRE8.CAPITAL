var Q = require('q');

var tradingPairs = [
    'XRP/BTC',
    'ETH/BTC',
    'BTC/USDT',
    'LTC/BTC',
    'BCH/BTC',
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


function hasUndefined(a) {
    return a.indexOf() !== -1;
};

function clone(a) {
   return JSON.parse(JSON.stringify(a));
};

function getData(limit, delta, tradingPair){
	console.log(tradingPair);
    var defered = Q.defer();
    Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]})
	.limit(limit)
	.sort('createdAt DESC')
	.then(function(models){
		console.log(tradingPair);
		defered.resolve(models.reverse());
	});
    return defered.promise;
};


module.exports = {

	portfolioBalance: function(req, res) {

		//limit to btc for now.. 
		var exchangeMap = [];
		var promises = [];

		var initPortfolio, currentPortfolio = {BTC:req.query.btc}

		var limit = req.query.limit;
		var delta = req.query.delta;
		
		var selectedValues = [];
		var portfolioSet = [];
		var orderSet = [];

		var totalChange = 0;
		var smallestChange = 0;
		var largestChange = 0;

		tradingPairs = tradingPairs.filter(function(obj){
	        if (obj.split('/')[1]=='BTC'){return obj}
	    });

		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(limit, delta, tradingPair);
		    promises.push(promise);
		});

		Q.all(promises)
		.then(function(data){
			
			exchangeMap = data.reverse();

			//gotta compare 
			//exchangeMap[0][1]
			//exchangeMap[1][1]
			//exchangeMap[2][1]
			//portfolioMap 

			//exchangeMap.reverse();

			//if something starts losing money.. sell to btc.
			//if something is gaining, buy

			//TODO: efficencicy redux
			for (y in exchangeMap[0]){

				var timeArray = [];
				var predictionArray = [];

				//if (y == 0){currentPortfolio = initPortfolio;}
				//else{currentPortfolio = portfolioInstance;}

				for (x in exchangeMap){
					//iterate though-- then iterate though.
					timeArray.push(exchangeMap[x][y]);
					predictionArray.push(exchangeMap[x][parseInt(y)+1]);
					if (!hasUndefined(timeArray)){
						//console.log(currentPortfolio)
						if(!currentPortfolio[exchangeMap[x][y].asset1]){currentPortfolio[exchangeMap[x][y].asset1]=0}
						if(!currentPortfolio[exchangeMap[x][y].asset2]){currentPortfolio[exchangeMap[x][y].asset2]=0}
					}
					//if holding assets. and it is depreciating.. sell
					//if (exchangeMap[x][y].percentChange < 0){
					//}
					//console.log(parseInt(y)+1, y, exchangeMap[x].length)
					//console.log(exchangeMap[x][parseInt(y)+1])
				}
				if (!hasUndefined(predictionArray)){

					var currentSmallest = Math.min.apply(Math, timeArray.map(function(obj){return obj.percentChange}));
					var currentLargest = Math.max.apply(Math, timeArray.map(function(obj){return obj.percentChange}));

					var currentSmallestIndex = timeArray.map(function(obj){return obj.percentChange}).indexOf(currentSmallest);
					var currentLargestIndex = timeArray.map(function(obj){return obj.percentChange}).indexOf(currentLargest);

					var predictedSmallest = Math.min.apply(Math, predictionArray.map(function(obj){return obj.percentChange}));
					var predictedLargest = Math.max.apply(Math, predictionArray.map(function(obj){return obj.percentChange}));

					var predictedSmallestIndex = predictionArray.map(function(obj){return obj.percentChange}).indexOf(predictedSmallest);
					var predictedLargestIndex = predictionArray.map(function(obj){return obj.percentChange}).indexOf(predictedLargest);

					if (currentSmallestIndex != -1){
						selectedValues.push(timeArray[currentSmallestIndex]);
					}
					if (currentLargestIndex != -1){
						selectedValues.push(timeArray[currentLargestIndex])
					}
					//MAXIMIZE exosure to %gain
					smallestChange+=currentSmallest;
					largestChange+=currentLargest;
					//console.log(smallestChange);
					console.log(largestChange);

					//TODO: STRAT
					//reset trade to btc :D
					//go to btc
					for (n in Object.keys(currentPortfolio)){
						var pairIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(Object.keys(currentPortfolio)[n]);
						if (pairIndex != -1){
							if (Object.keys(currentPortfolio)[n] != 'BTC' && currentPortfolio[Object.keys(currentPortfolio)[n]] != 0){
								//console.log('PLACE ORDER.. TRADE', currentPortfolio[Object.keys(currentPortfolio)[n]], timeArray[pairIndex].asset2, 'for', currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price), predictionArray[predictedLargestIndex].asset1)
								orderSet.push({asset1: timeArray[pairIndex].asset2, asset2:timeArray[pairIndex].asset1, price:parseFloat(timeArray[pairIndex].price), amount:currentPortfolio[Object.keys(currentPortfolio)[n]]})
								currentPortfolio[predictionArray[predictedLargestIndex].asset1] += currentPortfolio[Object.keys(currentPortfolio)[n]]*parseFloat(timeArray[pairIndex].price);
								currentPortfolio[Object.keys(currentPortfolio)[n]] = 0;
								portfolioSet.push(clone(currentPortfolio));
								console.log(currentPortfolio);
							}
						}
					};
					//all in on predicted (actual-->for solving) next highest 
					if (predictedLargestIndex != -1){
						//console.log(predictionArray[predictedLargestIndex]);
						var currentIndex = timeArray.map(function(obj){return obj.asset2}).indexOf(predictionArray[predictedLargestIndex].asset2);
						if(predictionArray[predictedLargestIndex].percentChange != 0){
							//console.log('PLACE ORDER.. TRADE', currentPortfolio[predictionArray[predictedLargestIndex].asset1], predictionArray[predictedLargestIndex].asset1, 'for', currentPortfolio[predictionArray[predictedLargestIndex].asset1]/parseFloat(timeArray[currentIndex].price), predictionArray[predictedLargestIndex].asset2)
							orderSet.push({asset1: predictionArray[predictedLargestIndex].asset1, asset2:predictionArray[predictedLargestIndex].asset2, price:parseFloat(timeArray[currentIndex].price), amount:currentPortfolio[predictionArray[predictedLargestIndex].asset1]})
							currentPortfolio[predictionArray[predictedLargestIndex].asset2] += currentPortfolio[predictionArray[predictedLargestIndex].asset1]/parseFloat(timeArray[currentIndex].price);
							currentPortfolio[predictionArray[predictedLargestIndex].asset1] = 0;
							portfolioSet.push(clone(currentPortfolio));
						}
					}
					console.log(y, currentPortfolio);
				}

			}

			console.log(portfolioSet);
			console.log(orderSet);
			res.json({portfolioSet:portfolioSet, orderSet:orderSet})

		});



	},


	
};