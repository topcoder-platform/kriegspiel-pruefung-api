/**
 * Player API Routes to play in tournaments, leaderboard view, etc..
 */

const auth = require('../common/Auth.js');

module.exports = {
  '/player/tournaments': {
    get: {
      controller: 'PlayerController',
      method: 'getTournaments',
      middleware: [auth('user')],
    },
  },
  '/player/upcoming-tournaments': {
    get: {
      controller: 'PlayerController',
      method: 'getUpcomingTournaments',
      middleware: [auth('user')],
    },
  },
  '/player/tournaments/:id': {
    get: {
      controller: 'PlayerController',
      method: 'getTournamentById',
      middleware: [auth('user')],
    },
  },
  '/player/tournaments/:id/enter': {
    post: {
      controller: 'PlayerController',
      method: 'enterTournament',
      middleware: [auth('user')],
    },
  },
  '/player/matches': {
    get: {
      controller: 'PlayerController',
      method: 'getMatches',
      middleware: [auth('user')],
    },
  },
  '/player/matches/:id': {
    get: {
      controller: 'PlayerController',
      method: 'getMatchById',
      middleware: [auth('user')],
    },
  },
  '/player/matches/:id/enter': {
    post: {
      controller: 'PlayerController',
      method: 'enterMatch',
      middleware: [auth('user')],
    },
  },
  '/player/matches/:id/leaderboard': {
    get: {
      controller: 'PlayerController',
      method: 'getLeaderboard',
      middleware: [auth('user')],
    },
  },
  '/player/matches/:id/score': {
    put: {
      controller: 'PlayerController',
      method: 'submitScore',
      middleware: [auth('user')],
    },
  },
};
