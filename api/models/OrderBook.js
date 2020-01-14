/**
* OrderBook.js
*/

module.exports = {

    attributes: {
        id: {type:'string'},
        exchange: {
            type: 'string',
        },        
        assetPair: {
            type: 'string',
        },
        asset1: {
            type: 'string',
        },
        asset2: {
            type: 'string',
        },
        bids:{
            type: 'json',
        },
        asks:{
            type: 'json',
        },   
    },

};

