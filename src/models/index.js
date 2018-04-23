/**
 * Init models
 *
 * @author      TSCODER
 * @version     1.0
 */

const config = require('config');
const db = require('../datasource').getDb(config.db.url, config.db.poolSize);
const { UserSchema } = require('./User');

module.exports = {
  User: db.model('User', UserSchema),
  db,
};
