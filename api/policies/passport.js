//TODO: COOKIE / SESSION APP
module.exports = function (req, res, next) {
  passportApp.initialize()(req, res, function () {
    passportApp.session()(req, res, function () {
      res.locals.user = req.user;
      next();
    });
  });
};
