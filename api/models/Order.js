/**
* Order.js
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
        type:{
            type: 'string',
        },
        price:{
            type: 'string',
        },
        amount:{
            type: 'float',
        },
    },

    //AfterCreate --> tweet via investinfor perdictionBot --~~>

     afterCreate: function (model, next) {

        console.log('ORDER CREATE')
        return next(null, model);

    },

    getOne: function(id) {
        return Order.findOne(id)
        .then(function (model) {
            return [model];
        });
    },

    getAll: function() {
        return Order.find()
        .sort({createdAt: 'asc'})
        .then(function (models) {
            return [models];
        });
    },

};

