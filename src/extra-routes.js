'use strict';

const express = require('express');
const routerSecret = express.Router();
const bearerMiddleware = require('../src/middleware/bearer')

router.get('/secret', bearerMiddleware, (req, res) => {
  res.send('in the secret route');
});

module.exports = routerSecret;