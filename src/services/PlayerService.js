/**
 * Player service to aid in playing the matches, etc..
 */

const superagent = require('superagent');
const superagentPromise = require('superagent-promise');
const config = require('config');

const request = superagentPromise(superagent, Promise);

/**
 * Function to get the list of live tournaments
 */
function* getTournaments(req) {
  const response = yield request
    .get(`${config.PLAYER_API_URL}/tournaments`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .end();
  return response.body;
}

/**
 * Function to get the list of upcoming tournaments
 */
function* getUpcomingTournaments(req) {
  const response = yield request
    .get(`${config.PLAYER_API_URL}/tournaments?filterBy=upcoming`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .end();
  return response.body;
}

/**
 * Function to get specific tournament by ID
 */
function* getTournamentById(req) {
  const response = yield request
    .get(`${config.PLAYER_API_URL}/tournaments/${req.params.id}`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .end();
  return response.body;
}

/**
 * Function to get the list of matches
 */
function* getMatches(req) {
  const response = yield request
    .get(`${config.PLAYER_API_URL}/matches`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .end();
  return response.body;
}

/**
 * Function to get specific tournament by ID
 */
function* getMatchById(req) {
  const response = yield request
    .get(`${config.PLAYER_API_URL}/matches/${req.params.id}`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .end();
  return response.body;
}

/**
 * Function to allow the Player to enter tournament
 */
function* enterTournament(req) {
  const response = yield request
    .post(`${config.PLAYER_API_URL}/tournaments/${req.params.id}/enter`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .set('Content-Type', 'application/json')
    .end();
  return response.body;
}

/**
 * Function to allow the Player to enter match
 */
function* enterMatch(req) {
  const response = yield request
    .post(`${config.PLAYER_API_URL}/matches/${req.params.id}/enter`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .set('Content-Type', 'application/json')
    .end();
  return response.body;
}

/**
 * Function to get leaderboard of the particular match
 */
function* getLeaderboard(req) {
  const response = yield request
    .get(`${config.PLAYER_API_URL}/matches/${req.params.id}/leaderboard`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .end();
  return response.body;
}

/**
 * Function to submit score of the Player
 */
function* submitScore(req) {
  const response = yield request
    .put(`${config.PLAYER_API_URL}/matches/${req.params.id}/score`)
    .set('Session-Id', req.headers['session-id'])
    .set('X-Api-Key', config.PUBLIC_API_KEY)
    .set('Content-Type', 'application/json')
    .send({ score: Math.floor(Math.random() * 100) })
    .end();
  return response.body;
}

module.exports = {
  getTournaments,
  getUpcomingTournaments,
  getTournamentById,
  getMatches,
  getMatchById,
  enterTournament,
  enterMatch,
  getLeaderboard,
  submitScore,
};
