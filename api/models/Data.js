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
        },
        //percentChangeChange:{
        //    type: 'float',
        //    defaultsTo:0
        //}
    },


    //slows down the 1sec granularity..
   /* afterCreate: function (model, next) {

        if (model.delta >= 30000){
            Data.find({assetPair:model.assetPair, delta: model.delta})
            .sort('createdAt DESC')
            .limit(2)
            .then(function (models) {
                model.absoluteChange = model.price - models[1].price;
                model.percentChange = model.absoluteChange/model.price;
                model.absoluteChangeChange = model.absoluteChange - models[1].absoluteChange;
                console.log(model);

                return Data.update({id:model.id}, model).exec(function afterwards(err, updated){
                    console.log(updated, 'UPDATED');
                    return next(null, model);
                });

                var orderModel = {};
                orderModel.assetPair = model.assetPair;
                orderModel.asset1 = model.asset1;
                orderModel.asset2 = model.asset2;
                orderModel.price = model.price;

                if (model.percentChange > 0.15){
                    orderModel.type = 'SELL';
                    orderModel.amount = 1;
                    emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'MARKET UPDATE, '+ model.assetPair+' has changed '+model.percentChange+' percent in '+model.delta/1000+' seconds', {data: model});
                    return Order.create(orderModel).then(function(orderModel){
                        return next(null, model);
                    });
                }
                if (model.percentChange < -0.15){
                    orderModel.type = 'BUY';
                    orderModel.amount = 1;
                    emailService.sendTemplate('marketUpdate', 'troverman@gmail.com', 'MARKET UPDATE: BUY '+ model.assetPair+' has changed '+model.percentChange+' percent in '+model.delta/1000+' seconds', {data: model});
                    return Order.create(orderModel).then(function(orderModel){
                        return next(null, model);
                    });
                }

            });
        }
        else{return next(null, model)}

        //if change goes from negative to zero..  to positive --> buy - sell
        //update the appropiate asset .. for asset maps.
        //update percent change (and change^2) here -- with respect to delta and pair - do the calc of the one before. :) 
        //email if percent change is greater than 20%? 
        //do a trade.. hmm..
        //email trade execution confirm. 
        //exchange array

    },*/

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

