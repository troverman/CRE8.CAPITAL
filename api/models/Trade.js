/**
* Data.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        assetPair: {
            type: 'string',
        },
        asset1: {
            type: 'string',
        },
        asset2: {
            type: 'string',
        },
        //rate: {
        //    type: 'string',
        //},
        orderBookAmount: {
            type: 'string',
        },
        //the total ammount of asset in trade
        amount: {
            type: 'string',
        },
        price: {
            type: 'string',
        },
    },

};

