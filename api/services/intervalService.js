var request = require('request');
//var sylvester = require('sylvester'),  
	//Matrix = sylvester.Matrix,  
	//Vector = sylvester.Vector;  


function ticker(){

	var url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json"
	//https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fd%2Fquotes.csv%3Fe%3D.csv%26f%3Dnl1d1t1%26s%3Dusdeur%3DX%22%3B&format=json&callback=

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

						//sails.log(name);

						if (name[0] == 'USD'){
							sails.log(name[1]);
						}

						//sails.log(price);

						//sails.log(timeStamp);


			    	}

			    }
		});

};


function BTC(){

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

} 



module.exports.intervalService = function(){

	ticker();

};