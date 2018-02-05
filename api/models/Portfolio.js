/**
* Portfolio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
        amount: {
            type: 'double',
            required: true
        },
        symbol: {
            type: 'string',
            required: true
        },
        conversionArray: {
            type: 'json',
            required: true
        },
        user: {
            model: 'user'
        }
    },

    afterCreate: function (post, next) {
        // set message.user = to appropriate user model
        Asset.getOne(post.user)
        .spread(function(user) {
            post.user = user;
            next(null, post);
        });
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

