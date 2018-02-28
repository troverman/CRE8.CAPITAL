/**
* OrderBook.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
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
            type: 'array',
        },
        asks:{
            type: 'array',
        },   
    },

};

