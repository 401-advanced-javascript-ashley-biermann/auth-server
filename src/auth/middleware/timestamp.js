
'use strict';

/**
 * Timestamp Middleware
 * @module timestamp
 */

const timeStamp = function (req, res, next) {
  const d = new Date(Date.now());
  req.timeStamp = d;
  next();
}

module.exports = timeStamp;