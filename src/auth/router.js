'use strict';

const express = require('express');
const router = express.Router();
const UserModel = require('./models/users-model');
const User = new UserModel();

router.post('/signup', handleCreateUser);
router.post('/signin', handleSignIn);
router.get('/user', handleGetUsers);

async function handleCreateUser (req, res, next) {
  //requires a token and user to sign them up
  //req.token, req.user, res.set, res.cookie, res.send
  let password = await UserModel.hashPassword(req.body.password);
  console.log(password);
  User.create({ username: req.body.username, password: password });
  res.send('new user created');
}

function handleSignIn (req, res, next) {
  // res.cookie, res.send
}

async function handleGetUsers (req, res, next) {
  let allUsers = await User.get();
  res.send(allUsers);
}

module.exports = router;
