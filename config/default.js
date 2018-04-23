/**
 * Default configuration file
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  WEB_SERVER_PORT: process.env.PORT || 3000,
  CLIENT_ID: process.env.CLIENT_ID || 'testing',
  CLIENT_SECRET: process.env.CLIENT_SECRET || 'mysecret',
  TOKEN_EXPIRES: 24 * 60 * 60 * 30, // 30 days
  API_VERSION: 'api/v1',
  DEFAULT_MESSAGE: 'Internal Server Error',
  db: {
    url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/gameon',
    poolSize: 5,
  },
  ADMIN_API_URL: 'https://admin-api.amazongameon.com/v1',
  PLAYER_API_URL: 'https://api.amazonpinata.com/v1',
  GAME_ID: process.env.GAME_ID || '',
  PUBLIC_API_KEY: process.env.PUBLIC_API_KEY || '',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || '',
  GAME_PUBLIC_KEY: process.env.GAME_PUBLIC_KEY || '',
};
