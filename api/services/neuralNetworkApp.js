//NEURAL NETWORK APP
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const synaptic = require('synaptic');
	const Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

module.exports = {

	marketImage:async function(){

		var orderBookTensorObj = await marketImageApp.build();

		//REPACKAGE NN
		//BREAK DOWN TO TENSOR
		const tensor = [];

		for (x in orderBookTensorObj){
			tensor.push([]);
			for (y in orderBookTensorObj[x].data){
				tensor[x].push([]);
				if (orderBookTensorObj[x].data[y].orderBooks.length > 0 && orderBookTensorObj[x].data[y].orderBooks[0].bids.length > 0){
					for (z in orderBookTensorObj[x].data[y].orderBooks){
						tensor[x][y].push([])
						//TODO: SECOND ORDER
						tensor[x][y][z].push(orderBookTensorObj[x].data[y].orderBooks[z].bids.slice(0, 10),orderBookTensorObj[x].data[y].orderBooks[z].asks.slice(0, 10))
					}
				}
				//HACK
				//TODO: SECOND ORDER
				else{
					tensor[x][y].push([]);
					var bids = [];
					var asks = [];
					for (var i = 0; i < 10; i++){
						bids.push([0,0])
						asks.push([0,0])
					}
					tensor[x][y][0].push(bids,asks);
				}
			}
		}

		//NOW SECOND ORDER..
		//BCN --> BTS
		//BCN --> BTC --> BTS

		//TRAIN ON TIME DOMAIN TOO
		//console.log(JSON.stringify(tensor, null, 4));
		//INPUT; FLATTENED MAKRET TENSOR OVER TIME 
			//ENCODE INDICATORS
			//ENCODE PAINED (WEIGHTED) PROBABILITY DENSITIES OF GOOD PAST PICS 
				//(BASED ON PDF --> THATS THE FEED FORWARD SELF TRAIN)
			//CONNECTS THE MARKET DATA TO PICK INFERRANCE BASED ON ASSET APPRECIATION
		//SAUCE
		//OUTPUT; PROBABILITY DENSITY OF ASSETS
		//ALG TO TRADE --> TURN INTO ORDERS

		//INPUT
		//MARKET TENSOR TIME DOMAIN
		const marketTensor = tf.tensor(tensor[0]);
		console.log(marketTensor);

		//OUTPUT
		//SOLVED PDF TIME DOMAIN
		const random = tf.randomNormal([ 63, 1, 2, 10, 2 ]);

		//FLATTEN INPUT / OUTPUT (PER DOMAIN)
		const flattenInput = marketTensor.flatten();
		const flattenOutput = marketTensor.flatten().reverse();

		//Flattening the output of a convolution+pooling layer pair before a dense layer is another common pattern in neural networks:

		const input = tf.input({shape: [ 2520 ]});
		const denseLayer1 = tf.layers.dense({units: 2520, activation: 'relu'});
		const denseLayer2 = tf.layers.dense({units: 2520, activation: 'softmax'});
		const output = denseLayer2.apply(denseLayer1.apply(input));
		const model = tf.model({inputs: input, outputs: output});

		model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
		model.summary();

		//BATCH SIZE BASED.. 
		model.fit(flattenInput.expandDims(), flattenInput.expandDims(), {
			epochs: 1000000,
			callbacks: {
				onEpochEnd: async (epoch, log) => {
					console.log(`Epoch ${epoch}: loss = ${log.loss}`);
				}
			}
		});

		
	},



	//NN STRAT
	//nn for delta strategy pick
	//nns for the power set of markets and possible traversal paths for time deltas
	//it's simple
	//^^ would thes be enoconded in high dim -> hgh dim interaction? ; we can make sure. ofc
	

	//EXPERIMENTAL NETWORK!
	//var initNetwork = new Architect.Perceptron(2, 10, 8, 6, 4, 2);
	//var experimentalNetwork = new Architect.Perceptron(3, 10, 8, 6, 4, 2);
	//var experimentalNetworkPdf = new Architect.Perceptron(500, 750, 1000, 1250, 1500, 1250, 1000, 750, 500, 250, 150, 100, 50, 25, 15, 10, 8, 5, 3, 100);

	//console.log(tradingPairs.length)--> 97 * 2 -->bid ask + delta == 195
	//total market experiment.. -->
	//USE THE WHOLE MARKET TO PREDICT ONE PAIR
	//USE THE WHOLE MARKET TO PREDICT THE WHOLE MARKET
	//var experimentalNetwork = new Architect.Perceptron(195, 390, 500, 390, 195);
	//var experimentalNetwork = new Architect.Perceptron(195, 390, 500, 650, 450, 400, 350, 333, 500, 250, 225, 210, 205, 210, 200, 205, 195);
	//var experimentalNetworkJson = experimentalNetwork.toJSON();
	//var neuralNetworkModel = {
	//	title:'Experimental time agnostic total market network', 
	//	delta:'Variable', 
	//	assetPair: 'Total Market', 
	//	asset1: 'Total Market', 
	//	asset2: 'Total Market', 
	//	networkJson:experimentalNetworkJson 
	//};
	//console.log(neuralNetworkModel);

	//268, 268.. STACK OVERFLOW
	/*
	var experimentalNetwork = new Architect.Perceptron(268, 536, 357, 313, 300, 295, 280, 268);
	var experimentalNetworkJson = experimentalNetwork.toJSON();
	var neuralNetworkModel = {
		title: 'Experimental total market network: 2hr', 
		delta: '7200000', 
		assetPair: 'Total Market', 
		asset1: 'Total Market', 
		asset2: 'Total Market', 
		networkJson: experimentalNetworkJson 
	};
	neuralNetComplex(neuralNetworkModel, 'Total Market', 'Total Market', '7200000', 10);
	//NeuralNetwork.create(neuralNetworkModel);
	*/

	//NETWORKTRAINER
	/*var models = await NeuralNetwork.find({asset2:'LTC'})
	var agnosticModels = await NeuralNetwork.find({delta:'Agnostic', asset2:'LTC'})
	for (x in models){
		if (models[x].delta == '300000' || models[x].delta == '1800000' || models[x].delta == '3600000'){
			console.log(models[x].asset2)
			timer(neuralNet.bind(null, models[x], models[x].asset1, models[x].asset2, models[x].delta, 10, false), parseInt(models[x].delta));
			for (y in agnosticModels){
				timer(neuralNet.bind(null, agnosticModels[y], agnosticModels[y].asset1, agnosticModels[y].asset2, models[x].delta, 10, true), parseInt(models[x].delta));
			}
		}
	}
	*/
	
	/*
	var timeAgnosticNetwork = new Architect.Perceptron(3, 10, 8, 6, 4, 2);
	var timeAgnosticNetworkJson = timeAgnosticNetwork.toJSON();

	//var timeAgnosticNetwork = new Architect.Perceptron(3, 10, 20, 30, 50, 88, 44, 21, 13, 7, 5, 2);

	for (x in tradingPairs){
		NeuralNetwork.create({title:'Agnostic' + tradingPairs[x], delta:'Agnostic', assetPair: tradingPairs[x], asset1:tradingPairs[x].split('/')[1], asset2:tradingPairs[x].split('/')[0], networkJson:timeAgnosticNetworkJson });
	}
	*/

	//MARKET TO PAIR DIMENSIONALITY REDUCTION
	//MARKET + INDICATORS DIMENSIONALITY REDUCTION
	//MARKET + INDICATORS + DELTA GAP DIMENSIONALITY REDUCTION
	//function neuralNetMarketToPair(networkModel, asset1, asset2, delta, limit){};

	
	//experimental neural net where time is a variable'
	//experimental neural net where currency pair are variable arrays -- > abstract
	//TODO: multiNeuralNet
	//TODO: REDO
	//TODO: DEEP
	//TODO: TENSOR FLOW

	neuralNet: async function(networkModel, asset1, asset2, delta, limit, agnostic){

		console.log(agnostic);

		var myNetwork = Network.fromJSON(networkModel.networkJson);
		var trainer =  new Trainer(myNetwork);
		var models = await Data.find({asset1:asset1, asset2:asset2, delta:delta}).sort('createdAt DESC').limit(limit);

		if (models.length >= 2){//limit){

			//facilitate more granularity 
			//the train index can be like delta something... using grandular data to larger shift
			//delta, aka predictedDelta ~ 10x dataDelta
			//var inputArray = models.reverse().slice(0, 10);
			//var outputArray = models.reverse().slice(20, 30);

			//remove first element
			var inputArray = models.reverse().slice(1);
			//remove last element
			var outputArray = models.reverse().slice(0, -1);

			var trainingSet = [];

			//TODO: should train for percentChange. 
			//TODO: price
			var minBidInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var maxBidInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var minAskInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			var maxAskInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			
			var minPriceInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.price}));
			var maxPriceInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.price}));
			var minPercentChangeInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));

			var minBidOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var maxBidOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var minAskOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			var maxAskOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			
			var minPriceOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.price}));
			var maxPriceOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.price}));
			var minPercentChangeOutput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeOutput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));


			for (x in inputArray){
				var normalizedBidInput = (inputArray[x].currentBid-minBidInput)/(maxBidInput-minBidInput);
				if (isNaN(normalizedBidInput)){normalizedBidInput=0}
				var normalizedAskInput = (inputArray[x].currentAsk-minAskInput)/(maxAskInput-minAskInput);
				if (isNaN(normalizedAskInput)){normalizedAskInput=0}
				var normalizedPriceInput = (inputArray[x].price-minPriceInput)/(maxPriceInput-minPriceInput);
				if (isNaN(normalizedPriceInput)){normalizedPriceInput=0}
				var normalizedPercentChangeInput = (inputArray[x].percentChange-minPercentChangeInput)/(maxPercentChangeInput-minPercentChangeInput);
				if (isNaN(normalizedPercentChangeInput)){normalizedPercentChangeInput=0}

				var normalizedBidOutput = (outputArray[x].currentBid-minBidOutput)/(maxBidOutput-minBidOutput);
				if (isNaN(normalizedBidOutput)){normalizedBidOutput=0}
				var normalizedAskOutput = (outputArray[x].currentAsk-minAskOutput)/(maxAskOutput-minAskOutput);
				if (isNaN(normalizedAskOutput)){normalizedAskOutput=0}
				var normalizedPriceOutput = (inputArray[x].price-minPriceOutput)/(maxPriceOutput-minPriceOutput);
				if (isNaN(normalizedPriceOutput)){normalizedPriceOutput=0}
				var normalizedPercentChangeOutput = (inputArray[x].percentChange-minPercentChangeOutput)/(maxPercentChangeOutput-minPercentChangeOutput);
				if (isNaN(normalizedPercentChangeOutput)){normalizedPercentChangeOutput=0}

				//NORMALIZED TIME
				if (agnostic){
					var normalizedDelta = 1/parseFloat(delta);
					trainingSet.push({input:[normalizedBidInput, normalizedAskInput, normalizedDelta], output:[normalizedBidOutput, normalizedAskOutput]});
					//trainingSet.push({input:[normalizedBidInput, normalizedPriceInput, normalizedAskInput, normalizedPercentChangeInput, normalizedDelta], output:[normalizedBidOutput, normalizedAskOutput, normalizedPriceOutput, normalizedPercentChangeOutput]});
				}
				else{
					trainingSet.push({input:[normalizedBidInput, normalizedAskInput], output:[normalizedBidOutput, normalizedAskOutput]});
				}
				//trainingSet.push({input:[normalizedBidInput, normalizedAskInput], output:[normalizedBidOutput, normalizedAskOutput]});
				//trainingSet.push({input:[normalizedBidInput, normalizedPriceInput, normalizedAskInput, normalizedPercentChangeInput], output:[normalizedBidOutput, normalizedAskOutput, normalizedPriceOutput, normalizedPercentChangeOutput]});
			}

			var dataSet = {
				trainingSet:trainingSet,

				minBidInput:minBidInput,  
				maxBidInput:maxBidInput,  
				minAskInput:minAskInput,  
				maxAskInput:maxAskInput,
				minPriceInput:minPriceInput,  
				maxPriceInput:maxPriceInput,  
				minPercentChangeInput:minPercentChangeInput,  
				maxPercentChangeInput:maxPercentChangeInput,

				minBidInput:minBidOutput,  
				maxBidInput:maxBidOutput, 
				minAskOutput:minAskOutput,  
				maxAskOutput:maxAskOutput, 
				minPriceOutput:minPriceOutput,  
				maxPriceOutput:maxPriceOutput,  
				minPercentChangeOutput:minPercentChangeOutput,  
				maxPercentChangeOutput:maxPercentChangeOutput,
			};
		}

		if (dataSet){

			var minBidInput = dataSet.minBidInput;
			var maxBidInput = dataSet.maxBidInput;
			var minAskInput = dataSet.minAskInput;
			var maxAskInput = dataSet.maxAskInput;
			var minPriceInput = dataSet.minPriceInput;
			var maxPriceInput = dataSet.maxPriceInput;
			var minPercentChangeInput = dataSet.minPercentChangeInput;
			var maxPercentChangeInput = dataSet.maxPercentChangeInput;

			var minBidOutput = dataSet.minBidOutput;
			var maxBidOutput = dataSet.maxBidOutput;
			var minAskOutput = dataSet.minAskOutput;
			var maxAskOutput = dataSet.maxAskOutput;
			var minPriceOutput = dataSet.minPriceOutput;
			var maxPriceOutput = dataSet.maxPriceOutput;
			var minPercentChangeOutput = dataSet.minPercentChangeOutput;
			var maxPercentChangeOutput = dataSet.maxPercentChangeOutput;

			//TODO: tuneup
			trainer.train(dataSet.trainingSet, {
				rate: .25,
				iterations: 20000,
				error: -10000,
				shuffle: false,
				log: 1000000,
				cost: Trainer.cost.MSE,
				schedule: {
					every: 5000,
					do: function(data) {
						console.log(data)
					}
				}
			});
			
			var networkJson = myNetwork.toJSON();

			var updatedNet = await NeuralNetwork.update({id: networkModel.id}, {network:networkJson});

			//TODO: get in lockset with the time interval
			//TODO: seperate trainig from perdicting. 

			//make sure interval of delta
			//var lockStepTime = Date.parse(new Date()) - Date.parse(data[0].createdAt);
			//console.log(lockStepTime);
			//console.log(Date.parse(data[0].createdAt));
			//console.log(Date.parse(new Date()));

			var data = await Data.find({asset1:asset1,asset2:asset2,delta:delta}).sort('createdAt DESC').limit(1);

			//lockstep by waiting til the next interval -- #toomuch rn

			var normalizedBidInput = (data[0].currentBid-minBidInput)/(maxBidInput-minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (data[0].currentAsk-minAskInput)/(maxAskInput-minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}

			//TODO
			var normalizedPriceInput = (data[0].price-minAskInput)/(maxPriceInput-minPriceInput);
			if (isNaN(normalizedPriceInput)){normalizedPriceInput=0}
			var normalizedPercentChangeInput = (data[0].percentChange-minPercentChangeInput)/(maxPercentChangeInput-minPercentChangeInput);
			if (isNaN(normalizedPercentChangeInput)){normalizedPercentChangeInput=0}

			//if (normalizedBidInput==0){normalizedBidInput=0.00001}
			//if (normalizedAskInput==0){normalizedAskInput=0.00001}
			var latestInput = [];
			if (agnostic){latestInput = [normalizedBidInput, normalizedAskInput, 1/parseFloat(delta)];}
			else{latestInput = [normalizedBidInput, normalizedAskInput];}

			console.log(latestInput)
			//normalizedBidInput, normalizedPriceInput, normalizedAskInput, normalizedPercentChangeInput]

			var output = myNetwork.activate(latestInput);

			var denormalizeBid = minBidInput*-1*output[0]+minBidInput+output[0]*maxBidInput;
			var denormalizeAsk = minAskInput*-1*output[1]+minAskInput+output[1]*maxAskInput;
			console.log(output)

			var denormalizePrice = minPriceInput*-1*output[1]+minPriceInput+output[1]*maxPriceInput;
			var denormalizePercentChange = minPercentChangeInput*-1*output[1]+minPercentChangeInput+output[1]*maxPercentChangeInput;

			var predictionModel = {
				normalizeData: {minBidInput:minBidInput, maxBidInput:maxBidInput, minAskInput:minAskInput, maxAskInput:maxAskInput, minPriceInput:null, maxPriceInput:null, minPercentChangeInput:null, maxPercentChangeInput:null},
				assetPair: asset1+'/'+asset2,
				asset1: asset1,
				asset2: asset2,
				delta: delta,
				currentBid: data[0].currentBid,
				currentAsk: data[0].currentAsk,
				currentPrice: data[0].price,
				currentPercentChange: data[0].percentChange,
				predictedBid: denormalizeBid,
				predictedAsk: denormalizeAsk,
				predictedPrice: null,
				predictedPercentChange: null,
				actualPercentChange:null,
				actualPrice:null,
				actualBid:null,
				actualAsk:null,
				timeStamp: data[0].createdAt,
			};

			//console.log(output, asset1, asset2, delta, data[0], predictionModel);

			var predictionModel = await Prediction.create(predictionModel);
			Prediction.publishCreate(predictionModel);
			console.log(predictionModel);

			//TODO: WAIT A BIT!
			//TODO: Update prediction in data create -- eg if there is a prediction in the previous interval. 
			//setTimeout(function () {

			//find created after
			//, createdAt: {'>': Date.parse(data[0].createdAt)}})
			var data = await Data.find({asset1:asset1,asset2:asset2,delta:delta}).sort('createdAt DESC').limit(1);
			
			var predictionModel = await Prediction.update({id:predictionModel.id}, {actualPrice: data[0].price, actualBid: data[0].currentBid, actualAsk: data[0].currentAsk });
			Prediction.publishUpdate(predictionModel[0].id, predictionModel[0]);
			console.log(predictionModel);
			console.log((predictionModel[0].actualBid - predictionModel[0].predictedBid)/parseFloat(predictionModel[0].actualAsk));

			//}, delta*3/2);

		}
		
	},

	//TODO: THINK
	//NEED HUGE MEMORY
	neuralNetComplex: async function(networkModel, asset1, asset2, delta, limit){

		var myNetwork = Network.fromJSON(networkModel.networkJson);
		var trainer =  new Trainer(myNetwork);

		var promises = [];
		tradingPairs = tradingPairs.filter(function(obj){
	        if (obj.split('/')[1]=='BTC'){return obj}
	    });
		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(limit, delta, tradingPair);
		    promises.push(promise);
		});
		var data = await Q.all(promises);

		var trainingSet = [];

		for (y in data){

			var inputArray = data[y].reverse().slice(1);
			var outputArray = data[y].reverse().slice(0, -1);

			//INPUT
			var minBidInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var maxBidInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentBid}));
			var minAskInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			var maxAskInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.currentAsk}));
			var minPriceInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.price}));
			var maxPriceInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.price}));
			var minPercentChangeInput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeInput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));

			//OUTPUT
			var minBidOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var maxBidOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentBid}));
			var minAskOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			var maxAskOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.currentAsk}));
			var minPriceOutput = Math.min.apply(Math, outputArray.map(function(obj){return obj.price}));
			var maxPriceOutput = Math.max.apply(Math, outputArray.map(function(obj){return obj.price}));
			var minPercentChangeOutput = Math.min.apply(Math, inputArray.map(function(obj){return obj.percentChange}));
			var maxPercentChangeOutput = Math.max.apply(Math, inputArray.map(function(obj){return obj.percentChange}));

			var pairTrainingSet = [];

			for (x in inputArray){
				var normalizedBidInput = (inputArray[x].currentBid-minBidInput)/(maxBidInput-minBidInput);
				if (isNaN(normalizedBidInput)){normalizedBidInput=0}
				var normalizedAskInput = (inputArray[x].currentAsk-minAskInput)/(maxAskInput-minAskInput);
				if (isNaN(normalizedAskInput)){normalizedAskInput=0}
				var normalizedPriceInput = (inputArray[x].price-minPriceInput)/(maxPriceInput-minPriceInput);
				if (isNaN(normalizedPriceInput)){normalizedPriceInput=0}
				var normalizedPercentChangeInput = (inputArray[x].percentChange-minPercentChangeInput)/(maxPercentChangeInput-minPercentChangeInput);
				if (isNaN(normalizedPercentChangeInput)){normalizedPercentChangeInput=0}

				var normalizedBidOutput = (outputArray[x].currentBid-minBidOutput)/(maxBidOutput-minBidOutput);
				if (isNaN(normalizedBidOutput)){normalizedBidOutput=0}
				var normalizedAskOutput = (outputArray[x].currentAsk-minAskOutput)/(maxAskOutput-minAskOutput);
				if (isNaN(normalizedAskOutput)){normalizedAskOutput=0}
				var normalizedPriceOutput = (inputArray[x].price-minPriceOutput)/(maxPriceOutput-minPriceOutput);
				if (isNaN(normalizedPriceOutput)){normalizedPriceOutput=0}
				var normalizedPercentChangeOutput = (inputArray[x].percentChange-minPercentChangeOutput)/(maxPercentChangeOutput-minPercentChangeOutput);
				if (isNaN(normalizedPercentChangeOutput)){normalizedPercentChangeOutput=0}

				pairTrainingSet.push({
					input:[normalizedBidInput, normalizedAskInput, normalizedPriceInput, normalizedPercentChangeInput], 
					output:[normalizedBidOutput, normalizedAskOutput, normalizedPriceOutput, normalizedPercentChangeOutput]
				});

			}
			//console.log(pairTrainingSet);
			//pairTrainingSet-->[10]
			trainingSet.push(pairTrainingSet);
			//trainingSet-->[67][10]

		}
		
		//Meh..
		//reduce this 
		var flatSet = [];
		for (y in trainingSet[0]){
			//trainingSet[x]: [10] [{output:1,input:1},...] --> 
			var tempOutput = [];
			var tempInput = [];
			for (x in trainingSet){
				tempOutput.push(trainingSet[x][y].output);
				tempInput.push(trainingSet[x][y].input);
			}
			//flatSet.push({output:tempOutput, input:tempInput});
			var flatInput = [].concat.apply([], tempOutput);
			var flatOutput = [].concat.apply([], tempInput);
			flatSet.push({output:flatOutput, input:flatInput});
		}

		trainer.train(flatSet, {
			rate: .25,
			iterations: 20000,
			error: -10000,
			shuffle: false,
			log: 1000000,
			cost: Trainer.cost.MSE,
			schedule: {
				every: 5000,
				do: function(data) {
					console.log(data)
				}
			}
		});
		
		var networkJson = myNetwork.toJSON();

	},

	//LEGACY
	//REDICTION AS PDF
	createPrediction: async function(limit, delta){
		var predictions = [];
		var promises = [];
		var exchangeMap = [];
		tradingPairs = tradingPairs.filter(function(obj){if (obj.split('/')[1]=='BTC'){return obj}});
		tradingPairs.forEach(function(tradingPair, index){
		    var promise = getData(limit, delta, tradingPair);
		    promises.push(promise);
		});
		var data = await Q.all(promises);
		exchangeMap = data;
		var predictionArray = [];
		for (x in exchangeMap){
			var dataArray = [];
			var pairData = exchangeMap[x];
			var periodArray = [3,5,10,20,40,80];
			var tsfPredictionData = [];

			//TODO: use tsf occlicator to find error with tsf --> build prob / confidence score / range
			for (y in periodArray){tsfPredictionData.push(dataService.getTSF(pairData, periodArray[y]));}

			var data = await Q.all(tsfPredictionData)
			
			//gotta fire at the delta to lock in the price.. -
			//- perhaps fire a slights cheaper.. eg market maker.... 
			//--> market make at a guess of high. ~> take if over estimate --> dont wanna under!  

			var sortedData = data.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
			var low = sortedData[sortedData.length-1];
			var high = sortedData[0];
			var range = high - low;
			var lastPrice = pairData[pairData.length-1].price;
			var changeHigh = (high - lastPrice)/high;
			var changeLow = (low - lastPrice)/low;

			if (changeHigh > 0 && changeLow > 0){
				console.log('PICK', pairData[0].asset1, pairData[0].asset2);
				var orderModel = {};
				orderModel.assetPair = pairData[pairData.length-1].assetPair;
				orderModel.asset1 = pairData[pairData.length-1].asset1;
				orderModel.asset2 = pairData[pairData.length-1].asset2;
				orderModel.price = pairData[pairData.length-1].price;
				orderModel.delta = pairData[pairData.length-1].delta;
				orderModel.type = 'BUY';
				orderModel.amount = 1;
				Order.create(orderModel);
				console.log(orderModel);
			}
			
			//INIT PDF
			//TODO: save pdfs as prediction db
			//populate oppropiately ~ normal dist around 0? liner relation..

			var pdfMap = {};
			for (var i=-1000; i <=1000; i++){
				pdfMap[i/1000] = 0.60811/Math.pow(i, 2);
			}

			var testData = sortedData.map(function(obj){return (obj - lastPrice)/lastPrice});

			for (x in testData){pdfMap[parseFloat(testData[x].toFixed(3))] += 0.1}

			//for (z in tsfPerdictionData){
			//	console.log(tsfPerdictionData[z].state,tsfPerdictionData[z].value);
			//	console.log(tsfPerdictionData[z]);
			//}

			//console.log('length', tsfPerdictionData);

			//get the last element in each period prediction..
			//var predictionSet = [];
			//for (z in tsfPerdictionData){
			//	predictionSet.push(tsfPerdictionData[z][pairData.length-1]);
			//	console.log('predictionSet', predictionSet);
			//}

			//console.log(pairData[0].asset1, pairData[0].asset2, predictionSet);
			//becomes the set for the pair data --> then becomes the set for each pair when selection predictions etc (the potiental future price)

			//var sdArray = [0.1,0.25,0.75,1,1.5,2,3];
			//Bbands do variance.. -- cinfidence in variance.. --> if volitility is x ~ sd - pdf weight

			//14,160 -> highest r2, 4,60
			//var prediction = regression.polynomial(dataArray, { order:14, precision:160 });
			//var predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta));

			//console.log(prediction.r2, predictionData[1], pairData[0].asset1, pairData[0].asset2);
			//predictionArray.push({percentChange: predictionData[1], asset1:pairData[0].asset1, asset2:pairData[0].asset2, });

			//TODO: encoperate set of parameters, and indicators to form a PDF on the price
			//for (x in pairData){
			//	dataArray.push([Date.parse(pairData[x].createdAt) - Date.parse(pairData[0].createdAt), pairData[x].percentChange]);
			//}
			//var change = pairData.map(function(obj){return obj.percentChange});

			/*
			tulind.indicators.bbands.indicator([change], [5,2], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.sma.indicator([change], [3], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.dema.indicator([change], [3], function(err, results) {
				console.log(results);
			});
			*/

			//tulind.indicators.ema.indicator([change], [3], function(err, results) {
			//	console.log(results[0]);
			//}); 
			//tulind.indicators.adx.indicator([change], [3], function(err, results) {
			//	console.log(results);
			//}); 
			/*tulind.indicators.stoch.indicator([change], [3], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.kama.indicator([change], [3], function(err, results) {
				console.log(results);
			}); 
			tulind.indicators.mass.indicator([change], [3], function(err, results) {
				console.log(results);
			});
			tulind.indicators.tsf.indicator([change], [3], function(err, results) {
				console.log(results);
			});
			tulind.indicators.macd.indicator([change], [3], function(err, results) {
				console.log(results);
			});*/
			//tulind.indicators.rci.indicator([change], [3], function(err, results) {
			//	console.log(results);
			//});
			//tulind.indicators.vwma.indicator([change], [3], function(err, results) {
			//	console.log(results);
			//});

			//boilinger band
			//var dataModel = {}
			//datamodel.polynomial = prediction;
			//datamodel.bbands = {};
			//datamodel.sma = {};

		}

		//TODO: efficencicy redux
		/*
		for (y in exchangeMap[0]){
			var dataArray = [];
			var predictionArray = [];
			var pairData = exchangeMap[y];
			console.log(pairData)
			for (x in pairData){
				dataArray.push([Date.parse(pairData[x].createdAt) - Date.parse(pairData[0].createdAt), pairData[x].percentChange]);
			}

			var prediction = regression.polynomial(dataArray, { order: order, precision: precision });
			var predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta))
			//console.log(prediction.string);

			predictionArray.push({percentChange:predictionData, asset1:exchangeMap[y][0].asset1, asset2:exchangeMap[y][0].asset2})

			//var timeArray = [];
			//for (x in exchangeMap){
				//timeArray.push(exchangeMap[x][y]);
				//could train --> loop and push the next as prediction
				//TODO: TRAIN
				//this is training error? --> get confidence in pick
				var dataArray = [];
				for (z in pairData){
					if (z<y){
						dataArray.push([Date.parse(pairData[z].createdAt) - Date.parse(pairData[0].createdAt), pairData[z].percentChange]);
					}
				}
				var prediction = regression.polynomial(dataArray, { order: order, precision: precision });
				var predictionData = -1;
				if(prediction.r2){predictionData = prediction.predict(prediction.points[prediction.points.length-1][0]+parseFloat(delta));}
				predictionArray.push(predictionData[1]);//--> this is oh boi.
				
			//}
		}
		*/
	},

	//LEGACY
	createPredictionSolve: async function(){
		var exchangeMap = data;
		var predictionArray = [];
		for (x in exchangeMap){
			var dataArray = [];
			var pairData = exchangeMap[x];
			var periodArray = [3,5,10,20,40,80];
			var tsfPredictionData = [];
			for (y in periodArray){
				tsfPredictionData.push(dataService.getTSF(pairData, periodArray[y]));
			}
			var data = await Q.all(tsfPredictionData);
			var sortedData = data.sort(function(a,b) {return (a < b) ? 1 : ((b < a) ? -1 : 0);}); 
			var low = sortedData[sortedData.length-1];
			var high = sortedData[0];
			var range = high - low;
			var lastPrice = pairData[pairData.length-1].price;
			var changeHigh = (high - lastPrice)/high;
			var changeLow = (low - lastPrice)/low;
			if (changeHigh > 0 && changeLow > 0){
				//A NOW PICK BASED ON TSF | WHY NOT PLUG IN? --> TIME ?	
			}
		}
	},

	//LEGACY
	getCurrentPrediction: async function(delta, asset1, asset2) {
		var delta = delta;
		var asset1 = asset1;
		var asset2 = asset2;
		var neuralNetworkModel = await NeuralNetwork.find({delta:delta, asset1: asset1, asset2:asset2})
		var myNetwork = Network.fromJSON(neuralNetworkModel[0].networkJson);
		var data = await Data.find({asset1:asset1, asset2:asset2}).limit(1).sort('createdAt DESC');
		var model = {};
		model.data = data[0];
		var lastestPrediction = await Prediction.find({delta:delta, asset1: asset1, asset2: asset2}).limit(1).sort('createdAt DESC');
		if (lastestPrediction.length > 0){
			//console.log(lastestPrediction[0]);
			var normalizedBidInput = (model.data.currentBid - lastestPrediction[0].normalizeData.minBidInput)/(lastestPrediction[0].normalizeData.maxBidInput - lastestPrediction[0].normalizeData.minBidInput);
			if (isNaN(normalizedBidInput)){normalizedBidInput=0}
			var normalizedAskInput = (model.data.currentAsk - lastestPrediction[0].normalizeData.minAskInput)/(lastestPrediction[0].normalizeData.maxAskInput - lastestPrediction[0].normalizeData.minAskInput);
			if (isNaN(normalizedAskInput)){normalizedAskInput=0}
			var latestInput = [normalizedBidInput, normalizedAskInput];
			var output = myNetwork.activate(latestInput);
			var denormalizeBid = lastestPrediction[0].normalizeData.minBidInput*-1*output[0]+lastestPrediction[0].normalizeData.minBidInput+output[0]*lastestPrediction[0].normalizeData.maxBidInput;
			var denormalizeAsk = lastestPrediction[0].normalizeData.minAskInput*-1*output[1]+lastestPrediction[0].normalizeData.minAskInput+output[1]*lastestPrediction[0].normalizeData.maxAskInput;
			model.output = [denormalizeBid, denormalizeAsk];
			//TODO - catalog moving average of error in perdictions to generate confidence score for picks 
			//Probability Density Functions ~ as a prediction?? 
			console.log(model.output[0], model.output[1], asset1, asset2, delta, model.data.currentBid, model.data.currentAsk, (model.data.currentAsk - model.output[0])/model.data.currentAsk, (model.data.currentAsk - model.output[1])/model.data.currentAsk, model.data.percentChange, model.data.percentChange -  (model.data.currentAsk - model.output[1])/model.data.currentAsk);
		}	
	},





};