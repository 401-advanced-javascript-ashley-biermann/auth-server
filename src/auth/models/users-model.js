'use strict';

/**
 * User Class
 * @module users-model
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
// const cors = require('cors');
// const base64 = require('base-64');
const jwt = require('jsonwebtoken');
// const schema = require('../models/users-schema');
const Model = require('../models/mongo-interface')

let SECRET = process.env.SECRET;

class User extends Model {
  constructor(schema) {
    super(schema);
  }

  static hashPassword(value) { 
    return bcrypt.hash(value, 5);
  }

  static async authenticateUser(username, password) {
    try {

      //search for the user that the req is looking for
      let users = await schema.find({ username });

      //see if the user's password matches the password passed into signin route
      let authorized = await bcrypt.compare(password, users[0].password);

      if (authorized) {
        return users[0];
      } else {
        return false;
      }
    } catch (e) {
      console.error('Error :: ', e);
      return false;
    }
  }

  static generateToken(username) {
    // is username a string or an object? don't nest a an object in another object here
    let token = jwt.sign(username, SECRET);
    return token;
  }
}

module.exports = User;