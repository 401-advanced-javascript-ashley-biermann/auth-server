'use strict';

/**
 * User Schema
 * @module userSchema
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String }
});

module.exports = mongoose.model('userSchema', userSchema);
