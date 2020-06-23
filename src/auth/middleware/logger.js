'use strict';

/**
 * Logger Middleware
 * @module logger
 */

module.exports = (req, res, next) => {
  console.log('__REQUEST__: ' + `${req.timeStamp}` + ` ${req.path}` + ` ${req.method}`);
  next();
}