'use strict';

const express = require('express');
const routerSecret = express.Router();

//ROUTER MIDDLEWARE - route specific, not for all routes
const bearerMiddleware = require('../src/auth/middleware/bearer');
const permissions = require('../src/auth/middleware/acl');

routerSecret.get('/secret', bearerMiddleware, (req, res) => {
  res.send('in the secret route, no permissions needed');
});

routerSecret.get('/read', bearerMiddleware, permissions('read'),(req, res) => {
  res.send('Route GET /read - permission granted');
});

routerSecret.post('/add', bearerMiddleware, permissions('create'),(req, res) => {
  res.send('Route POST /add - permission granted');
});

routerSecret.put('/change', bearerMiddleware, permissions('update'),(req, res) => {
  res.send('Route PUT /change - permission granted');
});

routerSecret.delete('/remove', bearerMiddleware, permissions('delete'),(req, res) => {
  res.send('Route DELETE /remove - permission granted');
});

module.exports = routerSecret;