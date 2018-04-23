/**
 * Admin Controller
 */

const AdminService = require('../services/AdminService');

/**
 * Get prize types from Amazon GameOn
 * @param req the http request
 * @param res the http response
 */
function* getPrizeTypes(req, res) {
  res.json(yield AdminService.getPrizeTypes());
}

/**
 * Create prize type in Amazon GameOn
 * @param req the http request
 * @param res the http response
 */
function* createPrizeType(req, res) {
  res.json(yield AdminService.createPrizeType(req.body));
}


module.exports = {
  getPrizeTypes,
  createPrizeType,
};
