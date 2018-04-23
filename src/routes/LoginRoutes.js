/**
 * Login Routes
 */

module.exports = {
  '/login': {
    post: {
      controller: 'LoginController',
      method: 'login',
    },
  },
};
