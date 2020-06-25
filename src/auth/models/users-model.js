'use strict';

/**
 * User Class
 * @module users-model
 */

require('dotenv').config();
const schema = require('../models/users-schema');
const Model = require('../models/mongo-interface');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const base64 = require('base-64');

let SECRET = process.env.SECRET;

class User extends Model {
  constructor() {
    super(schema);
  }

  static hashPassword(password) { 
    return bcrypt.hash(password, 5);
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
    // is username a string or an object? don't nest a an object in another object here, but username IS an obj, which is what the docs say we want
    let token = jwt.sign(username, SECRET, { expiresIn: '10m'});
    return token;
  }

  static async validateToken(token) {
    try {
      let user = await jwt.verify(token, SECRET);
      return user;
    } catch (e) {
      return false;
    }
  }
}

module.exports = User;