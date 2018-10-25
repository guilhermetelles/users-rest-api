const UserModel = require('../../users/models/users.model');
const AuthHelper = require('../helpers/auth.helper');

exports.hasAuthValidFields = (req, res, next) => {
  let errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push('Missing email field');
    }
    if (!req.body.password) {
      errors.push('Missing password field');
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(',') });
    } else {
      return next();
    }
  } else {
    return res.status(400).send({ errors: 'Missing email and password fields' });
  }
};

exports.isPasswordAndUserMatch = (req, res, next) => {

  UserModel.findByEmail(req.body.email)
    .then((users) => {
      if (!users || !users.length) {
        res.status(404).send({});
      } else {
        const user = users[0];
        const passwordFields = user.password.split('$');
        const salt = passwordFields[0];
        const passedPasswordHash = AuthHelper.createHash(req.body.password, salt);
        if (passedPasswordHash === passwordFields[1]) {
          req.body = {
            userId: user._id,
            email: user.email,
            permissionLevel: user.permissionLevel,
            provider: 'email',
            name: user.firstName + ' ' + user.lastName,
          };
          return next();
        } else {
          return res.status(400).send({ errors: ['Invalid email or password'] });
        }
      }
    })
};