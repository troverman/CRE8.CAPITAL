//INTERVAL APP
var App = {
	//REQUIRE
	import:{
		//centralized fork is npm
		//UtilityServiceApp:require'UtilityServiceApp'),
	},
	interval: function(callback, delay) {
	    var self = this;
	    var counter = 0;
	    var start = new Date().getTime();
	    function delayed(){
	        callback(delay); counter ++;
	        var diff = (new Date().getTime() - start) - counter * delay;
	        setTimeout(delayed, delay - diff);
	    }
	    delayed();
	    setTimeout(delayed, delay);
	},
	init:async function(){

		//TODO: UNIFY
		//var marketImage = await marketImageApp.build();
		//neuralNetworkApp.marketImage();
		//intervalServiceApp.interval(marketImageApp.create.bind(null), 300000);//5 MIN
		//dataService.populateStocks();

		//CCUTL | MACHINE 1 
		//POPULATE DATA
		//intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000), 1000);//second
		/*intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5), 1000*5);//5 seconds
		interServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*6), 1000*5*6);//30 seconds
		interServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12), 1000*5*12);//60 seconds
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5), 1000*5*12*5);//5min
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6), 1000*5*12*5*6);//30min
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2), 1000*5*12*5*6*2);//1hr
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2), 1000*5*12*5*6*2*2);//2hr
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*2), 1000*5*12*5*6*2*2*2);//4hr
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3), 1000*5*12*5*6*2*2*3);//6hr
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2), 1000*5*12*5*6*2*2*3*2);//12hr
		intervalServiceApp.interval(dataService.tickerREST.bind(null, 1000*5*12*5*6*2*2*3*2*2), 1000*5*12*5*6*2*2*3*2*2);//24hr

		//TODO: GET / UPDATE BALANCES
		
		//CCUTL2 | MACHINE 2
		//TODO: REALTIME EVENTS & ORDERBOOK

		//CULL DATA
		//intervalServiceApp.interval(dataService.cullData.bind(null, '1000', 30*60*1000), 100000);//second
		/*intervalServiceApp.interval(dataService.cullData.bind(null, '5000', 3*60*60*1000), 100000);//5 seconds
		intervalServiceApp.interval(dataService.cullData.bind(null, '30000', 24*60*60*1000), 100000);//30seconds
		intervalServiceApp.interval(dataService.cullData.bind(null, '60000', 7*24*60*60*1000), 100000);//60sec
		intervalServiceApp.interval(dataService.cullData.bind(null, '300000', 2*7*24*60*60*1000), 100000);//5min
		intervalServiceApp.interval(dataService.cullData.bind(null, '1800000', 2*2*7*24*60*60*1000), 7200000);//30min
		intervalServiceApp.interval(dataService.cullData.bind(null, '3600000', 2*2*7*24*60*60*1000), 7200000);//1hr
		intervalServiceApp.interval(dataService.cullData.bind(null, '7200000', 2*2*2*7*24*60*60*1000), 7200000);//2hr
		intervalServiceApp.interval(dataService.cullData.bind(null, '14400000', 2*2*2*2*7*24*60*60*1000), 7200000);//4hr
		intervalServiceApp.interval(dataService.cullData.bind(null, '21600000', 2*2*2*7*24*60*60*1000), 7200000);//6hr
		intervalServiceApp.interval(dataService.cullData.bind(null, '43200000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//12hr
		intervalServiceApp.interval(dataService.cullData.bind(null, '86400000', 2*2*2*2*2*7*24*60*60*1000), 7200000);//24hr*/
		//intervalServiceApp.interval(dataService.cullTrade.bind(null, 86400000), 100000);//keep for one day

	}
};
module.exports = App;