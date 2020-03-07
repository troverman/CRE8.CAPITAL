module.exports = {
    logout: function (input, output) {input.logout(); output.redirect('/');},
    provider: function (input, output) {passportApp.endpoint(input, output);},
    callback: function (input, output) {
        passportApp.callback(input, output, function (err, user) {
            input.login(user, function (err) {
                if (err) {output.redirect('/login');}
                else {
                    console.log('currently logged in user is: ' + input.user.username);
                    input.session.user = input.user;
                    input.session.authenticated = true;
                    output.redirect('/');
                }
            });
        });
    }
};
