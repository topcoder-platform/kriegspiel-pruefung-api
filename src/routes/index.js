/**
 * Defines the API routes
 */

const _ = require('lodash');
const LoginRoutes = require('./LoginRoutes');
const AdminRoutes = require('./AdminRoutes');
const PlayerRoutes = require('./PlayerRoutes');

module.exports = _.extend({}, LoginRoutes, AdminRoutes, PlayerRoutes);
