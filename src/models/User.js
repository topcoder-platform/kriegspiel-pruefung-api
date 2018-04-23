/**
 * the User schema
 */

const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  userType: { type: String },
  password: { type: String },
  advertisingId: { type: String },
  playerToken: { type: String }, // Token from GameOn API after Player registration
});

module.exports = {
  UserSchema,
};
