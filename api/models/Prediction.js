/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        id:{type:'string'},
        //TODO: link to connect Data model. -- lotsa replication;
        //TODO: investigate.
        normalizeData: {
            type: 'json',
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
        delta: {
            type: 'string',
        },
        currentPercentChange:{
            type: 'string',
        },
        currentPrice:{
            type: 'string',
        },
        currentBid:{
            type: 'string',
        },
        currentAsk:{
            type: 'string',
        },
        predictedPercentChange:{
            type: 'string',
        },
        predictedPrice:{
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
        actualPercentChange:{
            type: 'string',
        },
        actualPercentChange:{
            type: 'string',
        },
        actualBid:{
            type: 'string',
        },
        actualAsk:{
            type: 'string',
        }, 
        pdf:{
            type: 'json',
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

