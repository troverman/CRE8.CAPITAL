module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        holdings: {
            type: 'json'
            //required: true
        },
        btcWalletAddress: {
            type: 'json'
            //required: true
        },
        ltcWalletAddress: {
            type: 'json'
            //required: true
        },
        poloniexApiKey: {
            type: 'json'
        },
        passports : { collection: 'Passport', via: 'user' }
    },

    getAll: function() {
        return User.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return User.findOne(id)
        .then(function (model) {
            return [model];
        });
    }
};