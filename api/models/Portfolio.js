/**
* Portfolio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

//could be mapping asset relations - save the array every time delta 
//    btc, ltc, eth
//btc   1   x   y
//ltc 1/x   1   z
//eth 1/y  1/z  1

//for assets
    //for asset[x]


//...

//the space of all portfolios


module.exports = {

	attributes: {
        assetSet: {
            type: 'json',
        },
        //conversionArray: {
        //    type: 'json',
        //    required: true
        //},
        user: {
            model: 'user'
        }
    },

    getAll: function() {
        return Asset.find()
        .sort({createdAt: 'asc'})
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return Asset.findOne(id)
        .then(function (model) {
            return [model];
        });
    }
};

