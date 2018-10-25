const UserModel = require('../models/users.model');
const AuthHelper = require('../../authorization/helpers/auth.helper');
const crypto = require('crypto');

exports.insert = (req, res) => {
  req.body.password = AuthHelper.createHashedValue(req.body.password);
  req.body.permissionLevel = 1;
  UserModel.createUser(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UserModel.list(limit, page)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

exports.patchById = (req, res) => {
  if (req.body.password) {
    req.body.password = AuthHelper.createHashedValue(req.body.password);
  }

  UserModel.patchUser(req.params.userId, req.body)
    .then((result) => {
      res.status(204).send({});
    })
    .catch((err) => {
      throw new Error(err);
    });

};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
    .then((result) => {
      res.status(204).send({});
    })
    .catch((err) => {
      throw new Error(err);
    });
};