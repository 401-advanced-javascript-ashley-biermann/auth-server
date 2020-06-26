'use strict';

/**
 * Basic Auth Middleware
 * @module basic-auth
 */
// authenticate user based on hashed password 
const base64 = require('base-64');

const UserModel = require('../models/users-model');

module.exports = async function authMiddleware(req, res, next) {
// Consider: Add if {} here to catch error ifnothign in headers
  let [authType, authString] = req.headers.authorization.split(' ');
  let [username, password] = base64.decode(authString).split(':');

  let user = await UserModel.authenticateUser(username, password);

  if (user) {
    req.user = user;
    next();
  } else {
    next('Invalid login');
  }
  return 0;
}
