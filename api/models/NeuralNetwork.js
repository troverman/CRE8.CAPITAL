module.exports = {
	attributes: {
        id: {type:'string'},
        title: {type: 'string', required: true, unique: true},
        networkJson: {type: 'json', required: true},
        delta: {type: 'string'},
        assetPair: {type: 'string'},
        asset1: {type: 'string'},
        asset2: {type: 'string'},
    } 
};

