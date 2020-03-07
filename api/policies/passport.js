//TODO: COOKIE / SESSION APP
var App = function (req, res, next) {
	passportApp.initialize()(req, res, function () {
		passportApp.session()(req, res, function () {
			res.locals.user = req.user;
			next();
		});
	});
};
module.exports = App;
