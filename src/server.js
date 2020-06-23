'use strict';

/**
 * Server
 * @module express server
 */

const express = require('express');
const router = require('../src/auth/router');
const timeStamp = require('../src/auth/middleware/timestamp');
const logger = require('../src/auth/middleware/logger');
// const error404 = require('../src/middleware/404');
// const error500 = require('../src/middleware/500');

const app = express();

//Middleware
app.use(express.json());
app.use(timeStamp);
app.use(logger);
app.get('/', (req, res) => {
  res.send('at the router!');
})
app.use('/', router);

// app.use(error404);
// app.use(error500);

module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log('Server is up on PORT: ' + port);
    });
  }
}