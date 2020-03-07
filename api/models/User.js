module.exports = {
    attributes: {
        id:{type:'string'},
        username: {type: 'string', required: true, unique: true},
        email: {type: 'string', required: true, unique: true},
        firstName: {type: 'string',},
        lastName: {type: 'string'},

        holdings: {type: 'json'},

        btcWalletAddress: {type: 'string'},
        btcWalletSecret: {type: 'string'},
        ltcWalletAddress: {type: 'string'},
        ltcWalletSecret: {type: 'string'},
        poloniexApiKey: {type: 'string'},
        poloniexApiSecret: {type: 'string'},

        passports : { collection: 'Passport', via: 'user' }
    }
};