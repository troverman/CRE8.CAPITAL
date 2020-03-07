//could be mapping asset relations - save the array every time delta 
//    btc, ltc, eth
//btc   1   x   y
//ltc 1/x   1   z
//eth 1/y  1/z  1
//for assets
    //for asset[x]
//the space of all portfolios

//THIS IS BALANCE MAPPING
module.exports = {
	attributes: {
        id: {type:'string'},
        assetSet: {type: 'json'},
        user: {model: 'user'}
    }
};