'use strict';

/**
 * Express Server
 * @module express server
 */

// DEPENDENCIES
const express = require('express');
const router = require('../src/auth/router');
const routerSecret = require('../src/extra-routes');
const cors = require('cors');
const timeStamp = require('../src/auth/middleware/timestamp');
const logger = require('../src/auth/middleware/logger');
const error404 = require('../src/auth/middleware/404');
const error500 = require('../src/auth/middleware/500');

const app = express();

// SERVER MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(timeStamp);
app.use(logger);

app.use('/', router);
app.use('/', routerSecret);

app.use(error404);
app.use(error500);

module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log('Server is up on PORT: ' + port);
    });
  }
}