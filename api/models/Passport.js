//CRE8.PASSPORT
const bcrypt = require('bcryptjs');
//TOOD UTIL
function hashPassword (passport, next) {
    if (passport.password) {bcrypt.hash(passport.password, 10, function (err, hash) {passport.password = hash; next(err, passport);});} 
    else {next(null, passport);}
};
module.exports = {
    attributes: {
        id: {type: 'string'},
        model: {type: 'string', defaultsTo: 'PASSPORT'},
        protocol: { type: 'string', required: true },
        password: { type: 'string', minLength: 8 },
        provider: { type: 'string' },
        identifier: { type: 'string' },
        tokens: { type: 'json' },
        user: { model: 'User', required: true },
    },
    beforeCreate: function (passport, next) {hashPassword(passport, next);},
    beforeUpdate: function (passport, next) {hashPassword(passport, next);}
};