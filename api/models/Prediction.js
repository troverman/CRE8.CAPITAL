/**
* Post.js
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
        predictionTime: {
            type: 'string',
            required: true
        },
        currentBid:{
            type: 'string',
        },
        currentAsk:{
            type: 'string',
        },
        predictedBid:{
            type: 'string',
        },
        predictedAsk:{
            type: 'string',
        },
        timeStamp:{
            type: 'string',
        },
        actualBid:{
            type: 'string',
        },
        actualAsk:{
            type: 'string',
        },       
    },

    getOne: function(id) {
        return Asset.findOne(id)
        .then(function (model) {
            return [model];
        });
    },

    getAll: function() {
        return Asset.find()
        .sort({createdAt: 'asc'})
        .then(function (models) {
            return [models];
        });
    },

};

