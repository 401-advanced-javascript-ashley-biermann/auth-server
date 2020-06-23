'use strict';

/**
 * User Class
 * @module users-model
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
// const cors = require('cors');
// const base64 = require('base-64');
// const jwt = require('jsonwebtoken');
const schema = require('../models/users-schema');
const Model = require('../models/mongo-interface')

class User extends Model {
  constructor(schema) {
    super(schema);
  }

  static hashPassword(value) { 
    return bcrypt.hash(value, 5);
  }

  authenticateUser(password) {
    
  }

  //async probably
  generateToken() {
    //creates a token based on username:password, take that string, and base64.encoded 
  }
}

module.exports = User;