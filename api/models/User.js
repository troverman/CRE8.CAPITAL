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
        btcWalletSecret: {
            type: 'string'
            //required: true
        },
        ltcWalletAddress: {
            type: 'string'
            //required: true
        },
        ltcWalletSecret: {
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
            //STRIP API KEYS.. prob should hash this tho. 
            //readup on security; 
            //same if we want to save wallet secret info
            for (x in models){
                delete models[x].poloniexApiKey;
                delete models[x].poloniexApiSecret;
            }
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