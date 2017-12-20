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
        delta:{
            type: 'string',
        },
        percentChange:{
            type: 'float',
            defaultsTo:0
        },
        absoluteChange:{
            type: 'float',
            defaultsTo:0
        },
        absoluteChangeChange:{
            type: 'float',
            defaultsTo:0
        }
    },

    afterCreate: function (model, next) {

        Data.find({assetPair:model.assetPair, delta: model.delta})
        .sort('createdAt DESC')
        .limit(2)
        .then(function (models) {
            var absoluteChange = model.price - models[1].price;
            var percentChange = absoluteChange/model.price;
            var absoluteChangeChange = absoluteChange - models[1].absoluteChange;
            console.log(absoluteChange,percentChange,absoluteChangeChange)
            Data.update({id:model.id}, {percentChange:percentChange, absoluteChange:absoluteChange})/*, absoluteChangeChange: absoluteChangeChange*/
            if (percentChange > 0.2){console.log('send email !!!')}
        });
        return next(null, model);


        //update the appropiate asset .. for asset maps.
        //update percent change (and change^2) here -- with respect to delta and pair - do the cal of the one before. :) 
        //email if percent change is greater than 20%? 
        //do a trade.. hmm..
        //email trade execution confirm. 
        //exchange array

    },

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

