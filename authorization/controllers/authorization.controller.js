const jwtSecret = require('../../common/config/env.config.js').jwt_secret;
const AuthHelper = require('../helpers/auth.helper');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  try {
    const refreshId = req.body.userId + jwtSecret;
    const salt = AuthHelper.createSalt();
    const hash = AuthHelper.createHash(refreshId, salt);
    const buffer = new Buffer(hash);

    req.body.refreshKey = salt;
    const refreshToken = buffer.toString('base64');
    const accessToken = jwt.sign(req.body, jwtSecret);

    // Success
    res.status(201).send({
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(500).send({errors:err});
  }
};

exports.refresh_token = (req, res) => {
  try {
      req.body = req.jwt;
      let token = jwt.sign(req.body, jwtSecret);
      res.status(201).send({id: token});
  } catch (err) {
      res.status(500).send({errors: err});
  }
};