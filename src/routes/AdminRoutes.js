/**
 * Admin API Routes to create and get prize types
 */

const auth = require('../common/Auth.js');

module.exports = {
  '/admin/prizes': {
    get: {
      controller: 'AdminController',
      method: 'getPrizeTypes',
      middleware: [auth('admin')],
    },
    post: {
      controller: 'AdminController',
      method: 'createPrizeType',
      middleware: [auth('admin')],
    },
  },
};
