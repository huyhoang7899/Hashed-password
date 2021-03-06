var db = require('../db');

module.exports.login = function(req, res) {
  res.render('auth/login');
}

module.exports.postLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({ email: email}).value();

  if (!user) {
    res.render('auth/login', {
      errors: [ "Email does not exist !" ],
      values: req.body
    });
    return;
  }

  if (user.password !== password) {
    res.render('auth/login', {
      errors: [ "Password Wrong !" ],
      values: req.body
    });
    return;
  }

  res.cookie("userId", user.id);

  res.redirect('/');
}
