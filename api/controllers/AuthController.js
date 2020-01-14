module.exports = {
    login: function (req, res) {
        var strategies = sails.config.passport, providers = {};
        Object.keys(strategies).forEach(function (key) {
            if (key === 'local') return;
            providers[key] = {name : strategies[key].name, slug : key};
        });
        res.view({providers : providers});
    },
    logout: function (req, res) {req.logout();res.redirect('/');},
    register: function (req, res) {res.view({errors: req.flash('error')});},
    provider: function (req, res) {passportApp.endpoint(req, res);},
    callback: function (req, res) {
        passportApp.callback(req, res, function (err, user) {
            req.login(user, function (err) {
                if (err) {res.redirect('/login');}
                else {
                    console.log('currently logged in user is: ' + req.user.username);
                    req.session.user = req.user;
                    req.session.authenticated = true;
                    res.redirect('/');
                }
            });
        });
    }
};
