/**
 * Login Controller
 */

const LoginService = require('../services/LoginService');

/**
 * user login with  username and password
 * @param req the http request
 * @param res the http response
 */
function* login(req, res) {
  res.json(yield LoginService.login(req.body));
}

module.exports = {
  login,
};
