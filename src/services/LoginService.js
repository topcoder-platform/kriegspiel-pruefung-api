/**
 * Login service to aid in login
 */

const models = require('../models');
const crypto = require('crypto');
const joi = require('joi');
const errors = require('common-errors');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const config = require('config');
const httpStatus = require('http-status');
const NodeRSA = require('node-rsa');

const request = superagentPromise(superagent, Promise);

// Encryption scheme to be used for RSA Keys
const keyOptions = {
  encryptionScheme: {
    scheme: 'pkcs1',
  },
};

// Game public key found in Admin Console
const gameKey = new NodeRSA(config.GAME_PUBLIC_KEY, 'pkcs8-public', keyOptions);

/**
 * use md5 hash password
 * @param password
 * @return {Buffer | string}
 */
function generateHash(password) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(password);
  return md5sum.digest('hex');
}

/**
 * Generate a jwt token for specified user
 * @param  {Object}     userObj     the user for which to generate the token
 */
function generateToken(userObj) {
  const jwtBody = {
    username: userObj.username,
    userType: userObj.userType,
  };
  return jwt.sign(jwtBody, new Buffer(config.CLIENT_SECRET, 'base64'), {
    expiresIn: config.TOKEN_EXPIRES,
    audience: config.CLIENT_ID,
  });
}

/**
 * Function to login the User
 * If the player token is not generated already, register player
 * in Amazon Gameon and store the resulting token.
 * @param entity
 */
function* login(entity) {
  const password = generateHash(entity.password);
  let user = yield models.User.findOne({ username: entity.username });

  // Check if the user with given user name exists
  if (!user) {
    throw new errors.HttpStatusError(httpStatus.UNAUTHORIZED, 'User name does not exist.');
  }
  // Compare the hashed password
  if (user.password !== password) {
    throw new errors.HttpStatusError(httpStatus.UNAUTHORIZED, 'Invalid Credentials.');
  }

  // If the user doesn't have player Token, generate it from Amazon Gameon
  if (user.userType === 'user' && !user.playerToken) {
    // Generate public / private key pair for the given player
    const playerKey = new NodeRSA({ b: 1024 }, keyOptions);
    // Create encrypted payload as encrypting Player public key with Game public key
    const reqBody = {
      advertisingId: user.advertisingId,
      encryptedPayload: gameKey.encrypt(new Buffer(playerKey.exportKey('pkcs8-public-der')).toString('base64'), 'base64'),
    };
    // Register the player
    const response = yield request
      .post(`${config.PLAYER_API_URL}/players/register`)
      .set('X-Api-Key', config.PUBLIC_API_KEY)
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .end();

    const newToken = playerKey.decrypt(response.body.encryptedPlayerToken).toString('utf8');

    yield models.User.update({ username: entity.username }, { playerToken: newToken });
    user = yield models.User.findOne({ username: entity.username });
  }

  // Generate JWT Token for Application login
  const accessToken = generateToken(user);

  let result;

  if (user.userType === 'user') {
    const authBody = {
      advertisingId: user.advertisingId,
      deviceOSType: 'mac',
      appBuildType: 'development',
      playerName: user.username,
      encryptedPayload: gameKey.encrypt(user.playerToken, 'base64'),
    };

    // Authenticate the Player
    const response = yield request
      .post(`${config.PLAYER_API_URL}/players/auth`)
      .set('X-Api-Key', config.PUBLIC_API_KEY)
      .set('Content-Type', 'application/json')
      .send(authBody)
      .end();

    result = _.extend({ session: response.body }, { token: accessToken });
  } else {
    result = { token: accessToken };
  }

  // Return session from Gameon API along with JWT
  return result;
}

login.schema = {
  entity: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }).required(),
};

module.exports = {
  login,
};
