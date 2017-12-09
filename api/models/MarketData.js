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
        price: {
            type: 'string',
        },
        currentBid:{
            type: 'string',
        },
        currentAsk:{
            type: 'string',
        },
        percentChange:{
            type: 'string',
        },
    },

    //afterCreate: function (post, next) {
        // set message.user = to appropriate user model
        
    //},

    getAll: function() {
        return Data.find()
        .sort({createdAt: 'asc'})
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return Data.findOne(id)
        .then(function (model) {
            return [model];
        });
    }
};

