var App = {
    import:{
        Q: require('q')
    },
    static:{
        tradingPairs: [
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
        ]
    },
	getTrade: async function(input, output){
		var asset1 = input.query.asset1;
		var asset2 = input.query.asset2;
		var limit = input.query.limit;
		var skip = input.query.skip;
		var sort = 'createdAt DESC';
		var startTime = input.query.startTime;
		var endTime = input.query.endTime;
		//trade freq and size.. sum is what is up
		//TODO: ERUDITE CULLING, BRACKET GET BASED ON DATE ~ DATA MODEL ~ INF GRANULARITY.. DELTA - DELTA BADED ON GET BRACKET
		//{ '>': new Date('2/4/2014'), '<': new Date('2/7/2014') } 
		var tradeModel = await Trade.find({asset1:input.query.asset1, asset2:input.query.asset2})//, createdAt: {'>': startTime, '<': endTime}}).limit(limit).skip(skip).sort(sort)
		Trade.subscribe(req, tradeModel);
		Trade.watch(req);
		output.json(tradeModel);
	},
	getExchangeMap: async function(input, output){ 
            function getTrade(limit, tradingPair){
                  var defered = App.import.Q.defer();
                  Data.find({delta:delta, asset1:tradingPair.split('/')[1], asset2:tradingPair.split('/')[0]}).limit(1).sort('createdAt DESC').then(function(models){defered.resolve(models.reverse());});
                  return defered.promise;
            };
		var promises = [];
		App.static.tradingPairs.forEach(function(tradingPair, index){var promise = getTrade(1, tradingPair); promises.push(promise);});
		var data = await App.import.Q.all(promises)
		output.json(data);
	}
};
module.exports = App;