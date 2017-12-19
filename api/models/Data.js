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
        delta:{
            type: 'string',
        }
    },

    //afterCreate: function (data, next) {
        //update the appropiate asset .. for asset maps.
        //exchange array
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

