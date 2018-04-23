/**
 * import static test data
 */

const models = require('../src/models');
const co = require('co');
const logger = require('../src/common/logger');

const users = require('./data/Users.json');

co(function* loadData() {
  yield models.User.remove({});
  yield models.User.create(users);
  logger.info('import succeeded!');
  process.exit(0);
}).catch((err) => {
  logger.logFullError(err);
  process.exit(1);
});
