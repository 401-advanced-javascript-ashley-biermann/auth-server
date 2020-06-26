'use strict';

/**Access Control List
 * @module permissions
 */

 const UserModel = require('../models/users-model');
 const User = new UserModel();

// function that takes in info and immediately passing it to another function
// function currying - fat arrow

const permissions = (capability) => async(req, res, next) => {
  // console.log(`from permission mw - req.user.username ${req.user.username}`);
  let formatted = await User.getByUsername(req.user.username);
  // console.log(`user ${user}`);
  let user = new UserModel();
  user.setUsername(formatted.username);
  user.setPassword(formatted.password);
  user.setRole(formatted.role);

  let hasPermission = await user.can(capability);
  if (hasPermission) {
    next();
  } else {
    next('Permission Denied');
  }
  // if (/*the user.can(capability) */) {
  //   next();
  // } else {
  //   next('Permission Denied');
  // }
}

module.exports = permissions;
