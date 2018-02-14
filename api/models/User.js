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
            type: 'string'
            //required: true
        },
        ltcWalletAddress: {
            type: 'string'
            //required: true
        },
        poloniexApiKey: {
            type: 'string'
        },
        poloniexApiSecret: {
            type: 'string'
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