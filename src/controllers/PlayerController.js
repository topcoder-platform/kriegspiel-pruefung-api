/**
 * Player Controller
 */

const PlayerService = require('../services/PlayerService');

/**
 * Get all live tournaments from Amazon GameOn for the given game
 * @param req the http request
 * @param res the http response
 */
function* getTournaments(req, res) {
  res.json(yield PlayerService.getTournaments(req));
}

/**
 * Get all upcoming tournaments from Amazon GameOn for the given game
 * @param req the http request
 * @param res the http response
 */
function* getUpcomingTournaments(req, res) {
  res.json(yield PlayerService.getUpcomingTournaments(req));
}

/**
 * Get specific tournament by ID
 * @param req the http request
 * @param res the http response
 */
function* getTournamentById(req, res) {
  res.json(yield PlayerService.getTournamentById(req));
}

/**
 * Get all matches from Amazon GameOn for the given game
 * @param req the http request
 * @param res the http response
 */
function* getMatches(req, res) {
  res.json(yield PlayerService.getMatches(req));
}

/**
 * Get specific match by ID
 * @param req the http request
 * @param res the http response
 */
function* getMatchById(req, res) {
  res.json(yield PlayerService.getMatchById(req));
}

/**
 * Allow Player to enter the tournament
 * @param req the http request
 * @param res the http response
 */
function* enterTournament(req, res) {
  res.json(yield PlayerService.enterTournament(req));
}

/**
 * Allow Player to enter the match
 * @param req the http request
 * @param res the http response
 */
function* enterMatch(req, res) {
  res.json(yield PlayerService.enterMatch(req));
}

/**
 * Function to get leaderboard of a given match
 * @param req the http request
 * @param res the http response
 */
function* getLeaderboard(req, res) {
  res.json(yield PlayerService.getLeaderboard(req));
}

/**
 * Function to submit score for a given match
 * @param req the http request
 * @param res the http response
 */
function* submitScore(req, res) {
  res.json(yield PlayerService.submitScore(req));
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
