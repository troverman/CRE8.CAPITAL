module.exports = {
	attributes: {
        id: {type:'string'},
        assetPair: {type: 'string'},
        asset1: {type: 'string'},
        asset2: {type: 'string'},
        type:{type: 'string'},
        price:{type: 'string'},
        amount:{type: 'float'},
        status:{type: 'string'},
        //TODO: precent vs us absolute; mb systemwide UserId
        user: {model: 'user'}
    },
    //AfterCreate --> tweet via investinfor perdictionBot --~~>
    afterCreate: function (model, next) {return next(null, model);},
};

