'use strict';

/**
 * Start App
 * @module index
 */

require('dotenv').config();
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ATLAS_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('open', () => {
  console.log('connected to mongo');
});

server.start(PORT);
