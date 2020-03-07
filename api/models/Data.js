module.exports = {
	attributes: {
        id: {type:'string'},
        assetPair: {type: 'string'},
        asset1: {type: 'string'},
        asset2: {type: 'string'},
        price: {type: 'string'},
        currentBid:{type: 'string'},
        currentAsk:{type: 'string'},
        delta:{type: 'string'},
        percentChange:{type: 'float', defaultsTo:0},
        absoluteChange:{type: 'float', defaultsTo:0},
        absoluteChangeChange:{type: 'float', defaultsTo:0},
        percentChangeChange:{type: 'float', defaultsTo:0}
    }
};

