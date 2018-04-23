/**
 * Application authentication middleware
 */

const jwt = require('express-jwt');
const config = require('config');
const errors = require('common-errors');
const models = require('../models');

/**
 * get token from header or query
 * @param req
 * @return {*}
 */
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return req.query.token;
};


/**
 * the jwt check middleware
 * @type {middleware}
 */
const jwtCheck = jwt({
  secret: new Buffer(config.CLIENT_SECRET, 'base64'),
  audience: config.CLIENT_ID,
  requestProperty: 'auth',
  getToken,
});


/**
 * Export a function
 * Restrict access to certain roles
 * @return {Function}       return the middleware function
 */
module.exports = role =>

/**
 * the auth middleware
 * first check token and then validate the scope
 * @param req
 * @param res
 * @param next
 */
  function auth(req, res, next) {
    jwtCheck(req, res, (err) => {
      if (err) {
        next(err);
        return;
      }

      models.User.findOne({ username: req.auth.username }, (dbErr, user) => {
        if (dbErr) {
          next(dbErr);
        } else if (user === null) {
          next(new errors.AuthenticationRequiredError('Invalid Token'));
        } else if (role !== null) {
          const valid = (role === req.auth.userType);
          if (valid === false) {
            next(new errors.NotPermittedError('User does not have access to perform this operation'));
          }
          next();
        } else {
          next();
        }
      });
    });
  };
