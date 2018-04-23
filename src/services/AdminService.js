/**
 * Admin service to aid in creating prize types and requirement lists
 */

const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const config = require('config');

const request = superagentPromise(superagent, Promise);

/**
 * Function to get the list of different prize types created in GameOn
 */
function* getPrizeTypes() {
  const response = yield request
    .get(`${config.ADMIN_API_URL}/prizes`)
    .set('X-Api-Key', config.ADMIN_API_KEY)
    .set('Content-Type', 'application/json')
    .end();
  return response.body;
}

/**
 * Function to create prize type(s) in Gameon
 */
function* createPrizeType(body) {
  const response = yield request
    .post(`${config.ADMIN_API_URL}/prizes`)
    .set('X-Api-Key', config.ADMIN_API_KEY)
    .set('Content-Type', 'application/json')
    .send(body)
    .end();
  return response.body;
}

module.exports = {
  getPrizeTypes,
  createPrizeType,
};
