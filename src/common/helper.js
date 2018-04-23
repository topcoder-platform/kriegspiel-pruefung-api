/**
 * Contains generic helper methods
 */

const _ = require('lodash');
const co = require('co');
const config = require('config');

/**
 * Wrap generator function to standard express function
 * @param {Function} fn the generator function
 * @returns {Function} the wrapped function
 */
function wrapExpress(fn) {
  return function wrap(req, res, next) {
    co(fn(req, res, next)).catch(next);
  };
}

/**
 * Wrap all generators from object
 * @param obj the object (controller exports)
 * @returns {Object|Array} the wrapped object
 */
function autoWrapExpress(obj) {
  if (_.isArray(obj)) {
    return obj.map(autoWrapExpress);
  }
  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'GeneratorFunction') {
      return wrapExpress(obj);
    }
    return obj;
  }
  _.each(obj, (value, key) => {
    obj[ key ] = autoWrapExpress(value);  //eslint-disable-line
  });
  return obj;
}

/**
 * get host with api version , example like http://localhost:3000/api/v1
 * @return {string}
 */
function getHostWithApiVersion() {
  return `${config.HOST}/${config.API_VERSION}`;
}

module.exports = {
  wrapExpress,
  autoWrapExpress,
  getHostWithApiVersion,
};
